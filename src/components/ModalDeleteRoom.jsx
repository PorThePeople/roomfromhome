import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';

function ModalDeleteRoom(props) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { isSubmitting, errors } = formState;
  //   console.log(errors);

  const { room, filter, setQuery } = props;
  const token = useUserStore((state) => state.token);

  const hdlSubmit = async (value) => {
    console.log(room);
    // Call API
    const result = await axios.delete(`http://localhost:8000/room/${room.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Reset Fields
    reset();

    // Close Modal
    document.getElementById('deleteRoom-modal').close();

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
        onClick={() => document.getElementById('deleteRoom-modal').close()}
      >
        ✕
      </button>
      <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
        {/* Room Id */}
        <label className="input w-full">
          {' '}
          Room Id:
          <input type="input" className="grow" placeholder="Room Number" required value={room.id} disabled />
        </label>
        {/* MonthlyRate */}
        <label className="input w-full">
          {' '}
          Monthly Rate:
          <input type="number" className="grow" placeholder="Monthly Rate" required disabled value={room.monthlyRate} />
        </label>
        {/* AirCon */}
        <label className="input w-full">
          AirCon:
          <input type="input" className="grow" placeholder="AirCon" required disabled value={room.airCon} />
        </label>
        {/* Furniture */}
        <label className="input w-full">
          Furniture:
          <input type="input" className="grow" placeholder="Furniture" disabled value={room.furniture} />
        </label>
        <button className="btn btn-primary text-lg text-white" type="submit">
          Delete this room
        </button>
      </form>
    </div>
  );
}

export default ModalDeleteRoom;
