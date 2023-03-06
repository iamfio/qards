import Link from 'next/link'

const Logo: React.FC = () => {
  return (
    <Link href="/" className="text-xl normal-case btn btn-ghost">
      <span className="text-xxl text-primary">Q</span>a
      <span className="text-xl text-primary">R</span>ds
    </Link>
  )
}

export default Logo
