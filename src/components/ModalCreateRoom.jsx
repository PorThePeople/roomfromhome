import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';

function ModalCreateRoom(props) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { isSubmitting, errors } = formState;
  //   console.log(errors);

  const { setQuery, filter } = props;
  const token = useUserStore((state) => state.token);

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
    document.getElementById('createRoom-modal').close();

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
        onClick={() => document.getElementById('createRoom-modal').close()}
      >
        ✕
      </button>
      <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
        {/* Room Id */}
        <label className="input w-full">
          <input type="input" className="grow" placeholder="Room Number" required {...register('id')} />
        </label>
        {/* MonthlyRate */}
        <label className="input w-full">
          <input type="number" className="grow" placeholder="Monthly Rate" required {...register('monthlyRate')} />
        </label>
        {/* AirCon */}

        <label className="flex justify-between px-3">
          <div>Air Conditioning</div>
          <label className="toggle text-base-content">
            <input type="checkbox" {...register('airCon')} />
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
        <button className="btn btn-primary text-lg text-white" type="submit">
          Create New Room
        </button>
      </form>
    </div>
  );
}

export default ModalCreateRoom;
