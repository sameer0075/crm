import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSearchParams } from 'next/navigation';
import {
  CommentsInterface,
  addComment,
  handleDisablePhone,
  handleDisableEmail,
} from '@/redux/slices/commentSlice';
import { setNextRecord } from '@/redux/slices/lead-slice';
import { AppDispatch } from '@/redux/store';
import { toast } from 'react-toastify';
import TextArea from '../../TextArea';
import Select from '../../Select';
import Button from '../../Button';
import { StatusInterface } from '@/redux/slices/status-slice';

interface Interface {
  data: CommentsIterface[];
  appendLog: () => void;
}

const Lead = ({ data, appendLog }: Interface) => {
  const [startDate, setStartDate] = useState(null);
  const [comment, setComment] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [statusOptions, setStatusOptions] = useState<StatusInterface[]>([]);
  const [statusError, setStatusError] = useState<boolean>(false); // Error state for status
  const [customDateError, setCustomDateError] = useState<boolean>(false);
  const details = useSelector((state) => state.leads.details);
  const loading = useSelector((state) => state.comments.isLoading);
  const statuses = useSelector((state) => state.status.data);
  const dispatch = useDispatch<AppDispatch>();
  const params = useSearchParams();
  const id = params.get('id');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
    setStatusError(false);
  };

  const handleStatusDisability = (statusData) => {
    if (statusData) {
      if (statusData.name === 'Fresh') {
        dispatch(handleDisablePhone({ disable: true }));
        dispatch(handleDisableEmail({ disable: true }));
      } else if (statusData.name === 'Pre Research') {
        dispatch(handleDisablePhone({ disable: false }));
      } else {
        dispatch(handleDisablePhone({ disable: false }));
        dispatch(handleDisableEmail({ disable: false }));
      }
    }
  };
  const handleSubmit = async () => {
    if (!status) {
      setStatusError(true);
      toast.error('Status is required!');
      return;
    }

    const currentStatus = statuses.find((info) => info.id === status);

    if (currentStatus.name == 'Follow Up on Custom Date') {
      if (!startDate) {
        setCustomDateError(true);
        return;
      } else {
        setCustomDateError(false);
      }
    }

    const res = await dispatch(
      addComment({
        comment,
        recordId: id,
        status,
        customDate: startDate,
      })
    ).unwrap();
    if (res.success) {
      const statusData = statuses.find((info) => info.id === status);
      toast.info(res.message);
      setComment('');
      appendLog(res.log);
      if (res.nextRecordId) {
        dispatch(setNextRecord({ id: res.nextRecordId }));
      }
      handleStatusDisability(statusData);
    }
  };

  useEffect(() => {
    if (details) {
      let recordStatuses = [];
      if (details.type === 'LEAD' || details.type === 'FOLLOW_UP_LEAD') {
        recordStatuses = statuses.filter(
          (info) =>
            info.statusFor === 'LEAD' || info.statusFor === 'FOLLOW_UP_LEAD'
        );
      } else if (
        details.type === 'OPPORTUNITY' ||
        details.type === 'FOLLOW_UP_OPPORTUNITY'
      ) {
        recordStatuses = statuses.filter(
          (info) =>
            info.statusFor === 'OPPORTUNITY' ||
            info.statusFor === 'FOLLOW_UP_OPPORTUNITY'
        );
      }
      const currentStatus = statuses.find(
        (info) => info.id === details.recordStatusId
      );
      setStatus(currentStatus?.id);
      setStatusOptions(recordStatuses);
      handleStatusDisability(currentStatus);
    }
  }, [details, statuses]);

  const currentStatus = statuses.find((info) => info.id === status);

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
            <div className="flex items-center space-x-4">
              <Select
                options={statusOptions}
                className={statusError ? 'border-red-500' : ''}
                handleChange={handleStatus}
                value={status}
              />
              {currentStatus?.name == 'Follow Up on Custom Date' && (
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="date"
                    className="text-xs font-medium text-gray-600 mb-1"
                  >
                    Select Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setCustomDateError(false);
                      setStartDate(date);
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    minDate={new Date()}
                    className={`p-2 border border-gray-300 rounded-md h-[25px] w-[150px] ${customDateError ? 'border-red-500' : ''}`}
                  />
                </div>
              )}
            </div>
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
