"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/globalPrisma";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

type UploadAvatarActionResult = {
  url: string;
};

function getFileExtension(file: File): string {
  if (file.type === "image/png") {
    return "png";
  }

  if (file.type === "image/webp") {
    return "webp";
  }

  return "jpg";
}

export async function uploadAvatarAction(
  formData: FormData,
): Promise<UploadAvatarActionResult> {
  if (!BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Missing BLOB_READ_WRITE_TOKEN. Add it to your server env to upload avatars.",
    );
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const avatar = formData.get("avatar");

  if (!(avatar instanceof File)) {
    throw new Error("No image file was provided.");
  }

  if (!ALLOWED_MIME_TYPES.includes(avatar.type)) {
    throw new Error("Unsupported image format. Please use JPG, PNG, or WEBP.");
  }

  if (avatar.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("Image is too large. Maximum allowed size is 5MB.");
  }

  const ext = getFileExtension(avatar);
  const filename = `avatars/${session.user.id}-${Date.now()}.${ext}`;

  const blob = await put(filename, avatar, {
    access: "public",
    addRandomSuffix: true,
    token: BLOB_READ_WRITE_TOKEN,
  });

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      image: blob.url,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard/profile/edit");

  return {
    url: blob.url,
  };
}
