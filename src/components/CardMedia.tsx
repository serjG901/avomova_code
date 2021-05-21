import * as React from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MEDIA } from "../graphql/query";
import LoadingCard from "../common/LoadingCard2";
import Card from "../card/Card";

interface ICard {
  mediaId: string | number;
  slug: string;
  mediaType: string;
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

export default function CardMedia({
  mediaId,
  slug,
  mediaType,
  history,
  search,
}: ICard) {
  const [cardData, setCardData] = React.useState(initialCardData);
  const [getData, { loading, error, data }] = useLazyQuery(GET_MEDIA, {
    variables: {
      slug,
      mediaType,
    },
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

  return (
    <Card
      slug={slug}
      titleMedia={cardData.data.media.title}
      mediaType={mediaType}
      description={cardData.data.media.description}
      history={history}
      search={search}
      poster={cardData.data.media.poster}
      translation={cardData.data.media.language}
      duraction={cardData.data.media.duraction}
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
