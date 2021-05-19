const hoverStyle = `${
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? ""
    : "hover:bg-indigo-400"
}`;

const style = `
  select-none 
  flex 
  flex-col 
  my-4 
  justify-center 
  items-center 
  w-full 
  h-18 
  text-white 
  text-xl 
  bg-indigo-900
  `;

interface IShowMore {
  pagination: number;
  length: number;
  action: () => void;
}

export default function ShowMore({ pagination, length, action }: IShowMore) {
  return (
    <div
      className={pagination < length ? `cursor-pointer ${style} ${hoverStyle}` : style}
      onClick={() => pagination < length && action()}
    >
      <div>{pagination < length ? "show more" : "no more"}</div>
      <div>
        {pagination} from {length}
      </div>
    </div>
  );
}
