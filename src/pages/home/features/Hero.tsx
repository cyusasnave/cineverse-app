import { CalendarRange, Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { DynamicData } from "../../../@types/DynamicTypes";
import Loader from "../../../components/cards/Loader";
import { initialMovies } from "../../../redux/features/movieSlice";
import { useFetcher } from "../../../utils/api";

const Hero = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const [movieData, setMovieData] = useState([]);
  const { isLoading, isError, data } = useFetcher("/movies");
  const dipatch = useDispatch();

  useEffect(() => {
    if (data) {
      setMovieData(data.movies.rows);
      dipatch(initialMovies(data.movies.rows));
    }
  }, [data, dipatch]);

  if (isError) {
    toast.error(isError.message);
  }

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
      {isLoading ? (
        <Loader />
      ) : (
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
          className="w-full h-screen overflow-x-hidden"
        >
          {movieData &&
            movieData.map((movie: DynamicData) => (
              <SwiperSlide
                key={movie.id}
                style={{
                  backgroundImage: `url(${movie.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className="relative w-full h-full flex justify-center items-center"
              >
                <div className=" absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent" />
                <div className=" absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent" />
                <div className="w-[70%] h-full flex flex-col justify-center items-center md:items-start gap-8 z-50">
                  <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
                  <div className="text-xs text-gray-300 font-light flex flex-wrap items-center gap-5">
                    <div>
                      {movie.genres.map(
                        (genre: DynamicData, index: number) =>
                          `${genre.name}${
                            index == movie.genres.length - 1 ? "" : "/"
                          }`
                      )}
                    </div>
                    <div className="flex gap-1 items-center">
                      <CalendarRange size={18} color="red" />
                      {movie.releaseYear}
                    </div>
                    <div className="flex gap-1 items-center">
                      <Timer size={18} color="red" />
                      {movie.duration}
                    </div>
                  </div>
                  <div>
                    <Link to={`/movies/${movie.id}`}>
                      <button className="px-7 py-2 text-sm rounded-md bg-red-700">
                        Watch trailer
                      </button>
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
      )}
    </>
  );
};

export default Hero;
