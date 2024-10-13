import React from "react";

export const StringList = ({
  items,
  styles,
}: {
  items: [string];
  styles?: string | undefined;
}) => {
  return (
    <ul className="flex flex-wrap w-full gap-1">
      {items.map((tool, index) => (
        <li
          key={index}
          className={`${styles} after:content-['_/'] last:after:content-[''] leading-[1.2]`}
        >
          {tool}
        </li>
      ))}
    </ul>
  );
};
