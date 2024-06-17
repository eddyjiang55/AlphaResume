const LoadingBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className="bg-alpha-blue h-6 text-base font-medium text-blue-100 text-center p-0.5 leading-none rounded-full transition-all duration-300"
        style={{ width: progress + "%" }}
      >
        {" "}
        {progress}%
      </div>
    </div>
  );
};

export default LoadingBar;
