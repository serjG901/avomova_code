import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_MEDIA_EPISODES } from "../graphql/query";
import LoadingDots from "../common/LoadingDots";
import { useLocalStorage } from "../useLocalStorage";

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
  const [marksStore, setMarksStore] = useLocalStorage("marks", []);

  const [topPosition, setTopPosition] = React.useState("top-0px");
  const [ifarmeSize, setIfarmeSize] = React.useState({
    width: "360px",
    height: "240px",
  });

  const [currentEpisod, setCurrentEpisod] = React.useState("");
  console.log(slug, mediaType);

  const [loadingImage, setLoadingImage] = React.useState(true);

  const { loading, error, data } = useQuery(GET_MEDIA_EPISODES, {
    variables: {
      slug,
      mediaType,
    },
    fetchPolicy: "cache-and-network",
  });
  React.useEffect(() => {
    setTopPosition(`top-${window.screenTop}px`);
  }, []);

  React.useEffect(() => {
    if (!loading && data)
      setCurrentEpisod(
        playerStore !== "" ? playerStore : data.media.episodes[0].url
      );
  }, [loading, data, playerStore]);

  if (loading)
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

  const handleMarks = (value: {
    slug: string;
    mediaType: string;
    title: {
      be: string;
      en: string;
    };
    description: {
      be: string;
    };
  }) => {
    if (marksStore.find((item: { slug: string }) => item.slug === value.slug)) {
      setMarksStore(
        marksStore.filter((item: { slug: string }) => item.slug !== value.slug)
      );
    } else {
      setMarksStore([...marksStore, value]);
    }
  };

  return (
    <div
      className={`${topPosition} absolute left-0 z-10 bg-black bg-opacity-90 w-full flex flex-col`}
    >
      <div className="flex justify-between">
        <div className="flex self-center text-white">
          <div
            className={`${
              ifarmeSize.width === "240px"
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-600 hover:text-black"
            } px-4 mx-2 text-2xl rounded text-gray-600 border border-gray-600`}
            onClick={() => {
              handleSetImageWidth("-");
            }}
          >
            -
          </div>
          <div
            className={`${
              ifarmeSize.width === "1215px"
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-600 hover:text-black"
            } px-4 mx-2 text-2xl rounded text-gray-600 border border-gray-600`}
            onClick={() => {
              handleSetImageWidth("+");
            }}
          >
            +
          </div>
        </div>
        <div
          onClick={() => {
            handleMarks({ slug, mediaType, title: titleMedia, description });
          }}
          className="text-indigo-900 font-bold p-2 m-2 self-end cursor-pointer rounded border border-indigo-900 hover:bg-indigo-900 hover:text-black"
        >
          {marksStore.find((item: { slug: string }) => item.slug === slug)
            ? "delete from marks"
            : "add to marks"}
        </div>
        <div
          title="close reader"
          className="text-red-900 font-bold p-2 m-2 self-end cursor-pointer rounded border border-red-900 hover:bg-red-900 hover:text-black"
          onClick={closePlayer}
        >
          close
        </div>
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
  );
}
