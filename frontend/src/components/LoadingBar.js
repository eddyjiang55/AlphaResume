const LoadingBar = () => {
  return (
    <div className="relative w-full h-2 bg-gray-300 rounded overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-full bg-blue-500 animate-loading"></div>
    </div>
  );
};

export default LoadingBar;