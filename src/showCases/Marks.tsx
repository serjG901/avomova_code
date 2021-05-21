import * as React from "react";
import CardMedia from "../components/CardMedia";
import { useLocalStorage } from "../useLocalStorage";

interface IMark {
  slug: string;
  mediaType: string;
  title: {
    be: string;
    en: string;
  };
  description: {
    be: string;
  };
}

interface IMarks {
  history: any;
  search: string;
}

export default function Marks({ history, search }: IMarks) {
  const [marksStore] = useLocalStorage("marks", []);

  const [markDocs, setMarkDocs] = React.useState([]);

  React.useEffect(() => {
    setMarkDocs(
      marksStore.filter((item: IMark) =>
        search === ""
          ? true
          : item.title.be.includes(search) ||
            item.title.be.includes(search[0].toUpperCase() + search.slice(1)) ||
            item.title.en.includes(search) ||
            item.title.en.includes(search[0].toUpperCase() + search.slice(1)) ||
            item.description.be.includes(search) ||
            item.description.be.includes(
              search[0].toUpperCase() + search.slice(1)
            )
      )
    );
  }, [search, marksStore]);

  return markDocs.length ? (
    <div className="flex flex-wrap">
      {markDocs.map((mark: IMark, index: number) => (
        <CardMedia
          key={mark.slug}
          mediaId={index}
          slug={mark.slug}
          mediaType={mark.mediaType}
          history={history}
          search={search}
        />
      ))}
    </div>
  ) : (
    <div className="text-white m-4">NOT FOUND</div>
  );
}
