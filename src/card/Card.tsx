import * as React from "react";
import { useQuery } from "@apollo/client";
import { GET_MEDIA } from "../graphql/query";
import Language from "../tags/Language";
import MangaTag from "../tags/MangaTag";
import Status from "../tags/Status";
import LoadingCard from "../common/LoadingCard";
import Poster from "./Poster";
import Title from "./Title";
import TitleEn from "./TitleEn";
import Tags from "./Tags";
import Description from "./Description";
import Watch from "./Watch";

interface ICard {
  mediaId: string | number;
  slug: string;
  mediaType: string;
  history: any;
  search: string;
}

const style = `
relative 
flex 
w-full 
max-w-xs 
pl-2 
py-2
bg-purple-400
bg-opacity-20
bg-cover
`;

export default function Card({
  mediaId,
  slug,
  mediaType,
  history,
  search,
}: ICard) {
  const [cardData, setCardData] = React.useState({
    loading: true,
    error: undefined,
    data: {
      media: {
        language: [],
        poster: "",
        status: "",
        duraction: {
          start: 0,
          end: 0,
        },
        title: {
          be: "",
          ru: "",
          en: "",
          alt: "",
        },
        description: {
          be: "",
          ru: "",
          en: "",
        },
        country: "",
        year: [],
        studio: "",
        genres: [],
        translators: [],
        dubbers: [],
        editors: [],
      },
    },
  });
  const { loading, error, data } = useQuery(GET_MEDIA, {
    variables: {
      slug,
      mediaType,
    },
  });

  React.useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction && !loading && !error && data) {
      if (cardData.data !== data) {
        setCardData({ loading, error, data });
      }
    }
    return () => {
      cleanupFunction = true;
    };
  }, [cardData.data, loading, error, data]);

  if (cardData.loading) return <LoadingCard />;
  if (cardData.error) return <p>Error :(</p>;

  console.log(mediaType);

  return (
    <div className="flex flex-col m-4">
      <div
        className={style}
        style={{
          backgroundImage: `url(${`https://anibel.net/${cardData.data.media.poster}`})`,
        }}
      >
        {cardData.data.media.language.length ? (
          <Language
            value={cardData.data.media.language}
            mediaType={mediaType}
            history={history}
          />
        ) : null}
        {mediaType === "manga" && <MangaTag history={history} />}
        <Status
          value={cardData.data.media.status}
          duraction={cardData.data.media.duraction}
        />
        <div className="w-1/3 self-center">
          <Poster
            poster={cardData.data.media.poster}
            title={cardData.data.media.title}
            slug={slug}
          />
        </div>
        <div className="flex flex-col w-2/3 h-72 overflow-y-auto scroll-none">
          <div className="bg-white bg-opacity-90 flex flex-col">
            <Title title={cardData.data.media.title} search={search} />
            <TitleEn title={cardData.data.media.title} search={search} />
            <Description
              description={cardData.data.media.description}
              search={search}
            />
            <Tags
              mediaType={mediaType}
              country={cardData.data.media.country}
              year={cardData.data.media.year}
              studio={cardData.data.media.studio}
              genres={cardData.data.media.genres}
              translators={cardData.data.media.translators}
              dubbers={cardData.data.media.dubbers}
              editors={cardData.data.media.editors}
              history={history}
            />
          </div>
        </div>
      </div>
      <Watch
        type={mediaType}
        slug={slug}
        title={cardData.data.media.title}
        description={cardData.data.media.description}
      />
    </div>
  );
}
