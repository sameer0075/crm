'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import Stepper from '../components/Lead/stepper';
import CallActivity from '../components/Lead/activity';
import ActivityLog from '../components/Lead/activitylog';
import CalendarLogs from '../components/Lead/calendarlogs';
import ContactRoles from '../components/Lead/contactroles';
import Novatore from '../components/Lead/novatore';
import DetailLogs from '../components/Lead/details';
import CallNow from '../components/Lead/callnow';
import { leadDetails } from '@/redux/slices/lead-slice';

const Page = () => {
  const [details, setDetails] = useState(null);
  const data = useSelector((state) => state.leads.details);
  const dispatch = useDispatch<AppDispatch>();

  const params = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    dispatch(leadDetails({ id }));
  }, []);

  useEffect(() => {
    if (data) {
      console.log('details', details);
      setDetails(data);
    }
  }, [data]);

  return (
    <section className="py-6 ">
      <div className="w-full px-4">
        <div className="grid grid-cols-12 gap-4">
          {/* First Column */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
            <Novatore />
            <ContactRoles />
            <DetailLogs />
          </div>
          {/* Second Column */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
            <Stepper />
            <CallActivity />
          </div>
          {/* Third Column */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
            <CallNow />
            <CalendarLogs />
            <ActivityLog />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
