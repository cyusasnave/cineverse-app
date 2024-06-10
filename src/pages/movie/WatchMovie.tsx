import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from "../../components/cards/Loader";
import ProtectedLayout from "../../layouts/ProtectedLayout";
import { useFetcher } from "../../utils/api";

const WatchMovie = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = useFetcher(`/movies/${id}`);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isError) {
    if (isError.status === "UNAUTHORIZED") {
      toast.error(isError.message);
      navigate("/login");
      return;
    } else if (isError.status === "BAD REQUEST") {
      toast.error(isError.message);
      navigate("/");
      return;
    } else {
      toast.error(isError.message);
    }
  }
  console.log(data?.movie?.trailer?.split("=")[1]);
  return (
    <ProtectedLayout>
      {isLoading || !data ? (
        <Loader />
      ) : (
        <div className="w-full h-screen flex justify-center items-end rounded-3xl border-red-700/30 pb-10">
          <div className="w-[80%] h-[80%]">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${data?.movie?.trailer.split("=")[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              // className="border-4 border-red-700/30"
            ></iframe>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

export default WatchMovie;
