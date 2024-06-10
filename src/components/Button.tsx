import { DynamicData } from "../@types/DynamicTypes";

const Button = ({ type, text, width, disabled, color }: DynamicData) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`transition duration-150 ease-out hover:ease-in px-5 py-3 ${width} ${
        color ? color : "btn-color"
      } rounded-xl flex justify-center items-center gap-3 text-sm`}
    >
      {text}
    </button>
  );
};

export default Button;
