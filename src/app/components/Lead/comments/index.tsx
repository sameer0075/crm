import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { CommentsInterface, addComment } from '@/redux/slices/commentSlice';
import { AppDispatch } from '@/redux/store';
import { toast } from 'react-toastify';
import TextArea from '../../TextArea';
import Select from '../../Select';
import Button from '../../Button';
const Lead = ({ data }: CommentsInterface[]) => {
  const [comment, setComment] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const details = useSelector((state) => state.leads.details);
  const loading = useSelector((state) => state.comments.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const params = useSearchParams();
  const id = params.get('id');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  const handleStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };
  const handleSubmit = () => {
    if (!status) {
      toast.error('Status is required!');
      return;
    }
    dispatch(
      addComment({
        comment,
        recordId: id,
        status,
      })
    ).then(() => {
      setComment('');
    });
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
            {details?.title ?? 'N/A'}
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
          <div
            className={`col-span-5 sm:col-span-4 ${data?.length > 0 ? '' : 'text-[#E0E0E0]'} font-normal text-xs font-roboto`}
          >
            Email
          </div>
          <div
            className={`col-span-7 sm:col-span-6 ${data?.length > 0 ? '' : 'text-[#E0E0E0]'} font-normal text-xs font-roboto1`}
          >
            {details?.email ?? 'N/A'}
          </div>
        </div>
        <hr className="mt-2" />
        <div className="grid grid-cols-12 mt-1">
          <div
            className={`col-span-5 sm:col-span-4 ${data?.length > 0 ? '' : 'text-[#E0E0E0]'} font-normal text-xs font-roboto`}
          >
            Phone
          </div>
          <div
            className={`col-span-7 sm:col-span-6 ${data?.length > 0 ? '' : 'text-[#E0E0E0]'} font-normal text-xs font-roboto`}
          >
            {details?.phone ?? 'N/A'}
          </div>
        </div>
        <p className="text-[#3673D4] font-medium text-xs font-roboto pt-4">
          Guidance for Success
        </p>
        {data?.length === 0 && (
          <p className="text-[#111] pt-2 text-center font-medium text-xs font-roboto">
            No Data Found
          </p>
        )}
        <ul className="list-disc px-5 py-4">
          {data?.map((comment: CommentsInterface, index: number) => {
            return (
              <li
                key={index}
                className="text-[#111] font-normal text-xs font-roboto"
              >
                {comment.comment}
              </li>
            );
          })}
        </ul>
        <div>
          <div className="flex justify-between items-center mb-2 mt-3">
            <label
              htmlFor="email"
              className="text-[#111] font-medium text-xs font-roboto"
            >
              Comments
            </label>
            <Select
              options={[
                'Connected and Email Sent',
                `Didn't Connect`,
                'Follow Up',
                'Voicemail',
                'Referred to Another Person',
                'Out of Office',
                'Not the Right Person',
                'Receptionist',
              ]}
              handleChange={handleStatus}
            />
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
            className={`h-10 w-[86px] gap-4 bg-[#3673D4] ${comment === '' ? 'opacity-40' : ''}`}
            text="Save"
            type="button"
            loading={loading}
            disabled={comment === ''}
          />
        </div>
      </div>
    </div>
  );
};
export default Lead;
