import * as React from "react";
import { GET_MEDIA_LIST } from "../graphql/query";
import { useLazyQuery } from "@apollo/client";
import Card from "../card/Card";
import ShowMore from "../components/ShowMore";
import LoadingDots from "../common/LoadingDots";

interface KeyString {
  [key: string]: any;
}

interface ICard extends KeyString {
  mediaId: string;
  slug: string;
  title: {
    be: string;
    en: string;
  };
  description: { be: string };
  mediaType: string;
  language?: string[];
  genres?: string[];
  studio?: string;
  year?: number;
  translators?: string[];
  dubbers?: string[];
  editors?: string[];
}

interface IFilters extends KeyString {
  language?: string;
  genres?: string;
  studio?: string;
  year?: number;
  status?: string;
  translators?: string;
  dubbers?: string;
  editors?: string;
  hidden?: boolean;
}

interface IShowCase {
  mediaType: string;
  filters?: IFilters;
  history: any;
  search: string;
}

export default function ShowCase({
  mediaType,
  filters = {},
  history,
  search,
}: IShowCase) {
  const [docs, setDocs] = React.useState<ICard[]>([]);
  const [pagination, setPagination] = React.useState(0);
  const [limit, setLimit] = React.useState(0);
  const [getData, { loading, error, data }] = useLazyQuery(GET_MEDIA_LIST, {
    variables: {
      offset: 0,
      limit,
      mediaType,
      filters: { hidden: false },
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
    if (!cleanupFunction && data) {
      if (data.getMediaList.totalDocs > data.getMediaList.docs.length) {
        setLimit(data.getMediaList.totalDocs);
      } else {
        setDocs(
          data.getMediaList.docs
            .filter((item: ICard) => {
              return Object.keys(filters).length === 0
                ? true
                : Object.keys(filters)
                    .map((key: string) => {
                      return key === "year"
                        ? item[`${key}`] === +filters[`${key}`]
                        : key === "studio"
                        ? item[`${key}`] === filters[`${key}`]
                        : item[`${key}`] &&
                          Array.isArray(item[`${key}`]) &&
                          item[`${key}`].includes(filters[`${key}`]);
                    })
                    .every((item: boolean) => item === true);
            })
            .filter((item: ICard) =>
              search === ""
                ? true
                : item.title.be.includes(search) ||
                  item.title.be.includes(
                    search[0].toUpperCase() + search.slice(1)
                  ) ||
                  item.title.en.includes(search) ||
                  item.title.en.includes(
                    search[0].toUpperCase() + search.slice(1)
                  ) ||
                  item.description.be.includes(search) ||
                  item.description.be.includes(
                    search[0].toUpperCase() + search.slice(1)
                  )
            )
        );
      }
    }
    return () => {
      cleanupFunction = true;
    };
  }, [data, filters, search]);

  React.useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction) {
      setPagination(docs.length < 10 ? docs.length : 10);
    }
    return () => {
      cleanupFunction = true;
    };
  }, [docs.length]);

  console.log(docs);

  if (error) return <p>Error :(</p>;

  if (loading)
    return (
      <div className="text-white m-4">
        <LoadingDots />
      </div>
    );

  const showMore = () => {
    if (data && pagination !== docs.length) {
      if (pagination + 10 < docs.length) {
        setPagination(pagination + 10);
      } else {
        setPagination(docs.length);
      }
    }
  };

  return docs.length ? (
    <div className="flex flex-col">
      <div className="flex flex-wrap">
        {docs.map(
          (doc: ICard, index) =>
            index < pagination && (
              <Card
                key={doc.slug}
                mediaId={doc.mediaId}
                slug={doc.slug}
                mediaType={doc.mediaType}
                history={history}
                search={search}
              />
            )
        )}
      </div>
      {data && pagination !== 0 && (
        <ShowMore
          pagination={pagination}
          length={docs.length}
          action={showMore}
        />
      )}
    </div>
  ) : (
    <div className="text-white m-4">NOT FOUND</div>
  );
}
