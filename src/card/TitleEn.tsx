interface ITitleCard {
  text: string;
  search: string;
}

const style = `
  break-word
  px-1
  text-sm 
  text-gray-800 
  text-left
  italic
  leading-5
  `;

export default function TitleEn({ text, search }: ITitleCard) {
  return (
    <div className={style}>
      {search !== ""
        ? text
            .replaceAll(search, `||${search}||`)
            .replaceAll(
              search[0].toUpperCase() + search.slice(1),
              `||${search[0].toUpperCase() + search.slice(1)}||`
            )
            .split("||")
            .map((item: string, index: number) =>
              item === search ||
              item === search[0].toUpperCase() + search.slice(1) ? (
                <span key={index} className="bg-indigo-400">
                  {item}
                </span>
              ) : (
                item
              )
            )
        : text}
    </div>
  );
}
