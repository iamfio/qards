import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGetServerSession, mockPut, mockRevalidatePath, mockPrisma } =
  vi.hoisted(() => ({
    mockGetServerSession: vi.fn(),
    mockPut: vi.fn(),
    mockRevalidatePath: vi.fn(),
    mockPrisma: {
      user: {
        update: vi.fn(),
      },
    },
  }));

vi.mock("next-auth", () => ({
  getServerSession: mockGetServerSession,
}));

vi.mock("@vercel/blob", () => ({
  put: mockPut,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mockRevalidatePath,
}));

vi.mock("@/lib/globalPrisma", () => ({
  prisma: mockPrisma,
}));

vi.mock("@/app/api/auth/[...nextauth]/route", () => ({
  authOptions: {},
}));

async function importAction() {
  const importedModule = await import("./upload-avatar");
  return importedModule.uploadAvatarAction;
}

describe("uploadAvatarAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    process.env.BLOB_READ_WRITE_TOKEN = "test-blob-token";
  });

  it("throws when user is not authenticated", async () => {
    mockGetServerSession.mockResolvedValue(null);
    const uploadAvatarAction = await importAction();

    const formData = new FormData();
    formData.append(
      "avatar",
      new File(["x"], "avatar.jpg", { type: "image/jpeg" }),
    );

    await expect(uploadAvatarAction(formData)).rejects.toThrow("Unauthorized");
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("throws when avatar file is missing", async () => {
    mockGetServerSession.mockResolvedValue({ user: { id: "user-1" } });
    const uploadAvatarAction = await importAction();

    await expect(uploadAvatarAction(new FormData())).rejects.toThrow(
      "No image file was provided.",
    );
  });

  it("throws for unsupported image format", async () => {
    mockGetServerSession.mockResolvedValue({ user: { id: "user-1" } });
    const uploadAvatarAction = await importAction();

    const formData = new FormData();
    formData.append(
      "avatar",
      new File(["gif"], "avatar.gif", { type: "image/gif" }),
    );

    await expect(uploadAvatarAction(formData)).rejects.toThrow(
      "Unsupported image format. Please use JPG, PNG, or WEBP.",
    );
  });

  it("throws for oversized image", async () => {
    mockGetServerSession.mockResolvedValue({ user: { id: "user-1" } });
    const uploadAvatarAction = await importAction();

    const formData = new FormData();
    formData.append(
      "avatar",
      new File([new Uint8Array(5 * 1024 * 1024 + 1)], "big.jpg", {
        type: "image/jpeg",
      }),
    );

    await expect(uploadAvatarAction(formData)).rejects.toThrow(
      "Image is too large. Maximum allowed size is 5MB.",
    );
  });

  it("uploads avatar, updates user image, and revalidates pages", async () => {
    vi.spyOn(Date, "now").mockReturnValue(1713355200000);
    mockGetServerSession.mockResolvedValue({ user: { id: "user-1" } });
    mockPut.mockResolvedValue({
      url: "https://blob.vercel-storage.com/avatar.jpg",
    });
    mockPrisma.user.update.mockResolvedValue({});

    const uploadAvatarAction = await importAction();
    const formData = new FormData();
    formData.append(
      "avatar",
      new File(["ok"], "avatar.png", { type: "image/png" }),
    );

    const result = await uploadAvatarAction(formData);

    expect(mockPut).toHaveBeenCalledWith(
      "avatars/user-1-1713355200000.png",
      expect.any(File),
      {
        access: "public",
        addRandomSuffix: true,
        token: "test-blob-token",
      },
    );
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: { image: "https://blob.vercel-storage.com/avatar.jpg" },
    });
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard/profile");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/dashboard/profile/edit");
    expect(result).toEqual({
      url: "https://blob.vercel-storage.com/avatar.jpg",
    });
  });
});
