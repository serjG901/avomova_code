import queryString from "query-string";
interface ITag {
  tag: string;
  value?: string | string[] | number;
  mediaType: string;
  notSearch?: boolean;
  history: any;
}

const hoverStyle = `${
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? ""
    : "hover:bg-indigo-400"
}`;

const style = `
  select-none
  transition 
  ease-linear
  cursor-pointer
  bg-indigo-900
  max-w-max
  text-white
  px-1
  mb-1
  ml-1
  ${hoverStyle}
  `;
const styleNot = `
  max-w-max
  text-indigo-900
  px-1
  mb-1
  ml-1
  `;
export default function Tag({
  tag,
  value,
  mediaType,
  notSearch,
  history,
}: ITag) {
  const handleSearchTag = (search: string | number) => {
    history.push({
      pathname: `/avomova/${mediaType}`,
      search: `?${queryString.stringify({
        ...queryString.parse(history.location.search),
        [`${tag}`]: search,
      })}`,
    });
  };
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap">
        {value.map((item) => {
          return (
            <div
              key={Math.random().toString()}
              className={style}
              title={`search for ${item}`}
              onClick={() => handleSearchTag(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        className={notSearch ? styleNot : style}
        title={notSearch ? "" : `search for ${value}`}
        onClick={() => {
          if (!notSearch && value) handleSearchTag(value);
        }}
      >
        {value}
      </div>
    );
  }
}
