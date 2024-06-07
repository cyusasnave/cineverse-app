import { Link, useNavigate, useParams } from "react-router-dom";
import { API, useFetcher } from "../../utils/api";
import Loader from "../../components/cards/Loader";
import { useEffect, useRef, useState } from "react";
import { DynamicData } from "../../@types/DynamicTypes";
import { CircleCheckBig, Film, Info } from "lucide-react";
import { toast } from "sonner";
import IconLoader from "../../components/Icon/IconLoader";
import MovieInfo from "../../components/cards/MovieInfo";
import dataNotFounfGif from "../../assets/page-not-found.gif";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Autoplay } from "swiper/modules";

const initialState = { isLoading: false, error: null };

const SingleMovie = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = useFetcher(`/movies/${id}`);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState(initialState);
  const [inWatchlist, setInWatchlist] = useState(false);
  const watchlist = useFetcher("/watchlists");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (watchlist.data) {
      watchlist.data?.watchlist?.map((item: DynamicData) => {
        if (item?.movieId === id) {
          setInWatchlist(true);
        }
      });
    }
  }, [id, watchlist?.data]);

  if (isError) {
    if (isError.status === "UNAUTHORIZED") {
      toast.error(isError.message);
      window.location.replace("/login");
      return;
    } else if ( isError.status === "BAD REQUEST") {
      toast.error(isError.message);
      navigate("/");
      return
    } else {
      toast.error(isError.message);
    }
  }

  const restartVideo = () => {
    if (videoRef.current && videoRef.current.currentTime) {
      console.log(videoRef.current.currentTime);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleAddToWatchlist = async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const res = await API.post("/watchlists", { movieId: id });
      toast.success(res.data?.message);
      setInWatchlist(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error:
          error.response?.data?.message ||
          error.message ||
          "Unknown error occured! Please try again!",
      }));
      toast.error(state.error);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <>
      {isLoading || watchlist.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full h-max text-center relative">
            <div className="absolute top-0 left-0 -z-10 w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                onEnded={restartVideo}
              >
                <source
                  src={data.movie.trailer}
                  type="video/mp4"
                  className="h-full w-full"
                />
              </video>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-black/60"></div>
            </div>
            <div className="w-full min-h-screen flex items-end justify-center pb-10">
              <div className="h-max w-4/5 flex mt-32 lg:mt-0 flex-wrap items-center">
                <div className="h-[540px] w-full md:w-full lg:w-[400px] border-4 rounded-3xl border-red-700/30 shadow-[0_5px_30px_0px_rgba(0,0,0,1)]">
                  <div className="w-full h-full rounded-2xl z-10">
                    <img
                      src={data.movie.poster}
                      className="object-cover w-full h-full rounded-2xl"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center flex-1 h-[500px] lg:h-full mt-10 md:mt-0">
                  <div className="w-4/5 flex flex-col items-center md:items-start justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-center md:text-start text-gray-300">
                      {data.movie.title}
                    </h1>
                    <p className="text-sm text-gray-400 font-light text-center md:text-start my-5">
                      {data.movie.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-normal gap-4">
                      <div className="red-round-box">
                        {data.movie?.genres?.map(
                          (genre: DynamicData, index: number) =>
                            `${genre.name}${
                              index == data.movie.genres.length - 1 ? "" : "/"
                            }`
                        )}
                      </div>
                      <div className="red-round-box">
                        {data.movie.releaseYear}
                      </div>
                      <div className="red-round-box my-5">
                        {data.movie.duration}
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-normal flex-wrap items-center mt-10 gap-10">
                      <Link to={`/movies/${id}/watch`}>
                        <button className="transition ease-in-out hover:-translate-y-.5 hover:scale-110 px-7 py-2 text-xs rounded-md bg-red-900 hover:bg-red-950">
                          Watch now
                        </button>
                      </Link>
                      {!inWatchlist ? (
                        <button
                          onClick={() => handleAddToWatchlist(data.movie?.id)}
                          className="transition ease-in-out hover:-translate-y-.5 hover:scale-110 flex items-center justify-center gap-3 py-2 px-5 bg-white/50 hover:bg-yellow-600/50 rounded-full text-white/90 text-xs font-light w-max"
                        >
                          {state.isLoading ? (
                            <>
                              <IconLoader className="animate-spin mr-1" />{" "}
                              {"Processing..."}
                            </>
                          ) : (
                            <>
                              <Film size={18} />
                              <p>Add to Watchlist</p>
                            </>
                          )}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="flex items-center justify-center gap-3 py-2 px-5 bg-yellow-600/50 rounded-full text-white/90 text-xs font-light w-max"
                        >
                          <CircleCheckBig size={18} />
                          <p>Added to Watchlist</p>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* movie trailer section */}
          <div className="movie-display h-max mt-20">
            <div
              className="flex flex-col justify-center items-center"
              data-aos="fade-up-left"
              data-aos-duration="1000"
            >
              <h1 className="font-semibold my-5 text-gray-400 flex items-center gap-4">
                <Info /> Here are the details for the film:
              </h1>
              <div>
                <MovieInfo name="Director" info={data.movie.director} />
                <MovieInfo name="Ratings" info={data.movie.rating} />
                <MovieInfo
                  name="Genres"
                  info={data.movie?.genres?.map(
                    (genre: DynamicData, index: number) =>
                      `${genre.name}${
                        index == data.movie.genres.length - 1 ? "" : "/"
                      }`
                  )}
                />
                <MovieInfo name="Released" info={data.movie.releaseYear} />
                <MovieInfo name="Duration" info={data.movie.duration} />
              </div>
            </div>
            <div
              className="w-full h-max flex items-center justify-center md:justify-start"
              data-aos="fade-up-right"
              data-aos-duration="1000"
            >
              <div className="w-[70%] h-[80%]">
                <video className="w-full max-h-full object-cover mt-5" controls>
                  <source
                    src={data.movie.trailer}
                    type="video/mp4"
                    className="h-full w-full"
                  />
                </video>
              </div>
            </div>
          </div>
          {/* movie cast */}
          <div data-aos="zoom-in" data-aos-duration="1000">
            <div className="container flex items-center justify-center flex-col">
              <div className="w-full h-max flex items-center justify-center">
                <div className="w-1/2 mr-10 bg-gradient-to-t from-black to-red-950/40 h-[120px] rounded-t-3xl">
                  <h1 className="text-2xl md:text-4xl font-bold text-center h-full place-content-center">
                    Casts
                  </h1>
                </div>
              </div>
              {data.movie.casts.length > 0 ? (
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  slidesPerView={"auto"}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                  }}
                  modules={[EffectCoverflow, Autoplay]}
                  autoplay={{ delay: 3000 }}
                  initialSlide={4} // Add autoplay prop here
                  className="swiper_container"
                >
                  {data.movie.casts?.map((cast: DynamicData) => (
                    <SwiperSlide
                      key={cast.id}
                      className="border-4 rounded-3xl border-red-700/30 bg-black shadow-[0_5px_30px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="w-full h-[80%] bg-black p-3 rounded-3xl">
                        <img
                          src={cast.image}
                          alt={`${cast.name} image`}
                          className="rounded-2xl"
                        />
                      </div>
                      <div className="w-full h-[20%] px-3 pb-3">
                        <div className="bg-gray-950/50 h-full text-gray-300 rounded-2xl flex items-center justify-center flex-col">
                          <h4 className="text-sm">{cast.name}</h4>
                          <p className="text-xs">{`~ ${cast.nationality} ~`}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-[70%] h-[300px] flex flex-col gap-10 justify-center items-center text-center font-light text-gray-400">
                  <img src={dataNotFounfGif} alt="data-not-found" width={150} />
                  <p>
                    Certainly! The movie lacks cast information, adding an
                    element of mystery to its appeal. Despite this absence, it
                    offers compelling storytelling or captivating visuals,
                    making it worth exploring with an open mind.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleMovie;
