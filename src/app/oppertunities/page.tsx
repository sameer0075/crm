import React from 'react';
import Image from 'next/image';
import { FaEdit } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
const page = () => {
    return (
        <section className='bg-[#f1f1f1]'>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-12 gap-4">
                    {/* First Column */}
                    <div className="col-span-3 ">
                        <div className="font-semibold rounded-lg bg-white p-4">
                            <h1>Novatore Solutions</h1>
                        </div>
                        <div className='bg-white rounded-lg p-4'>
                            <h1 className='font-bold'>Contact Roles</h1>
                            <div className="flex py-[6px] justify-between">
                                <div className="  ">
                                    <h1 className='text-[10px]'>Name</h1>
                                    <p className='text-[12px]'>Alexa</p>
                                </div>
                                <div>
                                    <h1 className='text-[10px]'>Role</h1>
                                    <p className=' text-[12px]'>Senior VP</p>
                                </div>
                                <div>
                                    <h1 className='text-[10px]'>Phone</h1>
                                    <p className=' text-[12px]'>1 (800) 667-6389</p>
                                </div>


                            </div>
                            <div>
                                <h1 className='text-[10px]'>Email</h1>
                                <p className='text-[#3673D4] text-[12px]'>info@email.com</p>
                            </div>
                        </div>
                        <div className="w-fullh-[384px] flex-shrink-0 rounded-lg bg-gradient-to-br from-white via-transparent to-transparent shadow-lg">
                            <div className="p-4 h-full flex flex-col bg-white rounded-lg">
                                <h2 className="text-lg font-semibold text-[#3673D4]">Details</h2>
                                <div className="flex flex-col flex-grow mt-4">
                                    <div className="flex font-medium text-[#000] text-[12px] leading-[24px] border-b border-gray-200 pb-2">
                                        <div className="flex-1 pr-4">State</div>
                                        <div className="flex-1 pr-4">Value</div>
                                        <div className="flex-1">Actions</div>
                                    </div>
                                    <div className="flex border-b border-gray-200 py-[6px]">
                                        <div className="flex-1 pr-4 text-[#000] font-roboto text-[12px]">State</div>
                                        <div className="flex-1 pr-4 text-[#000] font-roboto text-[12px]">Value</div>
                                        <div className="flex-1 text-center text-[#000] font-roboto text-[12px]">
                                            <FaEdit />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Second Column  */}
                    <div className="col-span-6  p-4">
                        Column 2
                    </div>
                    {/* Third Colum  */}
                    <div className="col-span-3 ">
                        <div className="text-[16px] font-semibold rounded-lg bg-white p-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className='w-[45px] h-[45px] bg-[#EBF3FF] border-1 border-[#BDD2F2] rounded flex justify-center items-center'>
                                    <IoMdCall className='text-[#3673D4] text-[24px]' />
                                </div>

                                <h1 className="text-[14px] font-semibold ml-2">Call Now</h1>
                            </div>
                            <div className="flex items-center">
                                <div className='w-[45px] h-[45px] bg-[#EBF3FF] border-1 border-[#BDD2F2] rounded flex justify-center items-center'>

                                    <IoMail className='text-[#3673D4] text-[24px]' />
                                </div>
                                <h1 className="text-[14px] font-semibold ml-2">Email Now</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default page;