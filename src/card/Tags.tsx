import Tag from "../tags/Tag";

interface ITags {
  mediaType: string;
  history: any;
  country?: string | string[];
  year?: number;
  studio?: string | string[];
  genres?: string | string[];
  translators?: string | string[];
  dubbers?: string | string[];
  editors?: string | string[];
}

const style = `
  flex 
  flex-wrap 
  leading-5 
  mb-2
  mt-2
  `;

const styleTags = `
  flex 
  flex-col
  mx-1
  `;

const styleTagHeader = `
  text-sm 
  text-gray-700 
  text-left
  `;

export default function Tags({
  mediaType,
  history,
  country,
  year,
  studio,
  genres,
  translators,
  dubbers,
  editors,
}: ITags) {
  return (
    <div className={style}>
      {genres?.length !== 0 ? (
        <div className={styleTags}>
          <div className={styleTagHeader}>Genres:</div>
          <Tag
            tag="genres"
            value={genres}
            mediaType={mediaType}
            history={history}
          />
        </div>
      ) : null}

      {year ? (
        <div className={styleTags}>
          <div className={styleTagHeader}>Year:</div>
          <Tag
            tag="year"
            value={year}
            mediaType={mediaType}
            history={history}
          />
        </div>
      ) : null}

      {dubbers?.length !== 0 ? (
        <div className={styleTags}>
          <div className={styleTagHeader}>Dubbers:</div>
          <Tag
            tag="dubbers"
            value={dubbers}
            mediaType={mediaType}
            history={history}
          />
        </div>
      ) : null}

      {translators?.length !== 0 ? (
        <div className={styleTags}>
          <div className={styleTagHeader}>Translators:</div>
          <Tag
            tag="translators"
            value={translators}
            mediaType={mediaType}
            history={history}
          />
        </div>
      ) : null}

      {editors?.length !== 0 ? (
        <div className={styleTags}>
          <div className={styleTagHeader}>Editors:</div>
          <Tag
            tag="editors"
            value={editors}
            mediaType={mediaType}
            history={history}
          />
        </div>
      ) : null}

      {studio ? (
        <div className={styleTags}>
          <div className={styleTagHeader}>Studio:</div>
          <Tag
            tag="studio"
            value={studio}
            mediaType={mediaType}
            history={history}
          />
        </div>
      ) : null}

      {country ? (
        <div className={styleTags}>
          <div className={styleTagHeader}>Country:</div>
          <Tag
            notSearch
            tag="country"
            value={country}
            mediaType={mediaType}
            history={history}
          />
        </div>
      ) : null}
    </div>
  );
}
