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
import { getLogs, getPhoneLogs } from '@/redux/slices/logs-slice';
import { getComments } from '@/redux/slices/commentSlice';
import { AppDispatch } from '@/redux/store';

const Page = () => {
  const [details, setDetails] = useState(null);
  const [contactRoles, setContactRoles] = useState(null);
  const data = useSelector((state) => state.leads.details);
  const allLogs = useSelector((state) => state.logs.allLogs);
  const phoneLogs = useSelector((state) => state.logs.phoneLogs);
  const comments = useSelector((state) => state.comments.data);
  const dispatch = useDispatch<AppDispatch>();

  const params = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    if (id) {
      dispatch(leadDetails({ id }));
      dispatch(getComments({ id }));
      dispatch(getPhoneLogs({ id, type: 'call' }));
      dispatch(getLogs({ id, type: 'all' }));
      dispatch(getLogs({ id, type: 'comment' }));
    }
  }, []);

  useEffect(() => {
    if (data) {
      const detailsPayload = [
        { state: 'State', value: data.state ?? 'N/A' },
        { state: 'Name', value: data.fullName ?? 'N/A' },
        { state: 'Title', value: data.title ?? 'N/A' },
        { state: 'Email', value: data.email ?? 'N/A' },
        { state: 'Phone', value: data.phone ?? 'N/A' },
        { state: 'Mobile', value: data.mobile ?? data.phone },
        { state: 'Website', value: data.website ?? 'N/A' },
        { state: 'Company', value: data.company ?? 'N/A' },
        { state: 'Industry', value: data.industry ?? 'N/A' },
        {
          state: 'Company Linkedin',
          value: data.company_linkedin_url ?? 'N/A',
        },
        { state: 'Country', value: data.country ?? 'N/A' },
        { state: 'City', value: data.city ?? 'N/A' },
      ];
      setDetails(detailsPayload);
      setContactRoles({
        fullName: data.fullName,
        title: data.title,
        phone: data.phone,
        email: data.email,
      });
    }
  }, [data]);

  return (
    <section className="py-6 ">
      <div className="w-full px-4">
        <div className="grid grid-cols-12 gap-4">
          {/* First Column */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
            <Novatore />
            <ContactRoles data={contactRoles} />
            <DetailLogs data={details} />
          </div>
          {/* Second Column */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
            <Stepper data={comments} />
            <CallActivity data={allLogs} />
          </div>
          {/* Third Column */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
            <CallNow />
            <CalendarLogs data={phoneLogs} />
            <ActivityLog data={comments} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
