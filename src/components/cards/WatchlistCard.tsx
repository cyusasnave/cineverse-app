import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  title: string;
  year: string;
  rating: string;
  id: string;
  handleClick: () => void;
}

const WatchlistCard = ({ image, title, year, rating, id, handleClick }: Props) => {
  return (
    <div className="w-full h-max p-5 bg-gray-400/5 mb-3 rounded-xl cursor-pointer flex items-center gap-10 justify-center md:justify-between flex-wrap">
      <div className="flex items-start gap-10 flex-wrap">
        <div className="w-full md:w-[120px]">
          <img src={image} alt={title} className="rounded-xl" />
        </div>
        <div className="h-full flex-center flex-1">
          <div className="flex flex-col justify-center items-center md:items-start gap-3">
            <h3 className="text-3xl font-bold my-3 text-gray-600">{title}</h3>
            <div className="flex flex-col justify-center gap-3 text-xs">
              <div className="text-gray-600">
                Released: <span className="text-white/70">{year}</span>
              </div>
              <div className="text-gray-600">
                Ratings: <span className="text-yellow-700">{rating}/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-5 flex flex-col gap-5">
        <Link to={`/movies/${id}`}>
          <button className="transition ease-in-out hover:-translate-y-.5 hover:scale-110 px-7 py-2 w-full text-xs rounded-md bg-yellow-900 hover:bg-yellow-950">
            Watch now
          </button>
        </Link>
        <button onClick={handleClick} className="transition ease-in-out hover:-translate-y-.5 hover:scale-110 px-7 py-2 w-full text-xs rounded-md bg-red-900 hover:bg-red-950 flex items-center justify-center gap-2">
          <Trash2 size={15} /> Remove
        </button>
      </div>
    </div>
  );
};

export default WatchlistCard;
