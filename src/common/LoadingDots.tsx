import * as React from "react";

export default function LoadingDots() {
  const [dots, setDots] = React.useState("");
  React.useEffect(() => {
    const timerId = setTimeout(() => {
      if (dots === "...") {
        setDots("");
      } else {
        setDots(`${dots}.`);
      }
    }, 500);
    return () => clearTimeout(timerId);
  }, [dots]);
  return (
    <div className="flex flex-row justify-center w-full animate-pulse">
      <div className="w-1/2 text-right">loading</div>
      <div className="w-1/2 text-left">{dots}</div>
    </div>
  );
}
