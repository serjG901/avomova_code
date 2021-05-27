import * as React from "react";
import Button from "../common/Button";

interface ISearch {
  search: string;
  handleSearch: (value: string) => void;
}

const style = `
  flex 
  relative
  justify-end 
  w-full 
  self-end 
  mr-1 
  my-1
  `;

const styleInput = `
  transition-width
  filter 
  drop-shadow-lg
  h-10 
  rounded-full
  px-4 
  m-2
  text-xl 
  appearance-none 
  focus:outline-none 
  focus:shadow-outline
`;

const styleSearchOpen = `
  pl-4 
  pr-10
  w-56
  `;
const styleSearchClose = `
  w-10
  `;

const styleButton = `
  absolute 
  `;

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
    <div className={style}>
      <input
        ref={inputRef}
        className={`${styleInput} ${
          searchOpen ? styleSearchOpen : styleSearchClose
        }`}
        value={search}
        onChange={searchChange}
        maxLength={12}
        placeholder="title or description"
      />
      <div
        className={styleButton}
        title={searchOpen ? "close search" : "open search"}
      >
        <Button isActive={searchOpen} rounded={true} action={openCloseSearch}>
          &#x1F50E;&#xFE0E;
        </Button>
      </div>
    </div>
  );
}
