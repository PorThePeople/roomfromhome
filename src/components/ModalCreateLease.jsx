import React, { useEffect, useState, useRef, useId } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

const emptyLeaseInfo = { startDate: '', duration: '', endDate: '' };

function ModalCreateLease(props) {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [leaseInfo, setLeaseInfo] = useState(emptyLeaseInfo);
  const { register, handleSubmit, formState, reset, setValue } = useForm();
  const { isSubmitting, errors } = formState;
  //   console.log(errors);

  const { setQuery, filter } = props;
  const token = useUserStore((state) => state.token);

  // Get All Vacant Rooms
  const getAvailableRooms = async () => {
    const results = await axios.get(`http://localhost:8000/room?status=AVAILABLE`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAvailableRooms((prv) => results?.data?.results);
  };

  useEffect(() => {
    getAvailableRooms();
  }, []);

  // Select a vacant room
  const hdlSelectRoom = (room) => {
    setCurrentRoom((prv) => room);
  };

  useEffect(() => {
    if (currentRoom?.id) setValue('id', currentRoom.id);
    if (currentRoom?.monthlyRate) setValue('monthlyRate', currentRoom.monthlyRate);
    if (currentRoom?.furniture) setValue('furniture', currentRoom.furniture);
  }, [currentRoom]);

  useEffect(() => {
    console.log(startDate);
    setLeaseInfo((prv) => ({ ...prv, startDate: startDate.toISOString() }));
  }, [startDate]);

  const hdlDurationChange = (e) => {
    setLeaseInfo((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const calculateEndDate = (startDate, duration) => {
    // console.log(startDate.getTime());
    if (!startDate || !duration) {
      return;
    }
    const startDateMS = new Date(startDate).getTime();
    const lengthMS = Number(duration) * 30 * 24 * 60 * 60 * 1000;
    const endDateMS = startDateMS + lengthMS;
    const endDate = new Date(endDateMS).toISOString();
    setLeaseInfo((prv) => ({ ...prv, endDate: endDate }));
  };

  useEffect(() => {
    calculateEndDate(leaseInfo.startDate, leaseInfo.duration);
  }, [leaseInfo.startDate, leaseInfo.duration]);

  const hdlCloseModal = () => {
    document.getElementById('createLease-modal').close();
    reset();
    setLeaseInfo((prv) => emptyLeaseInfo);
    setCurrentRoom((prv) => {});
    setCurrentStep((prv) => 1);
  };

  const hdlSubmit = async (value) => {
    // console.log(value);
    // Call API
    const result = await axios.post(
      'http://localhost:8000/room',
      { ...value, monthlyRate: Number(value.monthlyRate) },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Reset Fields
    reset();

    // Close Modal
    document.getElementById('createLease-modal').close();

    // Fetch All Data
    setQuery((prv) => ({
      contains: '',
      status: '',
      airCon: '',
      orderBySort: '&orderBy=updatedAt&sort=desc',
      take: '10',
      skip: '',
    }));
    filter();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Close Button */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={hdlCloseModal}>
        ✕
      </button>
      {/* Progress Indicator */}
      <div className="flex justify-center">
        <ul className="steps">
          <li className={currentStep >= 1 ? 'step step-primary' : 'step'}>Select Room</li>
          <li className={currentStep >= 2 ? 'step step-primary' : 'step'}>Lease Info</li>
          <li className={currentStep >= 3 ? 'step step-primary' : 'step'}>Tenant Info</li>
          <li className={currentStep >= 4 ? 'step step-primary' : 'step'}>Confirmation</li>
        </ul>
      </div>
      {/* Form Content */}
      {/* Step 1 */}
      {currentStep == 1 && (
        <div className="flex flex-col">
          <div className="flex gap-2">
            {/* Available Rooms */}
            <div className="flex flex-wrap justify-start items-start p-4 gap-4 bg-red-200 flex-1">
              {/* <pre>{JSON.stringify(availableRooms, null, 2)}</pre> */}
              {availableRooms.map((room) => {
                return (
                  <button className="btn" onClick={() => hdlSelectRoom(room)}>
                    {room.id}
                  </button>
                );
              })}
            </div>
            <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
              {/* Room Id */}
              <label className="input w-full">
                <input type="input" className="grow" placeholder="Room Number" required {...register('id')} disabled />
              </label>
              {/* MonthlyRate */}
              <label className="input w-full">
                <input
                  type="number"
                  className="grow"
                  placeholder="Monthly Rate"
                  required
                  {...register('monthlyRate')}
                  disabled
                />
              </label>
              {/* AirCon */}
              <label className="flex justify-between px-3">
                <div>Air Conditioning</div>
                <label className="toggle text-base-content">
                  <input type="checkbox" {...register('airCon')} checked={currentRoom?.airCon} disabled />
                  <svg
                    aria-label="disabled"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="4" fill="none" stroke="currentColor">
                      <path d="M20 6 9 17l-5-5"></path>
                    </g>
                  </svg>
                </label>
              </label>

              {/* Furniture */}
              <label className="input w-full">
                <input type="input" className="grow" placeholder="Furniture" {...register('furniture')} />
              </label>
            </form>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className="btn"
              onClick={() => setCurrentStep((prv) => prv - 1)}
              disabled={currentStep == 1 ? true : false}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setCurrentStep((prv) => prv + 1)}
              disabled={!currentRoom?.id ? true : false}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Step 2 */}
      {currentStep == 2 && (
        <div className="flex flex-col">
          <div className="flex">
            <DayPicker mode="single" onSelect={setStartDate} selected={startDate} />
            <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
              {/* Room Id */}
              <label className="input w-full">
                <input type="input" className="grow" placeholder="Room Number" required {...register('id')} disabled />
              </label>
              {/* Start Date */}
              <label className="input w-full">
                <input
                  type="input"
                  className="grow"
                  placeholder="Start Date"
                  required
                  {...register('startDate')}
                  disabled
                  value={leaseInfo.startDate}
                />
              </label>
              {/* Select Lease Duration */}
              <select className="select" name="duration" onChange={hdlDurationChange} value={leaseInfo.duration}>
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
                  {...register('endDate')}
                  disabled
                  value={leaseInfo.endDate}
                />
              </label>
            </form>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className="btn"
              onClick={() => setCurrentStep((prv) => prv - 1)}
              disabled={currentStep == 1 ? true : false}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setCurrentStep((prv) => prv + 1)}
              disabled={!leaseInfo.endDate ? true : false}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Step 3 */}
      {currentStep == 3 && <div>This is step 3</div>}
      {/* Step 4 */}
      {currentStep == 4 && <div>This is step 4</div>}
      {/* Back/Next Buttons */}
    </div>
  );
}

export default ModalCreateLease;
