'use client';
import React from 'react';

interface ContactRolesInterface {
  fullName: string;
  title: string;
  phone: string;
  email: string;
}

const ContactRoles = ({ data }: ContactRolesInterface) => {
  return (
    <div className="bg-white rounded-lg p-4 bg-gradient-to-br from-white via-white to-transparent shadow-lg">
      <h1 className="font-bold">Contact Roles</h1>
      <div className="py-[6px] justify-between grid grid-cols-4">
        <div className="">
          <h1 className="text-[10px]">Name</h1>
          <p className="text-[12px] break-words">{data?.fullName}</p>
        </div>
        <div className="">
          <h1 className="text-[10px]">Role</h1>
          <p className=" text-[12px] break-words">{data?.title}</p>
        </div>
        <div className="">
          <h1 className="text-[10px]">Phone</h1>
          <p className=" text-[12px] break-words">{data?.phone} </p>
        </div>
      </div>
      <div>
        <h1 className="text-[10px]">Email</h1>
        <p className="text-[#3673D4] text-[12px] break-words">{data?.email}</p>
      </div>
    </div>
  );
};
export default ContactRoles;
