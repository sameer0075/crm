'use client';
import React, { ChangeEvent, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import Button from '../components/Button';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/auth-slice';
import { AppDispatch } from '@/redux/store';

interface FormData {
  email: string;
  password: string;
}

/**
 * The authentication component.
 *
 * This component renders the authentication form with email and password input fields,
 * and a button to submit the form. It also renders an image on the right side of the screen
 * on large screens.
 */
export default function Auth() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const dispatch = useDispatch<AppDispatch>();

  /**
   * Handles changes to the form data.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: value,
    }));

    const validationValue = value.length > 0 ? `` : `${name} is required`;
    setErrors((prevData: FormData) => ({
      ...prevData,
      [name]: validationValue,
    }));
  };

  const validateForm = () => {
    const newErrors: FormData = { email: '', password: '' };
    if (!formData.password) {
      newErrors.password = 'password is required';
    }

    if (!formData.email) {
      newErrors.email = 'email is required';
    }
    setErrors(newErrors);
    return newErrors.email === '' && newErrors.password === '';
  };

  /**
   * Handles the button click.
   */
  const handleClick = () => {
    const validation = validateForm();
    if (validation) {
      dispatch(login(formData));
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row max-h-[100vh]">
      <div className="flex mr-[20px] flex-col w-full p-16 space-y-8 bg-white md:w-1/2 md:p-16">
        <div className="mr-auto w-full max-w-sm lg:w-96 mt-[-40px]">
          <img
            src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/NovatoreLogo.jpg`}
            alt="Novatore Logo"
            className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
            style={{ marginBottom: '-20px' }}
          />
        </div>
        <div
          style={{ marginTop: '50px' }}
          className="flex flex-col justify-center h-full"
        >
          <h2 className="font-[600] text-[32px] text-[#262626] leading-tight outfit mb-16">
            Welcome to Novatore CRM
          </h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[#9794AA] text-[16px] font-roboto leading-[25px]"
              >
                Email Address*
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email address"
                onChange={(e) => handleChange(e)}
                value={formData.email}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2 relative">
              <label
                htmlFor="password"
                className="block text-[#9794AA] text-[16px] font-roboto leading-[25px]"
              >
                Password*
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none block w-full px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-12 lg:pr-[45px]"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={formData.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="text-[#6E6D76] text-[16px] font-roboto leading-[25px]"
              >
                Remember Me
              </label>
            </div>
            <Button
              handleClick={handleClick}
              text="Login"
              className="h-14 w-full  gap-4"
            />
          </form>
        </div>
      </div>
      <div className="image-box  md:w-1/2 ">
        <img
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login-screen-pic.png`}
          alt="Illustration"
          className="hidden md:block max-w-full h-[100vh] aspect-[500/500] object-cover rounded-tl-[40px] rounded-br-[0px] rounded-tr-[0px] rounded-bl-[40px]"
        />
      </div>
    </div>
  );
}
