import { AiFillGithub } from 'react-icons/ai'

// TODO: Footer should be sticky withou position: absolute!
const Footer = () => {
  return (
    <footer className="p-5 mt-auto footer footer-center bg-base-300 text-base-content">
      <div>
        <p className="font-bold">
          Fiodor Go <br />
          Providing reliable tech since 2020
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className="grid grid-flow-col gap-1">
        <a href="https://github.com/iamfio/qards">
          <AiFillGithub className="text-4xl" />
        </a>
      </div>
    </footer>
  )
}

export default Footer
