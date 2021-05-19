import Button from "../common/Button";

interface IToTop {
  topY: number;
}

export default function ToTop({ topY }: IToTop) {

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return topY < -500 ? (
    <div
      className={`fixed right-1 bottom-24`}
      onClick={handleClick}
      title="to top"
    >
      <Button rounded={true}>&#9650;</Button>
    </div>
  ) : null;
}
