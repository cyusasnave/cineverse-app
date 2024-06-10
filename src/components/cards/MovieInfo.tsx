interface Props {
  name: string,
  info: string
}

const MovieInfo = ({ name, info }: Props) => {
  return (
    <div className="h-max py-4 pl-10 rounded-sm text-xs font-light flex items-center gap-2 bg-gray-700/50 justify-start border border-gray-400/50">
      <strong className="text-gray-400">{name}:</strong>{" "}
      <span>{info}</span>
    </div>
  );
};

export default MovieInfo;
