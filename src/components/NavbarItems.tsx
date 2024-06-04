import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  logo: ReactNode;
  text: string;
  link: string;
  handleMenu: () => void
}

const NavbarItems = ({ logo, text, link, handleMenu }: Props) => {
  return (
    <div className="w-full bg-gray-800/40 hover:bg-gray-800 h-max rounded-lg text-sm text-gray-200 mb-5" onClick={handleMenu}>
      <Link to={link} className="flex items-center gap-3 w-full h-full p-3">
        {logo}
        <p>{text}</p>
      </Link>
    </div>
  );
};

export default NavbarItems;
