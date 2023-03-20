import Link from 'next/link'

const Logo: React.FC = () => {
  return (
    <Link href="/" className="text-3xl normal-case btn btn-ghost">
      <span className="text-primary">Q</span>a
      <span className="text-primary">R</span>ds
    </Link>
  )
}

export default Logo
