import { AiFillGithub } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="w-full py-4 mt-auto">
      <div className="container mx-auto flex justify-center items-center">
        <a
          href="https://github.com/iamfio/qards"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Link to the project's GitHub repository"
        >
          <AiFillGithub className="text-2xl" />
        </a>
      </div>
    </footer>
  );
}
