interface ICloseButton {
  target: string;
  action: () => void;
}

const hoverStyle = `${
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? ""
    : "hover:bg-red-900 hover:text-black"
}`;

const style = `
    text-red-900
    font-bold 
    p-2 
    m-2 
    cursor-pointer 
    rounded 
    border 
    border-red-900 
    ${hoverStyle}
`;

export default function CloseButton({ target, action }: ICloseButton) {
  return (
    <div title={`close ${target}`} className={style} onClick={action}>
      close
    </div>
  );
}
