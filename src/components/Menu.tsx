import Button from "../common/Button";

interface IMenu {
  option: string;
  showOption: (value?: string) => void;
}

export default function Menu({ option, showOption }: IMenu) {
  return (
    <div className="flex flex-wrap justify-end">
      <Button
        text="update"
        isActive={option === "all"}
        action={showOption}
        payload="all"
      />
      <Button
        text="anime"
        isActive={option === "anime"}
        action={showOption}
        payload="anime"
      />
      <Button
        text="manga"
        isActive={option === "manga"}
        action={showOption}
        payload="manga"
      />
      <Button
        text="cinema"
        isActive={option === "cinema"}
        action={showOption}
        payload="cinema"
      />
      <Button
        text="marks"
        isActive={option === "marks"}
        action={showOption}
        payload="marks"
      />
    </div>
  );
}
