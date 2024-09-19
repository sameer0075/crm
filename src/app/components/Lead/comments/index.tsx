import React, { ChangeEvent, useState } from 'react';
import TextArea from '../../TextArea';
import Select from '../../Select';
import Button from '../../Button';

const Lead = () => {
  const [comment, setComment] = useState<string>('');
  /**
   * Handles changes to the form data.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const handleSubmit = () => {
    window.open('openphone://dial?number=8002752273');
  };
  return (
    <div className="w-full flex justify-center px-4 sm:px-0">
      <div className="w-full sm:w-[500px] md:w-[600px] p-4 sm:p-6 lg:w-[670px] flex-shrink-0 ">
        <h2 className="text-[#111] font-medium text-base font-outfit">
          Status: Leads
        </h2>
        <p className="text-[#3673D4] font-medium text-xs font-roboto pt-5">
          Key Fields
        </p>
        <div className="grid grid-cols-12 mt-5">
          <div className="col-span-5 sm:col-span-4 text-[#111] font-normal text-xs font-roboto">
            Title
          </div>
          <div className="col-span-5 sm:col-span-6 text-[#111] font-normal text-xs font-roboto">
            International Sales Director
          </div>
          <div className="col-span-2 flex justify-end items-center">
            <img
              src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/edit.svg`}
              alt="Novatore Logo"
            />
          </div>
        </div>
        <hr className="mt-2" />
        <div className="grid grid-cols-12 mt-1">
          <div className="col-span-5 sm:col-span-4 text-[#E0E0E0] font-normal text-xs font-roboto">
            Email
          </div>
          <div className="col-span-7 sm:col-span-6 text-[#E0E0E0] font-normal text-xs font-roboto">
            info@email.com
          </div>
        </div>
        <hr className="mt-2" />
        <div className="grid grid-cols-12 mt-1">
          <div className="col-span-5 sm:col-span-4 text-[#E0E0E0] font-normal text-xs font-roboto">
            Phone
          </div>
          <div className="col-span-7 sm:col-span-6 text-[#E0E0E0] font-normal text-xs font-roboto">
            1 (800) 667-6389
          </div>
        </div>
        <p className="text-[#3673D4] font-medium text-xs font-roboto pt-4">
          Guidance for Success
        </p>
        <p className="text-[#111] font-medium text-xs font-roboto pt-4">
          Qualify promising leads.
        </p>
        <ul className="list-disc px-5 py-4">
          <li className="text-[#111] font-normal text-xs font-roboto">
            Identify a contact for the lead to be converted to be opportunity.
          </li>
          <li className="text-[#111] font-normal text-xs font-roboto pt-3">
            Please add the product information to be shared with the client so
            that the phone number and email can be activated.
          </li>
        </ul>
        <div>
          <div className="flex justify-between items-center mb-2 mt-3">
            <label
              htmlFor="email"
              className="text-[#111] font-medium text-xs font-roboto"
            >
              Comments
            </label>
            <Select />
          </div>

          <TextArea
            id="comment"
            name="comment"
            type="text"
            placeholder=""
            required
            onChange={(e) => handleChange(e)}
            value={comment}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button
            handleClick={handleSubmit}
            className="h-10 w-[86px] gap-4 bg-[#3673D4]"
            text="Save"
            type="button"
            loading={false}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Lead;
