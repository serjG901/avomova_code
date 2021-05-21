interface IDescription {
  description: {
    be: string;
  };
  search: string;
}

const style = `
  break-word
  p-1
  text-base 
  text-black
  text-left 
  leading-5
  `;

export default function Description({ description, search }: IDescription) {
  return (
    <div className={style}>
      {search !== ""
        ? description.be
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
        : description.be}
    </div>
  );
}
