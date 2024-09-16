import { ReactNode } from 'react';

interface LogInterface {
  title: string;
  date: string;
  time: string;
  action?: ReactNode;
}

const LogLabels = [
  { label: 'title', header: 'Activity', sortable: true },
  { label: 'date', header: 'Date', sortable: true },
  { label: 'time', header: 'Time', sortable: true },
  { label: 'action', header: 'Action', sortable: false },
];

const logData: LogInterface[] = [
  {
    title: 'Looking For A Mobile Application',
    date: '08/08/2024',
    time: '08:30 PM',
    action: (
      <div className="flex">
        <img
          className="cursor-pointer"
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/edit.png`}
          alt="edit"
        />
        <img
          className="cursor-pointer ml-2"
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/delete.png`}
          alt="delete"
        />
      </div>
    ),
  },
  {
    title: 'Discussing New Features',
    date: '09/08/2024',
    time: '09:15 AM',
    action: (
      <div className="flex">
        <img
          className="cursor-pointer"
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/edit.png`}
          alt="edit"
        />
        <img
          className="cursor-pointer ml-2"
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/delete.png`}
          alt="delete"
        />
      </div>
    ),
  },
  {
    title: 'Client Meeting - Project Update',
    date: '10/08/2024',
    time: '10:00 AM',
    action: (
      <div className="flex">
        <img
          className="cursor-pointer"
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/edit.png`}
          alt="edit"
        />
        <img
          className="cursor-pointer ml-2"
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/delete.png`}
          alt="delete"
        />
      </div>
    ),
  },
  {
    title: 'Feedback on Wireframes',
    date: '12/08/2024',
    time: '03:45 PM',
    action: (
      <div className="flex">
        <img
          className="cursor-pointer"
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/edit.png`}
          alt="edit"
        />
        <img
          className="cursor-pointer ml-2"
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/delete.png`}
          alt="delete"
        />
      </div>
    ),
  },
  {
    title: 'Finalizing Design Elements',
    date: '14/08/2024',
    time: '05:20 PM',
    action: (
      <div className="flex">
        <img
          className="cursor-pointer"
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/edit.png`}
          alt="edit"
        />
        <img
          className="cursor-pointer ml-2"
          src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/icons/delete.png`}
          alt="delete"
        />
      </div>
    ),
  },
];

export { LogLabels, logData };
