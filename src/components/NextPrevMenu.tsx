const hoverStyle = `${
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? ""
    : "hover:bg-yellow-900 hover:text-black"
}`;

const style = `
  text-yellow-900
  font-bold 
  p-2
  m-2 
  cursor-pointer 
  rounded 
  border 
  border-yellow-900 
  ${hoverStyle}
`;

interface INextPrevMenu {
  actionPrev: () => void;
  actionNext: () => void;
}

export default function NextPrevMenu({
  actionPrev,
  actionNext,
}: INextPrevMenu) {
  return (
    <div className="flex justify-center">
      <div title="previous page" className={style} onClick={actionPrev}>
        <div>prev</div>
      </div>

      <div title="next page" className={style} onClick={actionNext}>
        <div>next</div>
      </div>
    </div>
  );
}
