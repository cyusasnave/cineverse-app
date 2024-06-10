/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DynamicData } from "../../@types/DynamicTypes";
import dataNotFounfGif from "../../assets/page-not-found.gif";
import GenresCard from "../../components/cards/GenresCard";
import Loader from "../../components/cards/Loader";
import MovieCard from "../../components/cards/MovieCard";
import ProtectedLayout from "../../layouts/ProtectedLayout";
import { RootState } from "../../redux/store";
import { useFetcher } from "../../utils/api";

const Movies = () => {
  const movies = useSelector((state: RootState) => state.movies.data[0]);
  const [querry, setQuerry] = useState("");
  const [myGenre, setGenre] = useState("");
  const [showTab, setShowTab] = useState(true);
  const [movieYear, setMovieYear] = useState(0);
  const [movieData, setMovieData] = useState([]);
  const { isLoading, isError, data } = useFetcher("/genres");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!movies) {
      toast.warning("Try access the movies again!");
      navigate("/");
      return;
    }
    const filterMovies = () => {
      switch (true) {
        case querry === "" && movieYear === 0 && myGenre === "":
          return movies;
        case querry !== "" && movieYear !== 0 && myGenre !== "":
          return (movies as DynamicData[]).filter(
            (movie) =>
              movie.title.toLowerCase().includes(querry) &&
              movie.releaseYear === movieYear &&
              movie.genres.some(
                (genreData: DynamicData) => genreData.name === myGenre
              )
          );
        case querry !== "" && movieYear !== 0:
          return (movies as DynamicData[]).filter(
            (movie) =>
              movie.title.toLowerCase().includes(querry) &&
              movie.releaseYear === movieYear
          );
        case querry !== "" && myGenre !== "":
          return (movies as DynamicData[]).filter(
            (movie) =>
              movie.title.toLowerCase().includes(querry) &&
              movie.genres.some(
                (genreData: DynamicData) => genreData.name === myGenre
              )
          );
        case movieYear !== 0 && myGenre !== "":
          return (movies as DynamicData[]).filter(
            (movie) =>
              movie.releaseYear === movieYear &&
              movie.genres.some(
                (genreData: DynamicData) => genreData.name === myGenre
              )
          );
        case querry !== "":
          return (movies as DynamicData[]).filter((movie) =>
            movie.title.toLowerCase().includes(querry)
          );
        case movieYear !== 0:
          return (movies as DynamicData[]).filter(
            (movie) => movie.releaseYear === movieYear
          );
        case myGenre !== "":
          return (movies as DynamicData[]).filter((movie) =>
            movie.genres.some(
              (genreData: DynamicData) => genreData.name === myGenre
            )
          );
        default:
          return [];
      }
    };
    const filteredMovies = filterMovies();

    if (filteredMovies) {
      setMovieData(filteredMovies);
    }
  }, [myGenre, movieYear, movies, navigate, querry]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 1100) {
      setShowTab(false);
    } else {
      setShowTab(true);
    }
  }, [windowWidth]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    toast.error(isError.message);
    navigate("/");
    return;
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 },
    (_, index) => currentYear - index
  );
  
  return (
    <ProtectedLayout>
      {!isLoading ? (
        <div className="flex">
          {showTab && (
            <div className="sticky top-0 left-0 flex items-end justify-end pb-4 h-screen w-[35%]">
              <div className="w-[90%] h-[80%] bg-white/5 rounded-3xl p-5">
                <h2 className="text-3xl font-bold my-3 pl-3 text-gray-600">
                  Discover
                </h2>
                <GenresCard
                  key={"reset genres"}
                  name={"Click here to cancel search"}
                  handleClick={() => setGenre("")}
                  otherStyles={myGenre === "" ? "active" : ""}
                />
                <div className=" w-full h-[90%] overflow-y-scroll bg-transparent pr-3">
                  {data &&
                    data.genres.rows.map((genre: DynamicData) => (
                      <GenresCard
                        key={genre.id}
                        name={genre.name}
                        handleClick={() => setGenre(genre.name)}
                        otherStyles={myGenre === genre.name ? "active" : ""}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}
          <div className="w-full h-max flex flex-col items-center mt-32 lg:mt-10">
            <div className="w-full h-max">
              <h1 className="text-2xl md:text-4xl font-bold my-7 text-gray-600 text-center">
                Unlocking Cinematic Universes: <br /> Search and Discover
              </h1>
              <div className="w-full h-max flex flex-wrap justify-center items-center gap-5 mb-14 px-10 md:px-0">
                {!showTab && (
                  <div className="flex items-center gap-4 w-full md:w-1/5 text-sm">
                    <div className="py-3 bg-gray-500/40 outline-none rounded-full flex-1 px-5">
                      <select
                        id="genre"
                        onChange={(e) => setGenre(e.target.value)}
                        className="text-white bg-transparent w-full outline-none"
                        defaultValue={""}
                      >
                        <option value={""}>Explore by Genre</option>
                        {data &&
                          data.genres.rows.map((genre: any) => (
                            <option key={genre?.id} value={genre?.name}>
                              {genre.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                )}
                <div className="w-full md:w-1/3 relative flex items-center">
                  <Search className="absolute left-5" />
                  <input
                    type="text"
                    className="text-white w-full py-3 pl-14 text-sm bg-gray-500/40 outline-none rounded-full"
                    placeholder="Search movies"
                    onChange={(e) => setQuerry(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4 w-full md:w-1/5 text-sm">
                  <label htmlFor="" className="text-gray-400">
                    Year:
                  </label>
                  <div className="py-3 bg-gray-500/40 outline-none rounded-full flex-1 px-5">
                    <select
                      id="year"
                      onChange={(e) => setMovieYear(Number(e.target.value))}
                      className="text-white bg-transparent w-full outline-none"
                    >
                      <option> </option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[90%] footer-card-container gap-10 place-items-center bg-gradient-to-b from-gray-700/20 to-transparent rounded-[50px] p-10">
              {movieData.length > 0 ? (
                movieData.map((movie: DynamicData) => {
                  return (
                    <MovieCard
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      image={movie.poster}
                      duration={movie.duration}
                    />
                  );
                })
              ) : (
                <div className="w-[70%] h-[300px] flex flex-col gap-10 justify-center items-center text-center font-light text-gray-400">
                  <img src={dataNotFounfGif} alt="data-not-found" width={150} />
                  <p>
                    Apologies, the movie you're looking for isn't currently in
                    our database. Keep exploring—our collection is expanding, so
                    there's always something new to discover!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </ProtectedLayout>
  );
};

export default Movies;
