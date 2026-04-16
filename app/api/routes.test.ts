import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockGetServerSession, mockPrisma } = vi.hoisted(() => ({
  mockGetServerSession: vi.fn(),
  mockPrisma: {
    user: {
      update: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("next-auth", () => ({
  getServerSession: mockGetServerSession,
}));

vi.mock("@/lib/globalPrisma", () => ({
  prisma: mockPrisma,
}));

vi.mock("./auth/[...nextauth]/route", () => ({
  authOptions: {},
}));

import { PUT as putUser } from "./user/route";
import { DELETE as deleteQard, GET as getQards } from "./qard/route";

describe("app/api routes (high ROI)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  it("PUT /api/user returns 401 for guest", async () => {
    mockGetServerSession.mockResolvedValue(null);

    const req = new Request("http://localhost/api/user", {
      method: "PUT",
      body: JSON.stringify({ id: "user-a", name: "Alice" }),
    });

    const res = await putUser(req);
    const body = await res.json();

    expect(res.status).toBe(401);
    expect(body).toEqual({ message: "Unauthorized" });
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });

  it("PUT /api/user returns 401 when trying to update another user", async () => {
    mockGetServerSession.mockResolvedValue({
      user: { id: "user-a" },
    });

    const req = new Request("http://localhost/api/user", {
      method: "PUT",
      body: JSON.stringify({ id: "user-b", name: "Mallory" }),
    });

    const res = await putUser(req);
    const body = await res.json();

    expect(res.status).toBe(401);
    expect(body).toEqual({ message: "Unauthorized" });
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });

  it("GET /api/qard returns current user qards ordered by position asc", async () => {
    mockGetServerSession.mockResolvedValue({
      user: { id: "user-a" },
    });

    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-a",
      qards: [
        { id: "q-2", position: 0 },
        { id: "q-1", position: 1 },
      ],
    });

    const res = await getQards();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "user-a" },
      include: {
        qards: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });
    expect(
      body.qards.map((qard: { position: number }) => qard.position),
    ).toEqual([0, 1]);
  });

  it("DELETE /api/qard returns 500 when user tries to delete non-owned qard", async () => {
    mockGetServerSession.mockResolvedValue({
      user: { id: "user-a" },
    });

    mockPrisma.user.update.mockRejectedValue(
      new Error("Record to delete does not exist"),
    );

    const req = new Request("http://localhost/api/qard", {
      method: "DELETE",
      body: JSON.stringify("qard-of-user-b"),
    });

    const res = await deleteQard(req);
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body).toEqual({ message: "Error DELETE Qard" });
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: {
        id: "user-a",
      },
      data: {
        qards: {
          delete: {
            id: "qard-of-user-b",
          },
        },
      },
    });
  });

  // restore console after suite
  afterEach(() => {
    vi.restoreAllMocks();
  });
});
