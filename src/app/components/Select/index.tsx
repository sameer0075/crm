import React from 'react';
import { StatusInterface } from '@/redux/slices/status-slice';

interface SelectOptions {
  options: string[] | StatusInterface[];
  handleChange: () => void;
  className?: string;
  value?: string;
}

const Select = ({ options, handleChange, className, value }: SelectOptions) => {
  return (
    <div>
      <select
        name="format"
        className={`border border-[#DFDFDF] rounded-lg bg-white px-3 py-1 text-left text-[#9D8F8F] text-sm font-normal ${className ?? ''}`}
        defaultValue={value ?? ''}
        onChange={handleChange}
        style={{ fontFamily: 'Roboto, sans-serif' }} // Custom font style
      >
        <option value="">Select Status</option>
        {options.map((option: string | StatusInterface, index: number) => {
          return typeof option === 'string' ? (
            <option key={index} value={option}>
              {option}
            </option>
          ) : (
            <option
              selected={option.id === value}
              key={index}
              value={option.id}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
