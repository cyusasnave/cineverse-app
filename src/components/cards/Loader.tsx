import loader from "../../assets/loader.gif";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
