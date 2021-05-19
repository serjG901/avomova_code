interface IStatus {
  value: string;
  duraction: {
    start: number;
    end: number;
  };
  date?: {
    created: Date;
    updated: Date;
  };
}
const style = `
  filter
  drop-shadow-lg
  absolute 
  bottom-1 
  -left-1 
  flex
  flex-col
  max-w-max
  text-white
  `;
export default function Status({ value, duraction, date }: IStatus) {
  return (
    <div className={style}>
      <div
        className={`px-1 ${
          value === "finished" ? "bg-green-500" : "bg-yellow-500"
        }`}
      >
        <div>
          {value} ({duraction.start} / {duraction.end})
        </div>
        {date ? (
          <div className="text-sm text-black">
            {new Date(date.updated).toLocaleDateString()}
          </div>
        ) : null}
      </div>
    </div>
  );
}
