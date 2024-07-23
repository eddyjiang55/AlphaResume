const LoadingBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 overflow-hidden">
      <div
        className="bg-alpha-blue h-6 p-0.5 rounded-full transition-all duration-300"
        style={{ width: progress + "%" }}
      />{" "}
    </div>
  );
};

export default LoadingBar;
