const hoverStyle = `${
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? ""
    : "hover:text-indigo-900"
}`;

const style = `
  select-none
  transition 
  ease-linear 
  filter 
  drop-shadow-lg
  absolute 
  top-1 
  -left-1 
  flex
  flex-col
  max-w-max
  text-white
  cursor-pointer
  ${hoverStyle}
  `;
interface IMangaTag {
  history: any;
}
export default function MangaTag({ history }: IMangaTag) {
  const handleSearchTag = (search: string | number) => {
    history.push({
      pathname: `/avomova/${search}`,
      search: ``,
    });
  };
  return (
    <div className={style} onClick={() => handleSearchTag("manga")}>
      <div className={`px-1 bg-purple-500`}>manga</div>
    </div>
  );
}
