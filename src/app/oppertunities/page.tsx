'use client';
import React from 'react';
import Stepper from '../components/Lead/stepper';
import CallActivity from '../components/Lead/activity';
import ActivityLog from '../components/Lead/activitylog';
import CalendarLogs from '../components/Lead/calendarlogs';
import ContactRoles from '../components/Lead/contactroles';
import Novatore from '../components/Lead/novatore';
import DetailLogs from '../components/Lead/details';
import CallNow from '../components/Lead/callnow';

const Page = () => {
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
