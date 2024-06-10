import {
  ArrowLeftToLine,
  BookText,
  CirclePlus,
  Clapperboard,
  Film,
  // HandHelping,
  Home,
  Menu,
  X,
} from "lucide-react";
import logo from "../assets/logo.png";
import NavbarItems from "./NavbarItems";
import avatar from "../assets/avatar.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API, useFetcher } from "../utils/api";
import IconLoader from "./Icon/IconLoader";

const initialState = { isLoading: false, error: null };

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showlogo, setShowlogo] = useState(true);
  const [showback, setShowback] = useState(true);
  const [state, setState] = useState(initialState);
  const [showSignup, setShowSignup] = useState(false);
  const { isError, data } = useFetcher("/users/loggedInUser");
  // const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowlogo(false);
    } else {
      setShowlogo(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isError) {
      if (isError.status === "UNAUTHORIZED") {
        setShowSignup(true);
      } else {
        setShowSignup(false);
      }
    }
  }, [isError, showSignup]);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowback(false);
      return;
    }
    setShowback(true);
  }, [location.pathname]);

  const HandleLogout = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const res = await API.get("/users/logout");
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.replace("/");
      }, 300);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error:
          error.response?.data?.message ||
          error?.message ||
          "Unknown error occured!",
      }));
      toast.error(state.error);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
      setShowMenu(false);
    }
  };

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="fixed top-0 z-[10000] w-full h-max">
      {showlogo && (
        <div className="absolute top-0 left-0">
          <img src={logo} className="w-[70%] md:w-[80%]" />
        </div>
      )}
      <div className="absolute top-6 md:top-14 right-6 md:right-14 flex flex-col place-items-end gap-6">
        {showSignup && (
          <button
            onClick={handleSignUp}
            className="py-2.5 md:py-3 bg-red-800 rounded-full hover:bg-red-900 w-[130px] text-sm flex items-center justify-center gap-2"
          >
            <CirclePlus /> SignUp
          </button>
        )}
        <button onClick={handleMenu} className="men-btn w-max">
          <Menu />
        </button>
        {showback && (
          <button onClick={handleBack} className="men-btn w-max">
            <ArrowLeftToLine />
          </button>
        )}
      </div>
      {showMenu ? (
        <div
          className="fixed top-0 right-0 w-[320px] transition ease-in-out delay-150 border-gray-800 bg-gradient-to-l from-black to-black/80 h-screen px-8"
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
              link="/watchlist"
              logo={<Film />}
              text="Watchlist"
              handleMenu={handleMenu}
            />
            <NavbarItems
              link="/movies"
              logo={<Clapperboard />}
              text="Movies"
              handleMenu={handleMenu}
            />
            {/* <NavbarItems
              link=""
              logo={<HandHelping />}
              text="Contibute"
              handleMenu={handleMenu}
            /> */}
            <NavbarItems
              link="/about"
              logo={<BookText />}
              text="Learn more"
              handleMenu={handleMenu}
            />
            {!showSignup && (
              <div className="w-full h-max text-xs flex flex-col justify-end items-center gap-5 my-5 md:my-10">
                <p className="text-center">Want to logout?</p>
                <button
                  className="px-7 py-2 text-xs rounded-md bg-red-900 w-[70%] flex items-center gap-1 justify-center"
                  onClick={HandleLogout}
                >
                  {state.isLoading ? (
                    <>
                      <IconLoader className="animate-spin mr-1" />{" "}
                      {" Loading..."}
                    </>
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            )}
            {data && (
              <div className=" bg-gray-800/40 w-full h-max flex items-center gap-3 px-4 py-3 rounded-lg">
                <div className="w-10">
                  <img src={avatar} className="rounded-full" />
                </div>
                <p className="text-xs flex-1 border-r-2 ">{data.user.name}</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
