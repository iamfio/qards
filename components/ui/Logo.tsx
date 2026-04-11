import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-3xl normal-case btn btn-ghost"
    >
      <span className="text-primary">Q</span>a
      <span className="text-primary">R</span>ds
    </Link>
  );
}
