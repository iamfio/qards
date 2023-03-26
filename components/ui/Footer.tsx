import { AiFillGithub } from 'react-icons/ai'

// TODO: Footer should be sticky withou position: absolute!
const Footer = () => {
  return (
    <footer className="grid grid-flow-col gap-1 footer-center">
      <a href="https://github.com/iamfio/qards">
        <AiFillGithub className="text-4xl" />
      </a>
    </footer>
  )
}

export default Footer
