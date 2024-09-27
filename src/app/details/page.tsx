'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';

import Stepper from '../components/Lead/stepper';
import CallActivity from '../components/Lead/activity';
import ActivityLog from '../components/Lead/activitylog';
import CalendarLogs from '../components/Lead/calendarlogs';
import ContactRoles from '../components/Lead/contactroles';
import Loader from '../components/loader';
import Novatore from '../components/Lead/novatore';
import DetailLogs from '../components/Lead/details';
import CallNow from '../components/Lead/callnow';
import { leadDetails, setNextRecord } from '@/redux/slices/lead-slice';
import { getLogs, clearLogs } from '@/redux/slices/logs-slice';
import { getComments } from '@/redux/slices/commentSlice';
import { AppDispatch } from '@/redux/store';
import { getStatuses } from '@/redux/slices/status-slice';
import Modal from '../components/Modal';

const Details = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneLogsData, setPhoneLogsData] = useState([]);
  const [logsData, setLogsData] = useState([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [contactRoles, setContactRoles] = useState(null);
  const data = useSelector((state) => state.leads.details);
  const allLogs = useSelector((state) => state.logs.allLogs);
  const comments = useSelector((state) => state.comments.data);
  const nextRecordId = useSelector((state) => state.leads.nextRecordId);
  const dispatch = useDispatch<AppDispatch>();
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get('id');

  const navigateToNextRecord = () => {
    if (nextRecordId) {
      dispatch(clearLogs());
      dispatch(setNextRecord({ id: '' }));
      setLogsData([]);
      setPhoneLogsData([]);
      router.push(`/details?id=${nextRecordId}`);
    }
  };

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      Promise.all([
        dispatch(leadDetails({ id })).unwrap(),
        dispatch(getComments({ id })).unwrap(),
        dispatch(getLogs({ id, type: 'all' })).unwrap(),
        dispatch(getStatuses({ id })).unwrap(),
      ])
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          // Handle errors if needed
          setLoading(false); // Also hide the loader in case of an error
        });
    }
  }, [id]);

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

  useEffect(() => {
    if (allLogs?.length > 0) {
      setLogsData(allLogs);
      const phonelogs = allLogs.filter((log) => log.type === 'call');
      setPhoneLogsData(phonelogs);
    }
  }, [allLogs]);

  useEffect(() => {
    return () => {
      setLoading(false);
      setPhoneLogsData([]);
      setContactRoles(null);
      setDetails(null);
      setLogsData([]);
      dispatch(clearLogs());
    };
  }, []);

  useEffect(() => {
    if (nextRecordId) {
      setModalOpen(true);
    }
  }, [nextRecordId]);

  const appendLog = (log) => {
    setLogsData((prev) => [log, ...prev]); // Implicitly return a new array
  };

  return (
    <section className="py-6 ">
      {loading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <div className="w-full px-4">
        <div className="grid grid-cols-12 gap-4">
          {/* First Column */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
            <Novatore company={data?.company ?? 'N/A'} />
            <ContactRoles data={contactRoles} />
            <DetailLogs data={details} />
          </div>
          {/* Second Column */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
            <Stepper data={comments} appendLog={appendLog} type={data?.type} />
            <CallActivity data={logsData} />
          </div>
          {/* Third Column */}
          <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
            <CallNow phone={data?.phone} email={data?.email} />
            <CalendarLogs data={phoneLogsData} />
            <ActivityLog data={comments} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={handleModal}
        title="Go to next lead"
        handleSubmit={navigateToNextRecord}
      />
    </section>
  );
};

const Page = () => {
  return (
    <Suspense>
      <Details />
    </Suspense>
  );
};

export default Page;
