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
text-sm 
text-gray-800 
text-left
italic
leading-5
`;

export default function TitleEn({ titleMedia, search }: ITitleCard) {
  return (
    <div className={style}>
      {search !== ""
        ? titleMedia.en
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
        : titleMedia.en}
    </div>
  );
}
