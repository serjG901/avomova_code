import { useLocalStorage } from "../useLocalStorage";

const hoverStyle = `${
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? ""
    : "hover:bg-indigo-900 hover:text-black"
}`;

interface IMarksButton {
  slug: string;
  mediaType: string;
  titleMedia: {
    be: string;
    en: string;
  };
  description: {
    be: string;
  };
}

const style = `
    text-indigo-900 
    font-bold 
    p-2 
    m-2 
    cursor-pointer 
    rounded 
    border 
    border-indigo-900 
    ${hoverStyle}
`;

export default function MarksButton({
  slug,
  mediaType,
  titleMedia,
  description,
}: IMarksButton) {
  const [marksStore, setMarksStore] = useLocalStorage("marks", []);

  const handleMarks = (value: {
    slug: string;
    mediaType: string;
    title: {
      be: string;
      en: string;
    };
    description: {
      be: string;
    };
  }) => {
    if (marksStore.find((item: { slug: string }) => item.slug === value.slug)) {
      setMarksStore(
        marksStore.filter((item: { slug: string }) => item.slug !== value.slug)
      );
    } else {
      setMarksStore([...marksStore, value]);
    }
  };

  return (
    <div
      onClick={() => {
        handleMarks({ slug, mediaType, title: titleMedia, description });
      }}
      className={style}
    >
      {marksStore.find((item: { slug: string }) => item.slug === slug)
        ? "delete from marks"
        : "add to marks"}
    </div>
  );
}
