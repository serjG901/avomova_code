interface ITitleCard {
  text: string;
  search: string;
}

const style = `
  break-word
  px-1
  text-xl
  text-indigo-900
  text-left
  leading-5
  `;

export default function Title({ text, search }: ITitleCard) {
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
