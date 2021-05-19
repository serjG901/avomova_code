import * as React from "react";
import "./App.css";

import history from "history/browser";
import queryString from "query-string";

import ProjectName from "./components/ProjectName";
import Menu from "./components/Menu";
import Search from "./components/Search";
import Filters from "./components/Filters";
import LastUpdate from "./showCases/LastUpdate";
import ShowCase from "./showCases/ShowCase";
import Marks from "./showCases/Marks";
import ToTop from "./components/ToTop";
import Background from "./common/Background";

const root = "/avomova";

export default function App() {
  const [mediaType, setMediaType] = React.useState<string>(
    history.location.pathname === `${root}/`
      ? "all"
      : history.location.pathname.split("/")[2]
  );

  const [type, setType] = React.useState(
    queryString.parse(history.location.search).type
      ? queryString.parse(history.location.search).type?.toString()
      : "all"
  );

  const [filters, setFilters] = React.useState(
    history.location.search === ""
      ? {}
      : queryString.parse(history.location.search)
  );

  const [search, setSearch] = React.useState("");

  const [topY, setTopY] = React.useState(window.screenTop);

  React.useEffect(() => {
    const unlisten = history.listen(({ location }) => {
      setMediaType(
        history.location.pathname === `${root}/`
          ? "all"
          : history.location.pathname.split("/")[2]
      );

      setType(
        queryString.parse(history.location.search).type
          ? queryString.parse(history.location.search).type?.toString()
          : "all"
      );

      setFilters(
        location.search === "" ? {} : queryString.parse(location.search)
      );
    });
    return () => unlisten();
  });

  React.useEffect(() => {
    let cleanupFunction = false;
    const listener = () => {
      setTopY(document.documentElement.getBoundingClientRect().top);
    };
    if (!cleanupFunction) {
      window.addEventListener("scroll", listener);
    }
    return () => {
      cleanupFunction = true;
      window.removeEventListener("scroll", listener);
    };
  }, []);

  const showType = (showedType?: string) => {
    if (showedType === "all") {
      history.push({ pathname: `${root}/`, search: "" });
    } else {
      history.push({ pathname: `${root}/${showedType}`, search: "" });
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="App flex flex-col">
      <ProjectName />
      <Menu option={mediaType} showOption={showType} />
      <Search search={search} handleSearch={handleSearch} />
      <Filters history={history} />
      <div>
        {mediaType === "all" ? (
          <LastUpdate
            type={type}
            history={history}
            search={search.length > 1 ? search : ""}
          />
        ) : mediaType === "marks" ? (
          <Marks history={history} search={search.length > 1 ? search : ""} />
        ) : (
          <ShowCase
            mediaType={mediaType}
            filters={filters}
            history={history}
            search={search.length > 1 ? search : ""}
          />
        )}
      </div>
      <ToTop topY={topY} />
      <Background />
    </div>
  );
}
