import * as React from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MEDIA } from "../graphql/query";
import LoadingCard from "../common/LoadingCard2";
import Card from "../card/Card";

interface ICardLastUpdate {
  slug: string;
  type: string;
  duraction: {
    start: number;
    end: number;
  };
  date: {
    created: Date;
    updated: Date;
  };
  history: any;
  search: string;
}

const initialCardData = {
  loading: true,
  error: undefined,
  data: {
    media: {
      title: {
        be: "",
        en: "",
      },
      description: {
        be: "",
      },
      poster: "",
      duraction: {
        start: 0,
        end: 0,
      },
      language: [],
      genres: [],
      year: 0,
      dubbers: [],
      translators: [],
      editors: [],
      studio: "",
      country: "",
    },
  },
};

export default function CardLastUpdate({
  slug,
  type,
  duraction,
  date,
  history,
  search,
}: ICardLastUpdate) {
  let mediaType = "anime";
  switch (type) {
    case "dub":
      mediaType = "anime";
      break;
    case "sub":
      mediaType = "anime";
      break;
    case "cinema":
      mediaType = "cinema";
      break;
    case "manga":
      mediaType = "manga";
      break;
    case "news":
      mediaType = "news";
      break;
  }
  const [cardData, setCardData] = React.useState(initialCardData);
  const [currentType, setCurrentType] = React.useState(mediaType);
  const [getData, { loading, error, data }] = useLazyQuery(GET_MEDIA, {
    variables: {
      slug,
      mediaType: currentType,
    },
    fetchPolicy: "cache-and-network",
  });

  React.useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction) getData();
    return () => {
      cleanupFunction = true;
    };
  }, [getData]);

  React.useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction) {
      if (error && currentType === "anime") setCurrentType("cinema");
    }
    return () => {
      cleanupFunction = true;
    };
  }, [error, currentType]);

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
  if (cardData.error) return <p>Error for {slug}</p>;

  return (
    <Card
      slug={slug}
      titleMedia={cardData.data.media.title}
      mediaType={currentType}
      description={cardData.data.media.description}
      history={history}
      search={search}
      poster={cardData.data.media.poster}
      translation={cardData.data.media.language}
      duraction={duraction}
      date={date}
      country={cardData.data.media.country}
      year={cardData.data.media.year}
      studio={cardData.data.media.studio}
      genres={cardData.data.media.genres}
      translators={cardData.data.media.translators}
      dubbers={cardData.data.media.dubbers}
      editors={cardData.data.media.editors}
    />
  );
}
