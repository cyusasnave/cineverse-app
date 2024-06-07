import {
  BookText,
  Clapperboard,
  Film,
  HandHelping,
  Home,
  Menu,
  TrendingUp,
  X,
} from "lucide-react";
import logo from "../assets/logo.png";
import NavbarItems from "./NavbarItems";
import avatar from "../assets/avatar.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showlogo, setShowlogo] = useState(true);
  const navigate = useNavigate();

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const HandleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Thank you for visiting our platform!");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowlogo(false);
      } else {
        setShowlogo(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 z-[10000] w-full h-max">
      {showlogo && (
        <div className="absolute top-0 left-0">
          <img src={logo} className="w-[80%]" />
        </div>
      )}
      <button
        onClick={handleMenu}
        className="absolute top-6 md:top-14 right-6 md:right-14 p-4 bg-red-800 rounded-full hover:bg-red-900"
      >
        <Menu />
      </button>
      {showMenu ? (
        <div
          className="fixed top-0 right-0 w-[320px] transition ease-in-out delay-150 border-l border-gray-800 bg-black h-screen px-8"
          data-aos="flip-left"
        >
          <div className="py-5">
            <button
              onClick={handleMenu}
              className="p-3 bg-red-800 rounded-full hover:bg-red-900"
            >
              <X />
            </button>
          </div>
          <br />
          <div className="relative h-[80%] flex flex-col justify-center md:gap-3">
            <NavbarItems
              link="/"
              logo={<Home />}
              text="Home"
              handleMenu={handleMenu}
            />
            <NavbarItems
              link=""
              logo={<Film />}
              text="Watchlist"
              handleMenu={handleMenu}
            />
            <NavbarItems
              link=""
              logo={<Clapperboard />}
              text="Movies"
              handleMenu={handleMenu}
            />
            <NavbarItems
              link=""
              logo={<TrendingUp />}
              text="Trending"
              handleMenu={handleMenu}
            />
            <NavbarItems
              link=""
              logo={<HandHelping />}
              text="Contibute"
              handleMenu={handleMenu}
            />
            <NavbarItems
              link=""
              logo={<BookText />}
              text="Learn more"
              handleMenu={handleMenu}
            />
            <div className="w-full h-max text-xs flex flex-col justify-end items-center gap-5 my-5 md:my-10">
              <p className="text-center">Want to logout?</p>
              <button
                className="px-7 py-2 text-xs rounded-md bg-red-900"
                onClick={HandleLogout}
              >
                Logout
              </button>
            </div>
            <div className=" bg-gray-800/40 w-full h-max flex items-center gap-3 px-4 py-3 rounded-lg">
              <div className="w-10">
                <img src={avatar} className="rounded-full" />
              </div>
              <p className="text-xs flex-1 border-r-2 ">John Doe</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
