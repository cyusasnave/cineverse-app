import phone from "../../../assets/phone.png";
import movieWatch from "../../../assets/movie-watch.gif";

const Explore = () => {
  return (
    <div className="w-full h-screen footer-card-container">
      <div
        className="flex items-center justify-center md:justify-end"
        data-aos="fade-up-right"
        data-aos-duration="1500"
      >
        <div className="w-[75%]">
          <h1 className="text-4xl font-semibold text-gray-300">
            Explore our premium movie selection on our website.
          </h1>{" "}
          <p className="text-gray-400 text-sm font-light my-5">
            Rent or purchase top-tier films for an unparalleled viewing
            experience. <br /> Start browsing now!
          </p>
          <img src={movieWatch} alt="" />
        </div>
      </div>
      <div
        className="flex items-center justify-center md:ml-10"
        data-aos="fade-up-left"
        data-aos-duration="1500"
      >
        <div className="w-[60%] h-max flex justify-center items-center">
          <img src={phone} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Explore;
