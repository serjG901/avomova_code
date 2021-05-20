export default function LoadingCard2() {
  return (
    <div className={`animate-pulse flex w-full max-w-xs flex-col m-4`}>
      <div
        className={`relative flex w-full max-w-xs pl-2 py-2 bg-purple-400 bg-opacity-20`}
      >
        <div
          className={`absolute top-1 -left-1 w-12 h-6 px-1 bg-white bg-opacity-50`}
        ></div>
        <div
          className={`absolute bottom-1 -left-1 px-1 bg-white bg-opacity-50 w-32 h-6`}
        ></div>
        <div className={`w-1/3 self-center h-24`}>
          <img className={`opacity-50`} src={`logo512.png`} alt={`logo`} />
        </div>
        <div className="w-2/3 h-72 flex">
          <div className="self-center bg-white bg-opacity-90 h-52 w-full"></div>
        </div>
      </div>
      <div className={`w-full h-8 px-1 bg-indigo-900`}></div>
    </div>
  );
}
