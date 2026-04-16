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
