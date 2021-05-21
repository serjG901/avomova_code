import Language from "../tags/Language";
import MangaTag from "../tags/MangaTag";
import Status from "../tags/Status";
import Poster from "../card/Poster";
import Title from "../card/Title";
import TitleEn from "../card/TitleEn";
import Tags from "../card/Tags";
import Description from "../card/Description";
import Watch from "../card/Watch";

interface ICardMedia {
  slug: string;
  titleMedia: {
    be: string;
    en: string;
  };
  mediaType: string;
  description: {
    be: string;
  };
  history: any;
  search: string;
  poster: string;
  translation: string[];
  duraction: {
    start: number;
    end: number;
  };
  date?: {
    created: Date;
    updated: Date;
  };
  country: string;
  year: number;
  studio: string;
  genres: string[];
  translators: string[];
  dubbers: string[];
  editors: string[];
}

const styleMain = `
    flex 
    flex-col 
    m-4
    `;

const styleBody = `
    relative 
    flex 
    w-full 
    max-w-xs 
    pl-2 
    py-2
    bg-purple-400
    bg-opacity-20
    bg-cover
`;

const styleBodyPoster = `
    w-1/3 
    self-center
    `;

const styleBodyDescription = `
    w-2/3 
    h-72 
    flex
    `;

const styleDescription = `
    self-center 
    bg-white 
    bg-opacity-90 
    flex 
    flex-col 
    max-h-52 
    overflow-y-auto 
    scroll-none
    `;

export default function Card({
  slug,
  titleMedia,
  mediaType,
  description,
  history,
  search,
  poster,
  translation,
  duraction,
  date,
  country,
  year,
  studio,
  genres,
  translators,
  dubbers,
  editors,
}: ICardMedia) {
  return (
    <div className={styleMain}>
      <div
        className={styleBody}
        style={{
          backgroundImage: `url(${`https://anibel.net/${poster}`})`,
        }}
      >
        {translation.length ? (
          <Language
            value={translation}
            mediaType={mediaType}
            history={history}
          />
        ) : null}
        {mediaType === "manga" && <MangaTag history={history} />}
        <Status duraction={duraction} date={date} />
        <div className={styleBodyPoster}>
          <Poster poster={poster} titleMedia={titleMedia} slug={slug} />
        </div>
        <div className={styleBodyDescription}>
          <div className={styleDescription}>
            <Title text={titleMedia.be} search={search} />
            <TitleEn text={titleMedia.en} search={search} />
            <Description description={description} search={search} />
            <Tags
              mediaType={mediaType}
              country={country}
              year={year}
              studio={studio}
              genres={genres}
              translators={translators}
              dubbers={dubbers}
              editors={editors}
              history={history}
            />
          </div>
        </div>
      </div>
      <Watch
        type={mediaType}
        slug={slug}
        titleMedia={titleMedia}
        description={description}
      />
    </div>
  );
}
