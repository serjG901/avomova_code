import * as React from "react";
import Button from "../common/Button";

interface ISearch {
  search: string;
  handleSearch: (value: string) => void;
}

export default function Search({ search, handleSearch }: ISearch) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchChange = (event: React.FormEvent<HTMLInputElement>) => {
    handleSearch(event.currentTarget.value.trim());
  };
  const openCloseSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      handleSearch("");
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  };
  return (
    <div className="flex justify-end w-full max-w-xs self-end mr-1 my-1">
      <input
        ref={inputRef}
        className={`${
          searchOpen
            ? "flex-1 h-12 self-center px-2 text-xl appearance-none focus:outline-none focus:shadow-outline"
            : "w-0 appearance-none"
        }`}
        value={search}
        onChange={searchChange}
        maxLength={12}
        placeholder="title or description"
      />
      <div
        className="flex-1 flex-grow-0"
        title={searchOpen ? "close search" : "open search"}
      >
        <Button isActive={searchOpen} rounded={true} action={openCloseSearch}>
          &#x1F50E;&#xFE0E;
        </Button>
      </div>
    </div>
  );
}
