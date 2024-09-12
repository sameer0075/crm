import React, { ChangeEvent, useState } from 'react';
import TextArea from '../TextArea';

const Lead = () => {
  const [comment, setComment] = useState<string>('');
  /**
   * Handles changes to the form data.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e', e);
    setComment(e.target.value);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="sm:w-[500px] md:w-[600px] p-6 lg:w-[670px]  flex-shrink-0 rounded-[8px] bg-gradient-to-tr from-white via-transparent to-transparent shadow-[0px_0px_18px_rgba(218,222,232,0.5)]">
        <h2 className="text-[#111] font-medium text-base font-outfit">
          Status: Leads
        </h2>
        <p className="text-[#3673D4] font-medium text-xs font-roboto pt-4">
          Key Fields
        </p>

        <p className="text-[#3673D4] font-medium text-xs font-roboto pt-4">
          Guidance for Success
        </p>
        <p className="text-[#111] font-medium text-xs font-roboto pt-4">
          Qualify promising leads.
        </p>
        <ul className="list-disc px-5 py-4">
          <li className="text-[#111] font-normal text-xs font-roboto ">
            Identify a contact for the lead to be converted to be opportunity.
          </li>
          <li className="text-[#111] font-normal text-xs font-roboto pt-3">
            Please add the product information to be shared with the client so
            that the phone number and email can be activated.
          </li>
        </ul>
        <div>
          <label
            htmlFor="email"
            className="text-[#111] font-medium text-xs font-roboto mb-3"
          >
            Comments
          </label>
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
      </div>
    </div>
  );
};

export default Lead;
