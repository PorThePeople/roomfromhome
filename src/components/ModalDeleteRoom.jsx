import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';
import { createError } from '../utils/error-warning';
import { createSuccess } from '../utils/success-alert';
import Swal from 'sweetalert2';

function ModalDeleteRoom(props) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { isSubmitting, errors } = formState;

  const { room, filter, setQuery } = props;
  const token = useUserStore((state) => state.token);
  console.log(room);

  const hdlSubmit = async (value) => {
    try {
      if (room.status == 'OCCUPIED') {
        Swal.fire({
          title: 'Warning!',
          text: 'This room is currently occupied',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm Delete',
          target: document.getElementById('deleteRoom-modal'),
        }).then(async (result) => {
          if (result.isConfirmed) {
            const result = await axios.delete(`http://localhost:8000/room/${room.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            document.getElementById('deleteRoom-modal').close();
            createSuccess();
            reset();

            setQuery((prv) => ({
              contains: '',
              status: '',
              airCon: '',
              orderBySort: '&orderBy=updatedAt&sort=desc',
              take: '10',
              skip: '',
            }));
            filter();
          }
        });
      } else {
        const result = await axios.delete(`http://localhost:8000/room/${room.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        document.getElementById('deleteRoom-modal').close();
        createSuccess();
        reset();

        setQuery((prv) => ({
          contains: '',
          status: '',
          airCon: '',
          orderBySort: '&orderBy=updatedAt&sort=desc',
          take: '10',
          skip: '',
        }));
        filter();
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      createError(errMsg, 'deleteRoom-modal');
    }
  };

  return (
    <div>
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => document.getElementById('deleteRoom-modal').close()}
      >
        ✕
      </button>
      <div className="text-2xl text-center">Delete This Room</div>
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
        {/* Status */}
        <label className="input w-full">
          {' '}
          Status:
          <input type="input" className="grow" placeholder="Status" required disabled value={room.status} />
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
        {room.Lease.length > 0 && (
          <>
            <div>Deleting this room will delete the following leases and tenants:</div>
            {room.Lease.map((lease) => {
              return (
                <div className="flex gap-4">
                  <div>Lease Id={lease.id}: </div>
                  <div>
                    {lease.Tenant.map((tenant) => {
                      return (
                        <div>
                          {tenant.firstName} {tenant.lastName}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
        <button className="btn btn-primary text-lg text-white" type="submit">
          Delete this room
        </button>
      </form>
    </div>
  );
}

export default ModalDeleteRoom;
