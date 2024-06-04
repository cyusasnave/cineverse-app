import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { DynamicData } from "../../../@types/DynamicTypes";
import { movies } from "../../../Data/movieData";
import { CalendarRange, Timer } from 'lucide-react';
import { Link } from "react-router-dom";

const Hero = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (
    _s: DynamicData,
    time: number,
    progress: number
  ) => {
    // @ts-expect-error ignore expected errors
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    // @ts-expect-error ignore expected errors
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="w-full h-screen"
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.name}
            style={{
              backgroundImage: `url(${movie.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="relative w-full h-full flex justify-center items-center"
          >
            <div className=" absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent" />
            <div className=" absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent" />
            <div className="w-[70%] h-full flex flex-col justify-center items-start gap-8 z-50">
              <h1 className="text-5xl font-bold">{movie.name}</h1>
              <div className="text-xs text-gray-300 font-light flex flex-wrap items-center gap-5">
                <div>{movie.genres}</div>
                <div className="flex gap-1 items-center"><CalendarRange size={18} color="red" />{movie.year}</div>
                <div className="flex gap-1 items-center"><Timer size={18} color="red" />{movie.duration}</div>
              </div>
              <div>
                <Link to={"/users"}>
                  <button className="px-7 py-2 text-sm rounded-md bg-red-700">Watch now</button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent} />
        </div>
      </Swiper>
    </>
  );
};

export default Hero;
