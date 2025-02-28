import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';

function ModalEditRoom(props) {
  const { room, setQuery, filter } = props;
  const { register, handleSubmit, formState, reset, setValue } = useForm();
  const { isSubmitting, errors } = formState;
  //   console.log(errors);

  const token = useUserStore((state) => state.token);

  useEffect(() => {
    if (room.id) setValue('id', room.id);
    if (room.monthlyRate) setValue('monthlyRate', room.monthlyRate);
    if (room.airCon) setValue('airCon', room.airCon);
    if (room.furniture) setValue('furniture', room.furniture);
  }, [room]);

  const hdlSubmit = async (value) => {
    console.log(value);
    // Call API
    const result = await axios.put(
      `http://localhost:8000/room/${room.id}`,
      { ...value, monthlyRate: Number(value.monthlyRate) },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Reset Fields
    reset();

    // Close Modal
    document.getElementById('editRoom-modal').close();

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
    <div>
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => document.getElementById('editRoom-modal').close()}
      >
        ✕
      </button>
      <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
        {/* Room Id */}
        <label className="input w-full">
          <input
            type="input"
            className="grow"
            placeholder="Room Number"
            required
            {...register('id')}
            // defaultValue={room.id}
            disabled
          />
        </label>
        {/* MonthlyRate */}
        <label className="input w-full">
          <input
            type="number"
            className="grow"
            placeholder="Monthly Rate"
            required
            {...register('monthlyRate')}
            defaultValue={room.monthlyRate}
          />
        </label>
        {/* AirCon */}

        <label className="flex justify-between px-3">
          <div>Air Conditioning</div>
          <label className="toggle text-base-content">
            <input type="checkbox" {...register('airCon')} defaultChecked={room.airCon} />
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
          <input
            type="input"
            className="grow"
            placeholder="Furniture"
            {...register('furniture')}
            defaultValue={room.furniture}
          />
        </label>
        <button className="btn btn-primary text-lg text-white" type="submit">
          Update Room Info
        </button>
      </form>
    </div>
  );
}

export default ModalEditRoom;
