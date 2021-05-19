import queryString from "query-string";
interface ILanguage {
  value: string[];
  mediaType: string;
  history: any;
}
const hoverStyle = `${
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? ""
    : "hover:text-indigo-900"
}`;

const style = `
  select-none
  filter 
  drop-shadow-lg
  absolute 
  top-1 
  -left-1 
  flex
  flex-col
  max-w-max
  text-white
  `;
const styleDub = `
  transition 
  ease-linear 
  bg-red-500 
  cursor-pointer 
  ${hoverStyle}
  `;
const styleSub = `
  transition 
  ease-linear 
  bg-blue-500 
  cursor-pointer 
  ${hoverStyle}
  `;
export default function Language({ value, mediaType, history }: ILanguage) {
  const handleSearchTag = (search: string | number) => {
    history.push({
      pathname: `/avomova/${mediaType}`,
      search: `?${queryString.stringify({
        ...queryString.parse(history.location.search),
        language: search,
      })}`,
    });
  };
  return (
    <div className={style}>
      {value.map((item) => {
        return (
          <div
            key={item}
            className={`px-1 ${item === "dub" ? styleDub : styleSub}`}
            onClick={() => handleSearchTag(item)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
