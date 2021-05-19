const hoverStyle = `${
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? ""
    : "hover:bg-indigo-400"
}`;

const style = `
    appearance-none 
    focus:outline-none 
    focus:shadow-outline
    select-none
    flex
    justify-center
    filter 
    drop-shadow-lg
    transition 
    ease-linear 
    cursor-pointer 
    text-white 
    text-xl 
    m-1 
    p-2 
    ${hoverStyle}
    `;

const styleActive = `
    bg-indigo-400
    `;

const styleNotActive = `
    bg-indigo-900
    `;

const styleRounded = `
    h-12
    w-12
    rounded-full
    `;

interface IButton {
  children?: React.ReactChild;
  text?: string;
  isActive?: boolean;
  rounded?: boolean;
  action?: (value?: string) => void;
  payload?: string;
}

export default function Button({
  children,
  text = "",
  isActive = false,
  rounded = false,
  action = (value?: string) => {},
  payload = "",
}: IButton) {
  return (
    <div
      onClick={() => (payload ? action(payload) : action())}
      className={`
        ${style} 
        ${isActive ? styleActive : styleNotActive} 
        ${rounded ? styleRounded : ""}
        `}
    >
      <div className="self-center">{text ? text : children}</div>
    </div>
  );
}
