import Button from "../common/Button";

interface IMenu {
  option: string;
  showOption: (value?: string) => void;
}

export default function Menu({ option, showOption }: IMenu) {
  return (
    <div className="flex flex-wrap">
      <Button
        text="all"
        isActive={option === "all"}
        action={showOption}
        payload="all"
      />
      <Button
        text="dub"
        isActive={option === "dub"}
        action={showOption}
        payload="dub"
      />
      <Button
        text="sub"
        isActive={option === "sub"}
        action={showOption}
        payload="sub"
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
    </div>
  );
}
