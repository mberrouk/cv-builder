import React from 'react';
import { ChromePicker } from 'react-color';

const ColorPicker = ({ color, onChange, label }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className="w-full h-10 rounded-md border border-gray-300 cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute z-10 mt-2">
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <ChromePicker
            color={color}
            onChange={(color) => onChange(color.hex)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;