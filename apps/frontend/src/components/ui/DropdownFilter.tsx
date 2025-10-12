"use client";
import { useState, useRef, useEffect } from "react";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type DropdownProps = {
  label: string;
  items: { name: string }[];
  selected: string;
  onSelect: (value: string) => void;
};

export default function Dropdown({
  label,
  items,
  selected,
  onSelect,
}: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDropdownOpen && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight + "px");
    } else {
      setMaxHeight("0px");
    }
  }, [isDropdownOpen, items]);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="border-b-2 border-gray-500 pb-2 mb-2">
      <div
        onClick={handleDropdown}
        className="font-bold flex items-center gap-1 cursor-pointer select-none"
      >
        <div>{label}</div>
        <div>{isDropdownOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</div>
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
        }}
        className="ml-4"
      >
        <ul>
          {items.map((item) => (
            <li
              key={item.name}
              className={`cursor-pointer hover:bg-gray-100 select-none p-1 transition-all duration-200 ${
                selected === item.name ? "font-bold pl-5 text-textLink" : ""
              }`}
              onClick={() => onSelect(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
