import * as React from "react";

import { useLazyQuery } from "@apollo/client";
import { GET_MEDIA_EPISODES } from "../graphql/query";

import { useLocalStorage } from "../useLocalStorage";

import LoadingDots from "../common/LoadingDots";
import SizeButton from "../common/SizeButton";
import MarksButton from "../common/MarksButton";
import CloseButton from "../common/CloseButton";

interface IPlayer {
  slug: string;
  mediaType: string;
  closePlayer: () => void;
  titleMedia: {
    be: string;
    en: string;
  };
  description: {
    be: string;
  };
}

const style = `
  w-full 
  text-center
  px-1
  text-white 
  text-2xl 
  bg-indigo-900 
`;

export default function Player({
  slug,
  mediaType,
  closePlayer,
  titleMedia,
  description,
}: IPlayer) {
  const [playerStore, setPlayerStore] = useLocalStorage(slug, "");

  const [ifarmeSize, setIfarmeSize] = React.useState({
    width: "360px",
    height: "240px",
  });

  const [currentEpisod, setCurrentEpisod] = React.useState("");

  const [loadingImage, setLoadingImage] = React.useState(true);

  const [getData, { loading, error, data }] = useLazyQuery(GET_MEDIA_EPISODES, {
    variables: {
      slug,
      mediaType,
    },
    fetchPolicy: "cache-and-network",
  });

  React.useEffect(() => {
    getData();
  }, [getData]);

  React.useEffect(() => {
    if (!loading && data)
      setCurrentEpisod(
        playerStore !== "" ? playerStore : data.media.episodes[0].url
      );
  }, [loading, data, playerStore]);

  if (!data || loading)
    return (
      <button className={style}>
        <LoadingDots />
      </button>
    );
  if (error) return <button className={style}>error :(</button>;

  const handleSetImageWidth = (value: string) => {
    if (value === "+") {
      switch (ifarmeSize.width) {
        case "1215px": {
          break;
        }
        case "810px": {
          setIfarmeSize({ width: "1215px", height: "810px" });
          break;
        }
        case "540px": {
          setIfarmeSize({ width: "810px", height: "540px" });
          break;
        }
        case "360px": {
          setIfarmeSize({ width: "540px", height: "360px" });
          break;
        }
        case "240px": {
          setIfarmeSize({ width: "360px", height: "240px" });
          break;
        }
      }
    } else {
      switch (ifarmeSize.width) {
        case "1215px": {
          setIfarmeSize({ width: "810px", height: "540px" });
          break;
        }
        case "810px": {
          setIfarmeSize({ width: "540px", height: "360px" });
          break;
        }
        case "540px": {
          setIfarmeSize({ width: "360px", height: "240px" });
          break;
        }
        case "360px": {
          setIfarmeSize({ width: "240px", height: "160px" });
          break;
        }
        case "240px": {
          break;
        }
      }
    }
  };

  return data ? (
    <div
      className={`absolute left-0 z-10 bg-black bg-opacity-90 w-full flex flex-col`}
    >
      <div className="flex justify-between py-4">
        <div className="flex text-white">
          <SizeButton
            text={`-`}
            description={`lower`}
            notAllowed={ifarmeSize.width === "240px"}
            action={() => {
              handleSetImageWidth("-");
            }}
          />
          <SizeButton
            text={`+`}
            description={`bigger`}
            notAllowed={ifarmeSize.width === "1215px"}
            action={() => {
              handleSetImageWidth("+");
            }}
          />
        </div>
        <MarksButton
          slug={slug}
          mediaType={mediaType}
          titleMedia={titleMedia}
          description={description}
        />
        <CloseButton target="player" action={closePlayer} />
      </div>
      <div className="flex flex-col self-center">
        <iframe
          className={`${loadingImage ? "animate-pulse" : ""}`}
          title="player"
          width={ifarmeSize.width}
          height={ifarmeSize.height}
          allowFullScreen={true}
          src={currentEpisod}
          onLoad={() => setLoadingImage(false)}
        >
          Sorry!
        </iframe>
        <div
          className={`${
            loadingImage ? "text-white animate-pulse" : "text-opacity-0"
          }`}
        >
          <LoadingDots />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex mb-4 flex-wrap p-2">
          {data.media.episodes.map((episod: any) => {
            return (
              episod.type === "dub" && (
                <div
                  key={Math.random().toString()}
                  className={`${
                    currentEpisod === episod.url ? "bg-gray-300" : "bg-gray-700"
                  } w-12 h-12 border border-black text-sm cursor-pointer transition ease-linear hover:bg-gray-300`}
                  onClick={() => {
                    setLoadingImage(true);
                    setCurrentEpisod(episod.url);
                    setPlayerStore(episod.url);
                  }}
                >
                  <p>{episod.episode}</p>
                  <p>{episod.type}</p>
                </div>
              )
            );
          })}
        </div>
        <div className="flex mb-4 flex-wrap p-2">
          {data.media.episodes.map((episod: any) => {
            return (
              episod.type === "sub" && (
                <div
                  key={Math.random().toString()}
                  className={`${
                    currentEpisod === episod.url ? "bg-gray-300" : "bg-gray-700"
                  } w-12 h-12 border border-black text-sm cursor-pointer transition ease-linear hover:bg-gray-300`}
                  onClick={() => {
                    setLoadingImage(true);
                    setCurrentEpisod(episod.url);
                    setPlayerStore(episod.url);
                  }}
                >
                  <p>{episod.episode}</p>
                  <p>{episod.type}</p>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  ) : null;
}
