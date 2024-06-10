// import { ChildrenProps } from "../@types/DynamicTypes";
import registerLogin from "../assets/registerLoginBG.jpg";
import googleIcon from "../assets/google-icon.png";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface Props {
  children: ReactNode;
  text: string;
  buttonText: string;
  location: string;
  formText: string;
}

const RegisterLogin: React.FC<Props> = ({
  children,
  text,
  buttonText,
  location,
  formText,
}) => {
  return (
    <div
      className="w-full h-screen relative flex justify-center items-center"
      style={{
        backgroundImage: `url(${registerLogin})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent" />
      <div className="w-[90%] h-4/5 bg-gray-900 bg-opacity-30 backdrop-blur-sm shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl p-5 flex flex-wrap">
        <div className="register-container items-center px-5">
          <div className="w-4/5 flex flex-col items-center">
            <h1
              className="text-5xl font-bold text-transparent"
              style={{ WebkitTextStroke: "0.7px white" }}
            >
              Cine<span className="text-pink-950">Verse</span>
            </h1>
            <p className="text-xs leading-5 font-light text-gray-400 py-5">
              {formText}
            </p>
            {children}
            <Link to={"/"} className="mt-5 w-full">
              <Button
                type="button"
                text="Cancel"
                width="w-full"
                color="bg-red-800/50 hover:bg-red-800"
              />
            </Link>
          </div>
        </div>
        <div className="register-container px-5 flex-col text-xs font-light items-center justify-center h-full">
          <div className="w-full h-max">
            <div className="p-5 text-gray-400/80 text-center">
              Welcome to CineVerse: Your ultimate destination for the latest and
              greatest in the world of movies! Here, we are passionate about
              bringing the magic of cinema to your screen with a comprehensive
              collection of movie trailers, cast information, and in-depth
              descriptions.
            </div>
            <div className="w-full bg-white/75 hover:bg-white py-2 flex justify-center items-center text-black gap-4 rounded-lg mb-5 cursor-pointer">
              <img src={googleIcon} alt="google icon" width={25} />
              <p>Continue with Google</p>
            </div>
            <div className="w-full py-3 bg-white/15 flex justify-between items-center px-5 pl-10 rounded-xl">
              <p>{text}</p>
              <Link to={location} className="w-1/3 h-max">
                <button className="bg-slate-950 w-full h-full py-2 rounded-lg cursor-pointer">
                  {buttonText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
