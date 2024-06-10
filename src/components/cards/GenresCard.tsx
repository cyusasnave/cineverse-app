import React from "react";

interface Props {
  otherStyles: string
  name: string;
  handleClick: () => void;
}

const GenresCard: React.FC<Props> = ({ otherStyles, name, handleClick }) => {
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.maxTouchPoints > 0);

  const clickOrHoverEvent = isTouchDevice ? 'onClick' : 'onClick';

  return (
    <div
      { ...{ [clickOrHoverEvent]: handleClick }}
      className={`w-full py-2 px-4 bg-gray-400/5 mb-3 rounded-lg cursor-pointer ${otherStyles}`}
    >
      <div className="border-l border-gray-400 pl-4 text-sm text-gray-400">
        {name}
      </div>
    </div>
  );
};

export default GenresCard;
