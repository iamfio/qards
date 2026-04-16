// import { getCldImageUrl } from "next-cloudinary";

export type AvatarSource = {
  avatarUrl?: string | null;
  avatarProviderUrl?: string | null;
  avatarPublicId?: string | null;
  image?: string | null;
};

export function resolveAvatarUrl(source?: AvatarSource | null): string | null {
  if (!source) {
    return null;
  }

  const value = source.avatarUrl ?? source.image ?? source.avatarProviderUrl;

  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function getUserInitials(
  name?: string | null,
  email?: string | null,
): string {
  if (name?.trim()) {
    const words = name.trim().split(/\s+/).filter(Boolean);

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
  }

  if (email?.trim()) {
    return email.trim().slice(0, 2).toUpperCase();
  }

  return "U";
}
