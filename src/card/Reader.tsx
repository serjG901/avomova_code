import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_MEDIA_CHAPTERS } from "../graphql/query";
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
  const [readerStore, setReaderStore] = useLocalStorage(slug, {
    chapter: 0,
    page: 0,
    image: "",
  });
  const [marksStore, setMarksStore] = useLocalStorage("marks", []);

  const [topPosition, setTopPosition] = React.useState("top-0px");

  const [currentImage, setCurrentImage] = React.useState("");

  const [loadingImage, setLoadingImage] = React.useState(true);

  const [pageNumber, setPageNumber] = React.useState(0);
  const [chapterNumber, setChapterNumber] = React.useState(1);

  const [imageWidth, setImageWidth] = React.useState("w-3/4");

  const ReaderRef = React.useRef<HTMLDivElement>(null);

  const { loading, error, data } = useQuery(GET_MEDIA_CHAPTERS, {
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
    if (!loading && data) {
      if (readerStore && readerStore.image !== "") {
        setCurrentImage(readerStore.image);
        setChapterNumber(readerStore.chapter);
        setPageNumber(readerStore.page);
      } else {
        setCurrentImage(
          data.media.chapters.find((chapter: any) => chapter.chapter === 1)
            .images[0].large
        );
      }
    }
  }, [loading, data, readerStore]);

  if (loading)
    return (
      <button className={style}>
        <LoadingDots />
      </button>
    );
  if (error) return <button className={style}>error :(</button>;

  const nextPage = () => {
    if (
      data.media.chapters.find((chapter: any) => {
        return chapter.chapter === chapterNumber;
      }).images[pageNumber + 1] !== undefined
    ) {
      setLoadingImage(true);
      setPageNumber(pageNumber + 1);
      setCurrentImage(
        data.media.chapters.find((chapter: any) => {
          return chapter.chapter === chapterNumber;
        }).images[pageNumber + 1].large
      );
      setReaderStore({
        chapter: chapterNumber,
        page: pageNumber + 1,
        image: data.media.chapters.find((chapter: any) => {
          return chapter.chapter === chapterNumber;
        }).images[pageNumber + 1].large,
      });
    } else if (
      data.media.chapters.find((chapter: any) => {
        return chapter.chapter === chapterNumber + 1;
      }) !== undefined
    ) {
      setLoadingImage(true);
      setChapterNumber(chapterNumber + 1);
      setPageNumber(0);
      setCurrentImage(
        data.media.chapters.find((chapter: any) => {
          return chapter.chapter === chapterNumber + 1;
        }).images[0].large
      );
      setReaderStore({
        chapter: chapterNumber + 1,
        page: 0,
        image: data.media.chapters.find((chapter: any) => {
          return chapter.chapter === chapterNumber + 1;
        }).images[0].large,
      });
    } else {
      setLoadingImage(true);
      setChapterNumber(1);
      setPageNumber(0);
      setCurrentImage(
        data.media.chapters.find((chapter: any) => {
          return chapter.chapter === 1;
        }).images[0].large
      );
      setReaderStore({
        chapter: 1,
        page: 0,
        image: data.media.chapters.find((chapter: any) => {
          return chapter.chapter === 1;
        }).images[0].large,
      });
    }
  };

  const prevPage = () => {
    if (pageNumber !== 0) {
      setLoadingImage(true);
      setPageNumber(pageNumber - 1);
      setCurrentImage(
        data.media.chapters.find((chapter: any) => {
          return chapter.chapter === chapterNumber;
        }).images[pageNumber - 1].large
      );
      setReaderStore({
        chapter: chapterNumber,
        page: pageNumber - 1,
        image: data.media.chapters.find((chapter: any) => {
          return chapter.chapter === chapterNumber;
        }).images[pageNumber - 1].large,
      });
    } else if (pageNumber === 0 && chapterNumber !== 1) {
      setLoadingImage(true);
      setChapterNumber(chapterNumber - 1);
      setPageNumber(
        data.media.chapters.find((chapter: any) => {
          return chapter.chapter === chapterNumber - 1;
        }).images.length - 1
      );
      setCurrentImage(
        data.media.chapters.find((chapter: any) => {
          return chapter.chapter === chapterNumber - 1;
        }).images[
          data.media.chapters.find((chapter: any) => {
            return chapter.chapter === chapterNumber - 1;
          }).images.length - 1
        ].large
      );
      setReaderStore({
        chapter: chapterNumber - 1,
        page:
          data.media.chapters.find((chapter: any) => {
            return chapter.chapter === chapterNumber - 1;
          }).images.length - 1,
        image: data.media.chapters.find((chapter: any) => {
          return chapter.chapter === chapterNumber - 1;
        }).images[
          data.media.chapters.find((chapter: any) => {
            return chapter.chapter === chapterNumber - 1;
          }).images.length - 1
        ].large,
      });
    } else {
      return null;
    }
  };

  const handleSetImageWidth = (value: string) => {
    if (value === "+") {
      switch (imageWidth) {
        case "w-3/4": {
          break;
        }
        case "w-2/4": {
          setImageWidth("w-3/4");
          break;
        }
        case "w-1/4": {
          setImageWidth("w-2/4");
          break;
        }
      }
    } else {
      switch (imageWidth) {
        case "w-3/4": {
          setImageWidth("w-2/4");
          break;
        }
        case "w-2/4": {
          setImageWidth("w-1/4");
          break;
        }
        case "w-1/4": {
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
      ref={ReaderRef}
      className={`${topPosition} absolute left-0 z-10 bg-black bg-opacity-90 w-full flex flex-col`}
    >
      <div className="flex justify-between">
        <div className="flex self-center text-white">
          <div
            className={`${
              imageWidth === "w-1/4"
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
              imageWidth === "w-3/4"
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
        <div className={`text-white ${loadingImage ? "animate-pulse" : ""}`}>
          {loadingImage ? (
            <LoadingDots />
          ) : (
            `chapter ${chapterNumber}: page ${pageNumber}`
          )}
        </div>
        <div className="flex justify-center">
          <div
            title="previous page"
            className="px-2 flex justify-center items-center cursor-pointer w-1/6 text-white bg-gray-800 hover:bg-gray-600"
            onClick={() => {
              if (!loadingImage) {
                prevPage();
                ReaderRef.current?.scrollIntoView();
              }
            }}
          >
            <div>prev</div>
          </div>
          <img
            className={`${imageWidth} ${loadingImage ? "animate-pulse" : ""}`}
            alt={slug}
            src={currentImage || "logo512.png"}
            onLoad={() => setLoadingImage(false)}
          />
          <div
            title="next page"
            className="px-2 flex justify-center items-center cursor-pointer w-1/6 text-white bg-gray-800 hover:bg-gray-600"
            onClick={() => {
              if (!loadingImage) {
                nextPage();
                ReaderRef.current?.scrollIntoView();
              }
            }}
          >
            <div>next</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {data.media.chapters.map((chapter: any) => {
          return (
            <div
              key={Math.random().toString()}
              className="flex mb-4 flex-wrap p-2"
            >
              <div className="flex flex-col">
                <div className="text-white text-left">
                  chapter {chapter.chapter}
                </div>
                <div className="flex flex-wrap">
                  {chapter.images.map(
                    (
                      image: { large: string; thumbnail: string },
                      index: number
                    ) => {
                      return (
                        <div
                          key={Math.random().toString()}
                          className={`${
                            currentImage === image.large
                              ? "bg-gray-300"
                              : "bg-gray-900"
                          } w-24 h-40 overflow-y-scroll scroll-none p-2 border border-black text-sm cursor-pointer transition ease-linear hover:bg-gray-300`}
                          onClick={() => {
                            setLoadingImage(true);
                            setChapterNumber(chapter.chapter);
                            setPageNumber(index);
                            setCurrentImage(image.large);
                            setReaderStore({
                              chapter: chapter.chapter,
                              page: index,
                              image: image.large,
                            });
                            ReaderRef.current?.scrollIntoView();
                          }}
                        >
                          <img
                            alt="tittle"
                            src={image.thumbnail}
                            loading="lazy"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
