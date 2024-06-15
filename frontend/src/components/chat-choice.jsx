import { useState } from "react";

const ChatChoice = ({ onClick }) => {
  const [yesState, setYesState] = useState(false);
  const [noState, setNoState] = useState(false);

  const handleYes = () => {
    setYesState(true);
    setNoState(false);
    onClick(true);
  };

  const handleNo = () => {
    setYesState(false);
    setNoState(true);
    onClick(false);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-x-4">
      <button
        className={`flex flex-row justify-center items-center gap-x-4 p-2 rounded-lg border border-solid border-[#1D807A] hover:bg-gray-300 ${
          noState ? "cursor-not-allowed bg-gray-300" : "bg-white"
        }`}
        onClick={handleYes}
        disabled={yesState || noState}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-check w-6 h-6 text-green-500"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
        是
      </button>
      <button
        className={`flex flex-row justify-center items-center gap-x-4 p-2 rounded-lg border border-solid border-[#1D807A] hover:bg-gray-300 ${
          yesState ? "cursor-not-allowed bg-gray-300" : "bg-white"
        } `}
        onClick={handleNo}
        disabled={yesState || noState}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-x w-5 h-5 text-red-500"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
        否
      </button>
    </div>
  );
};

export default ChatChoice;
