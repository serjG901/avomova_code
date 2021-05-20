interface ITitle {
  be: string;
  en: string;
}

interface IPoster {
  poster: string;
  titleMedia: ITitle;
  slug: string;
}

export default function Poster({ poster, titleMedia, slug }: IPoster) {
  return (
    <img
      className=""
      src={`https://anibel.net/${poster}`}
      alt={`${titleMedia.en}, ${titleMedia.be}, ${slug}`}
    />
  );
}
