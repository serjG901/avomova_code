import queryString from "query-string";
interface ITag {
  tag: string;
  value: string | number;
  history: any;
}
const style = `
    select-none
    cursor-pointer
    bg-indigo-900
    max-w-max
    text-white
    px-1
    mb-1
    ml-1
    hover:bg-indigo-400
    `;

export default function FilterTag({ tag, value, history }: ITag) {
  const handleDeleteSearchTag = () => {
    if (history.location.search.slice(1).split("&").length > 1) {
      history.push({
        search: `?${queryString.stringify({
          ...queryString.parse(history.location.search),
          [`${tag}`]: undefined,
        })}`,
      });
    } else {
      history.push({
        search: ``,
      });
    }
  };

  return (
    <div
      key={Math.random().toString()}
      className={style}
      title={`delete ${value} from search`}
      onClick={() => handleDeleteSearchTag()}
    >
      {decodeURI(value.toString())}
    </div>
  );
}
