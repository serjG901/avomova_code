import * as React from "react";
import Player from "./Player";
import Reader from "./Reader";

interface IWatch {
  type: string;
  slug: string;
  titleMedia: {
    be: string;
    en: string;
  };
  description: {
    be: string;
  };
}

const style = `
  select-none
  transition 
  ease-linear 
  w-full 
  text-center
  px-1
  text-white 
  text-2xl 
  bg-indigo-900 
  hover:bg-indigo-400 
`;

export default function Watch({ type, slug, titleMedia, description }: IWatch) {
  let mediaType = "";
  switch (type) {
    case "anime":
      mediaType = "anime";
      break;
    case "DUB":
      mediaType = "anime";
      break;
    case "SUB":
      mediaType = "anime";
      break;
    case "cinema":
      mediaType = "cinema";
      break;
    case "CINEMA":
      mediaType = "cinema";
      break;
    case "manga":
      mediaType = "manga";
      break;
    case "MANGA":
      mediaType = "manga";
      break;
  }

  const [showPlayer, setShowPlayer] = React.useState(false);
  const handleClosePlayer = () => {
    if (showPlayer) setShowPlayer(false);
  };

  const handleOpenPlayer = () => {
    if (!showPlayer) setShowPlayer(true);
  };
  return (
    <>
      {!showPlayer ? (
        <button className={style} onClick={handleOpenPlayer}>
          watch
        </button>
      ) : mediaType === "manga" ? (
        <Reader
          slug={slug}
          mediaType={mediaType}
          closePlayer={handleClosePlayer}
          titleMedia={titleMedia}
          description={description}
        />
      ) : (
        <Player
          slug={slug}
          mediaType={mediaType}
          closePlayer={handleClosePlayer}
          titleMedia={titleMedia}
          description={description}
        />
      )}
    </>
  );
}
