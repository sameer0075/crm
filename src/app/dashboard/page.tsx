'use client';
import React from 'react';

const Dashboard = () => {
  const handleClick = () => {
    window.open('openphone://dial?number=8002752273');
  };
  return <div onClick={handleClick}>Dashboard Page</div>;
};

export default Dashboard;
