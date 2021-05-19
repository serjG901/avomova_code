import Tag from "../tags/Tag";

interface ITags {
  mediaType: string;
  country: string | string[];
  year: string | string[];
  studio: string | string[];
  genres: string | string[];
  translators: string | string[];
  dubbers: string | string[];
  editors: string | string[];
  history: any;
}

const style = `
flex 
flex-wrap 
leading-5 
mb-2
mt-2
`;

export default function Tags({
  mediaType,
  country,
  year,
  studio,
  genres,
  translators,
  dubbers,
  editors,
  history
}: ITags) {
  return (
    <div className={style}>
      {country ? (
        <div className="flex flex-col mx-1">
          <div className="text-sm text-gray-700 text-left">Country:</div>
          <Tag notSearch tag="country" value={country} mediaType={mediaType} history={history}/>
        </div>
      ) : null}
      {year ? (
        <div className="flex flex-col mx-1">
          <div className="text-sm text-gray-700 text-left">Year:</div>
          <Tag tag="year" value={year} mediaType={mediaType} history={history} />
        </div>
      ) : null}
      {studio ? (
        <div className="flex flex-col mx-1">
          <div className="text-sm text-gray-700 text-left">Studio:</div>
          <Tag tag="studio" value={studio} mediaType={mediaType} history={history} />
        </div>
      ) : null}
      {genres.length !== 0 ? (
        <div className="flex flex-col mx-1">
          <div className="text-sm text-gray-700 text-left">Genres:</div>
          <Tag tag="genres" value={genres} mediaType={mediaType} history={history} />
        </div>
      ) : null}
      {translators.length !== 0 ? (
        <div className="flex flex-col mx-1">
          <div className="text-sm text-gray-700 text-left">Translators:</div>
          <Tag tag="translators" value={translators} mediaType={mediaType} history={history} />
        </div>
      ) : null}

      {dubbers.length !== 0 ? (
        <div className="flex flex-col mx-1">
          <div className="text-sm text-gray-700 text-left">Dubbers:</div>
          <Tag tag="dubbers" value={dubbers} mediaType={mediaType} history={history} />
        </div>
      ) : null}
      {editors.length !== 0 ? (
        <div className="flex flex-col mx-1">
          <div className="text-sm text-gray-700 text-left">Editors:</div>
          <Tag tag="editors" value={editors} mediaType={mediaType} history={history} />
        </div>
      ) : null}
    </div>
  );
}
