interface ITitle {
  be: string;
  ru: string;
  en: string;
  alt: string;
}

interface IPoster {
  poster: string;
  title: ITitle;
  slug: string;
}

export default function Poster({ poster, title, slug }: IPoster) {
  return (
    <img
      className=""
      src={`https://anibel.net/${poster}`}
      alt={`${title.en}, ${title.be}, ${slug}`}
    />
  );
}
