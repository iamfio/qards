export default async function ProfileEditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen">
      <div className="flex flex-col">{children}</div>
    </div>
  )
}
