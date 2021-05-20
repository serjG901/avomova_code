interface IStatus {
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
  opacity-90
  `;

const styleFinished = `bg-green-500`;

const styleOngoing = `bg-yellow-500`;

export default function Status({ duraction, date }: IStatus) {
  const status = duraction.start === duraction.end ? "finished" : "ongoing";
  return (
    <div className={style}>
      <div
        className={`px-1 ${
          status === "finished" ? styleFinished : styleOngoing
        }`}
      >
        <div>
          {status} ({duraction.start} / {duraction.end})
        </div>
        {date ? (
          <div className="text-sm text-gray-900">
            {new Date(date.updated).toLocaleDateString()}
          </div>
        ) : null}
      </div>
    </div>
  );
}
