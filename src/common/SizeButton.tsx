interface ISizeButton {
  text: string;
  description: string;
  notAllowed: boolean;
  action: () => void;
}

const style = `
    flex 
    px-4 
    m-2 
    text-2xl 
    rounded 
    text-gray-600 
    border 
    border-gray-600
    `;
const styleAllowed = `
    cursor-pointer 
    hover:bg-gray-600 
    hover:text-black
    `;
const styleNotAllowed = `
    cursor-not-allowed
    text-gray-800 
    border 
    border-gray-800
    `;

export default function SizeButton({
  text,
  description,
  notAllowed,
  action,
}: ISizeButton) {
  return (
    <div
      title={`${notAllowed && "not allowed "}set size ${description}`}
      className={`${style} ${notAllowed ? styleNotAllowed : styleAllowed} `}
      onClick={action}
    >
      <div className="self-center">{text}</div>
    </div>
  );
}
