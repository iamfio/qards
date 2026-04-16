import React from "react";

export default async function ProfileEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center">{children}</div>
    </div>
  );
}
