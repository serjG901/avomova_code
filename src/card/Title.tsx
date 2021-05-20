interface ITitle {
  be: string;
  en: string;
}

interface ITitleCard {
  titleMedia: ITitle;
  search: string;
}

const style = `
  px-1
  text-xl
  text-indigo-900
  text-left
  leading-5
  `;

export default function Title({ titleMedia, search }: ITitleCard) {
  return (
    <div className={style}>
      {search !== ""
        ? titleMedia.be
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
        : titleMedia.be}
    </div>
  );
}
