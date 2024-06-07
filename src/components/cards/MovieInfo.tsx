interface Props {
  name: string,
  info: string
}

const MovieInfo = ({ name, info }: Props) => {
  return (
    <div className="h-max py-2 pl-10 rounded-sm text-xs font-light">
      <strong className="text-gray-400">{name}:</strong>{" "}
      <span>{info}</span>
    </div>
  );
};

export default MovieInfo;
