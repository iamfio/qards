import { AiFillGithub } from 'react-icons/ai'

const Footer = () => {
  return (
    // <footer className="p-5 mt-auto footer footer-center bg-base-300 text-base-content f">
      <div className="grid grid-flow-col gap-1 footer-center">
        <a href="https://github.com/iamfio/qards">
          <AiFillGithub className="text-4xl" />
        </a>
      </div>
    // </footer>
  )
}

export default Footer
