import React from 'react';

interface SelectOptions {
  options: string;
  handleChange: () => void;
}

const Select = ({ options, handleChange }: SelectOptions) => {
  return (
    <div>
      <select
        name="format"
        className="border border-[#DFDFDF] rounded-lg bg-white px-3 py-1 text-left text-[#9D8F8F] text-sm font-normal"
        defaultValue="Sort By"
        onChange={handleChange}
        style={{ fontFamily: 'Roboto, sans-serif' }} // Custom font style
      >
        <option value="">Select Status</option>
        {options.map((option: string, index: number) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
