'use client';
import React from 'react';

const Dashboard = () => {
  const handleClick = () => {
    window.open('openphone://dial?number=4107934326');
  };
  return <div onClick={handleClick}>Dashboard Page</div>;
};

export default Dashboard;
