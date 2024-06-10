import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  image: string;
  // description: string;
  duration: string;
}

const MovieCard: React.FC<Props> = ({
  id,
  title,
  image,
  // description,
  duration,
}) => {
  return (
    <div className="h-[450px] w-[300px] border-4 rounded-3xl border-red-700/30 shadow-[0_5px_30px_0px_rgba(0,0,0,1)]">
      <div
        className="w-full h-full rounded-2xl"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full h-full bg-gradient-to-t from-black to-transparent rounded-2xl flex items-end p-7">
          <div className="w-full h-1/2 flex flex-col justify-end gap-4 items-start">
            <h3 className="text-xl font-bold text-gray-400">{title}</h3>
            {/* <p className="text-xs font-thin my-3">
              {description.substring(0, 100) + "..."}
            </p> */}
            <p className="text-xs">
              <strong className="text-rose-400 font-light">Runtime:</strong> {duration}
            </p>
            <Link to={`/movies/${id}`}>
              <button className="px-7 py-2 text-xs rounded-md bg-red-900">
                Explore
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
