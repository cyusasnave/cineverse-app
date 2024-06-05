import { Link } from "react-router-dom";
import creedFooterImage from "../assets/creed.jpeg";
import logoName from "../assets/logoName.png";

const Footer = () => {
  return (
    <div className="w-full h-[900px] relative" data-aos="fade-up" data-aos-duration="2000">
      <img src={creedFooterImage} className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-transparent" />
      <div className="absolute top-0 w-full h-full footer-card-container place-content-center">
        <div className="footer-cards">
          <div className="flex justify-center flex-col items-center">
            <img src={logoName} alt="logoname" className="w-[50%]" />
            <p className="text-xs leading-5 font-light text-gray-400 p-3 text-center mt-5">
              Your ultimate movie hub! Dive into a curated world of
              blockbusters, classics, and hidden gems. With personalized
              recommendations and easy navigation, CineVerse brings the magic of
              cinema to your screen. Join us for an unforgettable movie
              experience!
            </p>
          </div>
        </div>
        <div className="footer-cards">
          <div className="flex justify-center flex-col items-center">
            <h4 className="text-white text-sm mb-10">Support</h4>
            <ul className="flex flex-col items-center text-xs gap-5 text-gray-300/70">
              <Link to={""}>
                <li>About us</li>
              </Link>
              <Link to={""}>
                <li>Collaborate</li>
              </Link>
              <Link to={""}>
                <li>Subscription</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="footer-cards">
          <div className="flex justify-center flex-col items-center">
            <h4 className="text-white text-sm mb-7">Get in touch</h4>
            <p className=" text-gray-300/70 text-xs">Contact us on:</p>
            <ul className="flex flex-col items-center text-xs font-light gap-5 mt-8 text-gray-300/70">
              <li>
                <strong className="text-white/80">Tel:{" "}</strong>+250 789 413 177
              </li>
              <li>
                <strong className="text-white/80">Email:{" "}</strong>cyusasnaveee@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-[50px] border-t border-gray-700 flex justify-center items-center text-xs text-gray-500">
        &copy; Copyright. All right reserved
      </div>
    </div>
  );
};

export default Footer;
