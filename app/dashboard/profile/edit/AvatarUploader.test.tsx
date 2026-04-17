import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AvatarUploader from "./AvatarUploader";

const mockUploadAvatarAction = vi.fn();
const mockGetImageScaledToCanvas = vi.fn();

vi.mock("next/image", () => ({
  default: ({ fill, src }: Record<string, unknown>) => {
    void fill;

    return <span data-testid="next-image-mock">{String(src ?? "")}</span>;
  },
}));

vi.mock("@/app/actions/upload-avatar", () => ({
  uploadAvatarAction: (formData: FormData) => mockUploadAvatarAction(formData),
}));

vi.mock("react-avatar-editor", () => ({
  default: ({ image }: { image: string }) => (
    <div data-testid="avatar-editor">{image}</div>
  ),
  useAvatarEditor: () => ({
    ref: { current: null },
    getImageScaledToCanvas: mockGetImageScaledToCanvas,
  }),
}));

describe("AvatarUploader", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(URL, "createObjectURL", {
      writable: true,
      value: vi.fn(() => "blob:preview-image"),
    });

    Object.defineProperty(URL, "revokeObjectURL", {
      writable: true,
      value: vi.fn(),
    });
  });

  it("shows error for unsupported file type", () => {
    render(
      <AvatarUploader
        currentImageUrl={null}
        onUploadedAction={vi.fn()}
      />,
    );

    const input = screen.getByLabelText("Choose image");
    const gif = new File(["gif-binary"], "avatar.gif", { type: "image/gif" });

    fireEvent.change(input, { target: { files: [gif] } });

    expect(
      screen.getByText(
        "Unsupported image format. Please use JPG, PNG, or WEBP.",
      ),
    ).toBeDefined();
    expect(screen.queryByTestId("avatar-editor")).toBeNull();
  });

  it("shows error when selected file is larger than 2MB", () => {
    render(
      <AvatarUploader
        currentImageUrl={null}
        onUploadedAction={vi.fn()}
      />,
    );

    const input = screen.getByLabelText("Choose image");
    const oversizedFile = new File(
      [new Uint8Array(2 * 1024 * 1024 + 1)],
      "big.jpg",
      {
        type: "image/jpeg",
      },
    );

    fireEvent.change(input, { target: { files: [oversizedFile] } });

    expect(
      screen.getByText("File is too large. Maximum allowed size is 2MB."),
    ).toBeDefined();
    expect(screen.queryByTestId("avatar-editor")).toBeNull();
  });

  it("uploads cropped avatar and calls onUploadedAction with returned url", async () => {
    const onUploadedAction = vi.fn();
    mockUploadAvatarAction.mockResolvedValue({
      url: "https://cdn.example.com/avatar.jpg",
    });

    const canvasMock = {
      toBlob: (callback: BlobCallback) => {
        callback(new Blob(["avatar"], { type: "image/jpeg" }));
      },
    } as HTMLCanvasElement;

    mockGetImageScaledToCanvas.mockReturnValue(canvasMock);

    render(
      <AvatarUploader
        currentImageUrl={null}
        onUploadedAction={onUploadedAction}
      />,
    );

    const input = screen.getByLabelText("Choose image");
    const png = new File(["png"], "avatar.png", { type: "image/png" });

    fireEvent.change(input, { target: { files: [png] } });
    fireEvent.click(screen.getByRole("button", { name: "Save Avatar" }));

    await waitFor(() => {
      expect(mockUploadAvatarAction).toHaveBeenCalledTimes(1);
    });

    const sentFormData = mockUploadAvatarAction.mock.calls[0][0] as FormData;
    const sentFile = sentFormData.get("avatar");

    expect(sentFile).toBeInstanceOf(File);
    expect((sentFile as File).type).toBe("image/jpeg");
    expect((sentFile as File).name).toBe("avatar.jpg");
    expect(onUploadedAction).toHaveBeenCalledWith(
      "https://cdn.example.com/avatar.jpg",
    );

    await waitFor(() => {
      expect(screen.queryByTestId("avatar-editor")).toBeNull();
    });
  });
});
