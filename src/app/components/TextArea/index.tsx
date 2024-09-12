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
  onKeyPress?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Button component
 * @param {ButtonProps} props
 * @returns {React.ReactElement}
 */
const TextArea: React.FC<InputProps> = ({
  id = '',
  name,
  required,
  type,
  placeholder,
  value = '',
  onChange,
  onBlur,
  className = '',
  onKeyPress,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      type={type}
      required={required}
      className={`appearance-none block lg:w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur ? onBlur : undefined}
      value={value}
      onKeyPress={onKeyPress}
      rows={5}
    />
  );
};

export default TextArea;
