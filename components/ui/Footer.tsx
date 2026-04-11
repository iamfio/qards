import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="grid grid-flow-col gap-1 footer-center">
      <a href="https://github.com/iamfio/qards">
        <AiFillGithub className="text-4xl" />
      </a>
    </footer>
  );
}
