import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { th } from 'react-day-picker/locale';

function CreateLeaseStep2(props) {
  const { setCurrentStep, leaseInfo, setLeaseInfo, currentRoom } = props;
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setLeaseInfo((prv) => ({ ...prv, startDate: new Date(startDate).toISOString().split('T')[0] }));
  }, [startDate]);

  const hdlChange = (e) => {
    setLeaseInfo((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const calculateEndDate = (startDate, duration) => {
    if (!startDate || !duration) {
      return;
    }
    const startDate_dayJS = dayjs(startDate);
    const endDate_dayJS = startDate_dayJS.add(duration, 'month');
    setLeaseInfo((prv) => ({ ...prv, endDate: endDate_dayJS.$d.toISOString().split('T')[0] }));
    dayjs.extend(isBetween);
    // console.log(dayjs().isBetween(startDate_dayJS, endDate_dayJS, null, '[]'));
    if (dayjs().isBetween(startDate_dayJS, endDate_dayJS, null, '[]')) {
      setLeaseInfo((prv) => ({ ...prv, status: 'ACTIVE' }));
    } else {
      setLeaseInfo((prv) => ({ ...prv, status: 'INACTIVE' }));
    }
  };

  useEffect(() => {
    calculateEndDate(leaseInfo?.startDate, leaseInfo?.duration);
  }, [leaseInfo?.startDate, leaseInfo?.duration]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <DayPicker locale={th} mode="single" onSelect={setStartDate} selected={startDate} />
        <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto">
          {/* Room Id */}
          <label className="input w-full">
            <input type="input" className="grow" placeholder="Room Number" value={currentRoom.id} required disabled />
          </label>
          {/* Start Date */}
          <label className="input w-full">
            <input
              type="input"
              className="grow"
              placeholder="Start Date"
              required
              disabled
              value={leaseInfo?.startDate}
            />
          </label>
          {/* Select Lease Duration */}
          <select className="select" name="duration" onChange={hdlChange} value={leaseInfo?.duration}>
            <option disabled={true}>Sort By:</option>
            <option value="">Select a duration</option>
            <option value={1}>1 Month</option>
            <option value={3}>3 Months</option>
            <option value={6}>6 Months</option>
          </select>
          {/* Enddate */}
          <label className="input w-full">
            <input
              type="input"
              className="grow"
              placeholder="Room Number"
              required
              disabled
              value={leaseInfo?.endDate}
            />
          </label>
          {/* Deposit */}
          <label className="input w-full">
            <input
              type="number"
              className="grow"
              placeholder="Deposit"
              required
              name="deposit"
              onChange={hdlChange}
              value={leaseInfo?.deposit}
            />
          </label>
        </form>
      </div>
      <div className="flex justify-center gap-4">
        <button className="btn" onClick={() => setCurrentStep((prv) => prv - 1)}>
          Back
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentStep((prv) => prv + 1)}
          disabled={!leaseInfo.endDate || !leaseInfo.deposit || false}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CreateLeaseStep2;
