interface ICloseButton {
  target: string;
  action: () => void;
}

const style = `
    text-red-900
    font-bold 
    p-2 
    m-2 
    cursor-pointer 
    rounded 
    border 
    border-red-900 
    hover:bg-red-900 
    hover:text-black
`;

export default function CloseButton({ target, action }: ICloseButton) {
  return (
    <div title={`close ${target}`} className={style} onClick={action}>
      close
    </div>
  );
}
