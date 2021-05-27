import * as React from "react";

import Button from "../common/Button";

interface KeyString {
  [key: string]: any;
}

interface IFilters extends KeyString {
  language?: string[];
  genres?: string[];
  year?: number[];
  dubbers?: string[];
  translators?: string[];
  editors?: string[];
  studio?: string[];
}

interface IFilter extends KeyString {
  language?: string;
  genres?: string;
  year?: number;
  dubbers?: string;
  translators?: string;
  editors?: string;
  studio?: string;
}

export default function AvailableFilters({ filters }: IFilters) {
  const [activeFilter, setActiveFilter] = React.useState<IFilter>({});
  const [showFilter, setShowFilter] = React.useState("");

  const showTags = (value?: string) => {
    if (value) setShowFilter(value);
  };

  const showFilterTag = () => {};

  return (
    <div className="flex flex-wrap justify-end">
      {Object.keys(filters).map((item) => {
        return (
          <div>
            {showFilter ? (
              filters[`${item}`].map((itemTag: string | number) => {
                return (
                  <Button
                    text={itemTag.toString()}
                    isActive={false}
                    action={showFilterTag}
                    payload={itemTag.toString()}
                  />
                );
              })
            ) : (
              <Button
                text={item}
                isActive={Object.keys(activeFilter).includes(item)}
                action={showTags}
                payload={item}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
