const Modal = ({ handleClick, message }) => {
  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-50 z-40" />
      <div className="fixed left-[calc(50%-20px)] top-1/2 w-80 h-auto rounded-lg bg-white border border-alpha-blue flex flex-col justify-center items-stretch -translate-x-1/2 -translate-y-1/2 z-50">
        <p className="text-base font-bold text-wrap text-center py-4 px-4">
          {message}
        </p>
        <div className="w-full border border-alpha-blue" />
        <button className="py-2 px-4 text-base" onClick={handleClick}>
          确定
        </button>
      </div>
    </div>
  );
};

export default Modal;
