const SaveToast = ({ message }) => {
  return (
    <div className="fixed left-[calc(50%-20px)] top-1/2 w-80 h-auto rounded-lg bg-white border border-alpha-blue flex flex-row justify-center items-center gap-x-2 -translate-x-1/2 -translate-y-1/2 z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-info-circle w-6 h-6"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M12 9h.01" />
        <path d="M11 12h1v4h1" />
      </svg>
      <p className="text-base font-bold text-wrap text-center py-4">
        {message}
      </p>
    </div>
  );
};

export default SaveToast;
