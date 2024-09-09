// components/Button.tsx
'use client';
import React from 'react';

/**
 * Button component props
 */
interface ButtonProps {
  /**
   * Click handler for button
   */
  handleClick: () => void;
  /**
   * Text to display on button
   */
  text: string;
  /**
   * Type of button (default: "button")
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Color of button (default: "primary")
   */
  color?: 'primary' | 'secondary';
  /**
   * Additional class name for button
   */
  className?: string;
}

/**
 * Button component
 * @param {ButtonProps} props
 * @returns {React.ReactElement}
 */
const Button: React.FC<ButtonProps> = ({
  handleClick,
  text,
  type = 'button',
  color = 'primary',
  className = '',
}) => {
  const baseStyles =
    'px-4 py-2 rounded-lg text-white font-semibold transition duration-300';
  const colorStyles =
    color === 'primary'
      ? 'bg-[#3673D4] hover:bg-blue-600 focus:ring-2 focus:ring-blue-300'
      : 'bg-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-gray-300';

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${className} ${baseStyles} ${colorStyles}`}
    >
      {text}
    </button>
  );
};

export default Button;
