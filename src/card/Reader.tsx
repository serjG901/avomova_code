import * as React from "react";

import { useLazyQuery } from "@apollo/client";
import { GET_MEDIA_CHAPTERS } from "../graphql/query";

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
  const [readerStore, setReaderStore] = useLocalStorage(slug, {
    chapter: 0,
    page: 0,
    image: "",
  });

  const [currentImage, setCurrentImage] = React.useState("");

  const [loadingImage, setLoadingImage] = React.useState(true);

  const [pageNumber, setPageNumber] = React.useState(0);
  const [chapterNumber, setChapterNumber] = React.useState(1);

  const [imageWidth, setImageWidth] = React.useState("w-3/4");

  const ReaderRef = React.useRef<HTMLDivElement>(null);

  const [getData, { loading, error, data }] = useLazyQuery(GET_MEDIA_CHAPTERS, {
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
    if (currentImage === "" && readerStore?.image !== "") {
      setCurrentImage(readerStore.image);
      setChapterNumber(readerStore.chapter);
      setPageNumber(readerStore.page);
    }
  }, [readerStore, currentImage]);

  React.useEffect(() => {
    if (!loading && data) {
      if (currentImage === "" && !readerStore?.image)
        setCurrentImage(
          data.media.chapters.find((chapter: any) => chapter.chapter === 1)
            .images[0].large
        );
    }
  }, [loading, data, readerStore, currentImage]);

  if (!data || loading)
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

  return data ? (
    <div
      ref={ReaderRef}
      className={`absolute left-0 z-10 bg-black bg-opacity-90 w-full flex flex-col`}
    >
      <div className="flex justify-between py-4">
        <div className="flex">
          <SizeButton
            text={`-`}
            description={`lower`}
            notAllowed={imageWidth === "w-1/4"}
            action={() => {
              handleSetImageWidth("-");
            }}
          />
          <SizeButton
            text={`+`}
            description={`bigger`}
            notAllowed={imageWidth === "w-3/4"}
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
        <CloseButton target="reader" action={closePlayer} />
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
            <div key={chapter.chapter} className="flex mb-4 flex-wrap p-2">
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
                          key={index}
                          className={`
                            flex
                            flex-col
                            w-24 
                            pb-4
                            border 
                            border-black 
                            text-sm 
                            cursor-pointer 
                            transition 
                            ease-linear 
                            hover:bg-gray-500 
                            ${
                              currentImage === image.large
                                ? "bg-gray-500 text-black"
                                : "bg-gray-900 text-white"
                            }`}
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
                          <span>Page {index}</span>
                          {chapterNumber === chapter.chapter && (
                            <img
                              className="self-center"
                              alt={`Page ${index}`}
                              src={image.thumbnail}
                              loading="lazy"
                            />
                          )}
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
  ) : null;
}
