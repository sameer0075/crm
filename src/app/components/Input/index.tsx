// components/Input.tsx
'use client';
import React from 'react';

/**
 * Input component props
 */
interface InputProps {
  name: string;
  required: boolean;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  value?: string;
}

/**
 * Button component
 * @param {ButtonProps} props
 * @returns {React.ReactElement}
 */
const Input: React.FC<InputProps> = ({
  id = '',
  name,
  required,
  type,
  placeholder,
  value = '',
  onChange,
  onBlur,
  className = '',
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      className={`h-[56px] appearance-none block lg:w-[505px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur ? onBlur : undefined}
      value={value}
    />
  );
};

export default Input;
