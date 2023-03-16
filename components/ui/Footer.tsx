import { AiFillGithub } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className="absolute bottom-0 p-5 footer footer-center bg-primary text-primary-content">
      <div>
        <p className="font-bold">
          Fiodor Go <br />
          Providing reliable tech since 2020
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/iamfio/qards">
            <AiFillGithub className="text-4xl" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
