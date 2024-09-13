'use client';
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { UserCircle, Search } from 'lucide-react'; // Importing the Search icon
import Input from '../Input';
import Subheader from '../SubHeader';

export default function Header() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown menu if a click is detected outside of it
  const handleClickOutside = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header className="sticky top-0 z-50 w-[100vw] border-b border-border/40 bg-white">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 absolute left-[30px]">
            <a className="flex items-center space-x-2" href="/">
              <img
                src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/NovatoreLogo.jpg`}
                alt="Novatore Logo"
                className="h-[20px] sm:h-[25px]"
              />
            </a>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 absolute right-[50px]">
            <div className="relative hidden md:block w-[200px] sm:w-[306px]">
              <Input
                id="search"
                name="search"
                type="text"
                required={false}
                className="appearance-none block w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search"
                onChange={(e) => handleSearch(e)}
                value={search}
              />
              <Search className="text-[#3673D4] absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-[24px] w-[24px] opacity-80" />
            </div>
            <div className="relative inline-block">
              <div
                ref={buttonRef}
                onClick={handleClick}
                className="relative inline-block text-left"
              >
                <div id="dropdownDelayButton" className="cursor-pointer">
                  <UserCircle className="text-[#3673D4] opacity-80 h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                </div>

                {/* Dropdown menu */}
                {isOpen && (
                  <div
                    ref={dropdownRef}
                    id="dropdownDelay"
                    className="absolute right-0 top-[40px] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 group group-hover:block"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDelayButton"
                    >
                      <li className="cursor-pointer">
                        <a
                          onClick={handleLogout}
                          className="block px-4 cursor-pointer py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Subheader />
    </div>
  );
}
