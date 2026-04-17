"use client";

import AvatarEditor from "react-avatar-editor";
import { useAvatarEditor } from "react-avatar-editor";
import Image from "next/image";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";

import { uploadAvatarAction } from "@/app/actions/upload-avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

type AvatarUploaderProps = {
  currentImageUrl: string | null;
  onUploadedAction: (url: string) => void;
};

function fileFromBlob(blob: Blob): File {
  return new File([blob], "avatar.jpg", { type: blob.type || "image/jpeg" });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to process image."));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      0.92,
    );
  });
}

export default function AvatarUploader({
  currentImageUrl,
  onUploadedAction,
}: AvatarUploaderProps) {
  const { ref: editorRef, getImageScaledToCanvas } = useAvatarEditor();

  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [zoom, setZoom] = useState(1.2);

  useEffect(() => {
    return () => {
      if (selectedImageUrl) {
        URL.revokeObjectURL(selectedImageUrl);
      }
    };
  }, [selectedImageUrl]);

  const onFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      setError(null);

      if (!file) {
        return;
      }

      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        setError("Unsupported image format. Please use JPG, PNG, or WEBP.");
        event.target.value = "";
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError("File is too large. Maximum allowed size is 2MB.");
        event.target.value = "";
        return;
      }

      if (selectedImageUrl) {
        URL.revokeObjectURL(selectedImageUrl);
      }

      const objectUrl = URL.createObjectURL(file);
      setSelectedImageUrl(objectUrl);
    },
    [selectedImageUrl],
  );

  const onSave = useCallback(async () => {
    const canvas = getImageScaledToCanvas();

    if (!canvas) {
      setError("Please choose an image first.");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const blob = await canvasToBlob(canvas);
      const formData = new FormData();
      formData.append("avatar", fileFromBlob(blob));

      const { url } = await uploadAvatarAction(formData);
      onUploadedAction(url);

      if (selectedImageUrl) {
        URL.revokeObjectURL(selectedImageUrl);
      }
      setSelectedImageUrl(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to upload avatar. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }, [getImageScaledToCanvas, onUploadedAction, selectedImageUrl]);

  return (
    <Card
      size="sm"
      className="border"
    >
      <CardHeader>
        <CardTitle>Avatar</CardTitle>
        <CardDescription>
          Upload and crop a JPG, PNG, or WEBP image up to 2MB.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border bg-muted">
            <Image
              src={currentImageUrl ?? "/images/placeholder.svg"}
              alt="Current avatar preview"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="space-y-1.5">
              <FieldLabel htmlFor="avatar-file">Choose image</FieldLabel>
              <Input
                id="avatar-file"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={onFileChange}
                disabled={isSaving}
              />
            </div>

            {selectedImageUrl && (
              <>
                <Separator />

                <div className="space-y-3">
                  <div className="inline-block overflow-hidden rounded-md border">
                    <AvatarEditor
                      ref={editorRef}
                      image={selectedImageUrl}
                      width={220}
                      height={220}
                      border={16}
                      borderRadius={999}
                      scale={zoom}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <FieldLabel htmlFor="avatar-zoom">
                      Zoom: {zoom.toFixed(1)}x
                    </FieldLabel>
                    <Input
                      id="avatar-zoom"
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(event) => setZoom(Number(event.target.value))}
                      disabled={isSaving}
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={onSave}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Avatar"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        <FieldError errors={error ? [{ message: error }] : undefined} />
      </CardContent>
    </Card>
  );
}
