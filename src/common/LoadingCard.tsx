export default function EmptyCard() {
  return (
    <div className="animate-pulse flex w-full max-w-xs pl-2 py-1 m-4 bg-purple-400">
      <div className="w-1/3 bg-gray-500"></div>
      <div className="flex flex-col p-1 w-2/3">
        <div className="text-xl text-white text-left bg-gray-500 h-24 rounded mb-1"></div>
        <div className="text-sm text-gray-500 text-left bg-gray-500 h-12 rounded mb-1"></div>
        <div className="text-base text-black text-left overflow-hidden h-36 bg-gray-500 rounded mb-1"></div>
      </div>
    </div>
  );
}
