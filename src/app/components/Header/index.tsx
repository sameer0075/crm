'use client';
import { useState, ChangeEvent } from 'react';
import { UserCircle, Search } from 'lucide-react'; // Importing the Search icon
import Input from '../Input';
import Subheader from '../SubHeader';

export default function Header() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <header className="sticky top-0 z-50 w-[100vw] border-b border-border/40 bg-white">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <a className="flex items-center space-x-2" href="/">
              <img
                src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/NovatoreLogo.jpg`}
                alt="Novatore Logo"
                className="h-[20px] sm:h-[25px]"
              />
            </a>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
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
            <UserCircle className="text-[#3673D4] opacity-80 h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
          </div>
        </div>
      </header>
      <Subheader />
    </div>
  );
}
