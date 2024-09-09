'use client';
import React, { ChangeEvent, useState } from 'react';
import Button from '../components/Button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Input from '../components/Input';

interface FormData {
  email: string;
  password: string;
}

export default function Auth() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mr-auto w-full max-w-sm lg:w-96">
          <img
            src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/NovatoreLogo.jpg`}
            alt="Novatore Logo"
            className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
          />
        </div>
        <div className="bg-white py-10 lg:py-0">
          <div className="">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome to Novatore CRM
            </h2>

            <div className="mt-8">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your email address"
                      onChange={(e) => handleChange(e)}
                      value={formData.email}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your password"
                      onChange={(e) => handleChange(e)}
                      value={formData.password}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember Me
                    </label>
                  </div>
                </div>

                <div>
                  <Button
                    handleClick={handleClick}
                    text="Login"
                    className="h-14 w-full lg:w-[505px] gap-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-white py-10 lg:py-0">
        <div className="mt-8">
          <img
            width={500}
            height={500}
            src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login-screen-pic.png`}
            alt="Novatore Logo"
            className="object-contain rounded-tl-[40px] rounded-br-[40px] rounded-tr-[0px] rounded-bl-[0px]"
          />
        </div>
      </div>
    </div>
  );
}
