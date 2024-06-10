import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DynamicData } from "../../../@types/DynamicTypes";
import { RootState } from "../../../redux/store";
import { Search } from "lucide-react";
import MovieCard from "../../../components/cards/MovieCard";
import dataNotFounfGif from "../../../assets/page-not-found.gif";
import { Link } from "react-router-dom";
import Loader from "../../../components/cards/Loader";

const HomeMovie = () => {
  const movies = useSelector((state: RootState) => state.movies.data[0]);
  // const movies = [];
  const [movieData, setMovieData] = useState([]);
  const [querry, setQuerry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [movieYear, setMovieYear] = useState(0);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 },
    (_, index) => currentYear - index
  );

  useEffect(() => {
    if (!movies) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    const filterMovies =
      querry === "" && movieYear === 0
        ? movies
        : querry !== "" && movieYear !== 0
        ? (movies as DynamicData[]).filter(
            (movie) =>
              movie.title.toLowerCase().includes(querry) &&
              movie.releaseYear === movieYear
          )
        : querry !== ""
        ? (movies as DynamicData[]).filter((movie) =>
            movie.title.toLowerCase().includes(querry)
          )
        : (movies as DynamicData[]).filter(
            (movie) => movie.releaseYear === movieYear
          );
    if (filterMovies) {
      setMovieData(filterMovies);
    }
  }, [movieYear, movies, querry]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="p-5 flex flex-col justify-center items-center gap-7" data-aos="fade-up" data-aos-duration="1500">
          <h1 className="text-3xl md:text-5xl w-full font-bold text-center text-gray-500">
            Top Picks
          </h1>
          <p className="text-sm font-light w-[70%] text-gray-600 text-center">
            Explore endless movies at your fingertips! Search by name or year to
            discover your favorites and uncover hidden gems. With countless
            options available, your cinematic journey awaits!
          </p>
          <div className="w-full h-max flex flex-wrap justify-center items-center gap-5 mb-14">
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
                Release year:
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
          <div className="w-[90%] footer-card-container gap-y-10 place-items-center bg-gradient-to-b from-gray-700/20 to-transparent rounded-[50px] p-10">
            {movieData.length > 0 ? (
              movieData.slice(0, 6).map((movie: DynamicData) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  image={movie.poster}
                  duration={movie.duration}
                />
              ))
            ) : (
              <div className="w-[70%] h-[300px] flex flex-col gap-10 justify-center items-center text-center font-light text-gray-400">
                <img src={dataNotFounfGif} alt="data-not-found" width={150} />
                <p>
                  Apologies, the movie you're looking for isn't currently in our
                  database. Keep exploring—our collection is expanding, so
                  there's always something new to discover!
                </p>
              </div>
            )}
          </div>
          <div className="w-full h-[100px] flex justify-center items-center">
            <Link to={`/movies`}>
              <button className="px-7 py-2 text-sm rounded-md bg-red-800">
                Explore more
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeMovie;
