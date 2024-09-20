'use client';
import React from 'react';

interface CompanyInterface {
  company: string;
}

const Novatore = ({ company }: CompanyInterface) => {
  return (
    <div className="font-semibold rounded-lg bg-white p-4  bg-gradient-to-br from-white via-white to-transparent shadow-lg">
      <h1>{company}</h1>
    </div>
  );
};
export default Novatore;
