import FilterTag from "../tags/FilterTag";

interface IFilters {
  history: any;
}

export default function Filters({ history }: IFilters) {
  return history.location.search ? (
    <div className="fixed right-1 top-1/2 flex-col text-indigo-900 z-10 bg-white bg-opacity-90 p-1">
      <div>Filters:</div>
      {history.location.search
        .slice(1)
        .split("&")
        .map((item: string) => {
          return (
            item && (
              <FilterTag
                key={item}
                tag={item.split("=")[0]}
                value={item.split("=")[1]}
                history={history}
              />
            )
          );
        })}
    </div>
  ) : null;
}
