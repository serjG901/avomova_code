import * as React from "react";
import { GET_UPDATES_LIST } from "../graphql/query";
import { useLazyQuery } from "@apollo/client";
import MenuUpdate from "../components/MenuUpdate";
import CardLastUpdate from "../components/CardLastUpdate";
import LoadingDots from "../common/LoadingDots";
import ShowMore from "../components/ShowMore";

interface ICardLastUpdate {
  url: string;
  type: string;
  title: {
    be: string;
    en: string;
  };
  description: { be: string };
  duraction: {
    start: number;
    end: number;
  };
  date: {
    created: Date;
    updated: Date;
  };
}

interface ILastUpdate {
  type?: string;
  history: any;
  search: string;
}

export default function LastUpdate({
  type = "all",
  history,
  search,
}: ILastUpdate) {
  const [docs, setDocs] = React.useState<ICardLastUpdate[]>([]);
  const [pagination, setPagination] = React.useState(0);
  const [limit, setLimit] = React.useState(0);

  const [getData, { loading, error, data }] = useLazyQuery(GET_UPDATES_LIST, {
    variables: {
      offset: 0,
      limit,
      type: "ALL",
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
      if (data.getUpdatesList.totalDocs > data.getUpdatesList.docs.length) {
        setLimit(data.getUpdatesList.totalDocs);
      } else {
        setDocs(
          data.getUpdatesList.docs
            .filter((item: ICardLastUpdate) =>
              type === "all" ? true : item.type === type.toUpperCase()
            )
            .filter((item: ICardLastUpdate) =>
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
  }, [data, type, search]);

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

  const handleType = (type?: string) => {
    if (type === "all") {
      history.push({ search: "" });
    } else {
      history.push({
        search: `?type=${type}`,
      });
    }
  };

  return docs.length ? (
    <div className="flex flex-col">
      <MenuUpdate option={type} showOption={handleType} />
      <div className="flex flex-wrap">
        {docs.map(
          (doc: ICardLastUpdate, index) =>
            index < pagination && (
              <CardLastUpdate
                key={doc.url + doc.date.updated}
                slug={doc.url}
                type={doc.type.toLowerCase()}
                duraction={doc.duraction}
                date={doc.date}
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
