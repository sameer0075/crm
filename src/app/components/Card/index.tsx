import React, { ReactNode } from 'react';

interface CardInterface {
  title: string;
  type: string;
  value: number | string;
  icon: ReactNode;
}

const Card = ({ data }: CardInterface) => {
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-gray-100">{data.icon}</div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-700">
              {data.title}
            </h3>
            <p className="text-gray-500">{data.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
