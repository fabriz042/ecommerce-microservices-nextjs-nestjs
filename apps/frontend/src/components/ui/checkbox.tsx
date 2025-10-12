import { useState } from "react";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange?: () => void;
};

export default function CustomCheckbox({
  label,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none p-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden peer"
      />
      <div
        className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all duration-300 
          ${
            checked
              ? "bg-blue-500 border-blue-500 scale-110 text-white"
              : "border-gray-400"
          }`}
      >
        {checked && "✓"}
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  );
}
