import { useNavigate } from "react-router-dom";
import ProtectedLayout from "../../layouts/ProtectedLayout";
import { API, useFetcher } from "../../utils/api";
import { toast } from "sonner";
import Loader from "../../components/cards/Loader";
import WatchlistCard from "../../components/cards/WatchlistCard";
import { useEffect, useState } from "react";
import { DynamicData } from "../../@types/DynamicTypes";

const Watchlists = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState<DynamicData | null>(null);
  const navigate = useNavigate();
  const { isLoading, isError, data, refetch } = useFetcher("/watchlists");

  useEffect(() => {
    if (isLoading) {
      setLoading(isLoading);
    } else {
      setLoading(isLoading);
    }

    if (isError) {
      setError(isError);
    }

    if (data) {
      setWatchlists(data?.watchlist);
    }
  }, [data, isError, isLoading, watchlists]);

  if (error) {
    toast.error(error.message);
    navigate("/");
    return;
  }

  const handleRemoveWatchlist = async (id: string) => {
    try {
      setLoading(true);
      const res = await API.delete(`/watchlists/${id}`);
      toast.success(res.data?.message);
      refetch();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unknown error occured! Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedLayout>
      {Loading ? (
        <Loader />
      ) : (
        <div className="w-full h-max mt-20">
          <h1 className="text-3xl md:text-5xl font-bold my-7 text-gray-600 text-center">
            Saved Movies - favorites
          </h1>
          <div className="w-full h-max p-5 flex-center">
            <p className="w-4/5 text-center text-sm text-gray-400">
              Welcome to your personalized Watchlist, where all your favorite
              shows and movies are just a click away. Whether you're planning
              your next binge-watch session or saving the latest releases for a
              rainy day, this is your one-stop destination to keep track of
              everything you love.
            </p>
          </div>
          <div className="flex-center w-full mt-10">
            <div className="w-[90%] gap-10 place-items-center bg-gradient-to-b from-gray-700/20 to-transparent rounded-[50px] p-10">
              {watchlists.length > 0 ? (
                watchlists.map((watchlist: DynamicData) => (
                  <WatchlistCard
                    id={watchlist?.movie?.id}
                    image={watchlist?.movie?.poster}
                    title={watchlist?.movie?.title}
                    year={watchlist?.movie?.releaseYear}
                    rating={watchlist?.movie?.rating}
                    handleClick={() => handleRemoveWatchlist(watchlist?.id)}
                  />
                ))
              ) : (
                <h1 className="text-xl md:text-3xl font-bold my-7 text-gray-600 text-center">
                  Nothing found!
                </h1>
              )}
            </div>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

export default Watchlists;
