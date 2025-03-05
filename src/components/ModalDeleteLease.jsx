import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';
import Swal from 'sweetalert2';
import { createError } from '../utils/error-warning';

function ModalDeleteLease(props) {
  const { lease, filter } = props;
  const { register, handleSubmit, formState, reset } = useForm();
  const token = useUserStore((state) => state.token);

  const hdlSubmit = async (value) => {
    try {
      if (lease.status === 'ACTIVE') {
        Swal.fire({
          title: 'Warning!',
          text: 'This lease is still active',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm Delete',
          target: document.getElementById('deleteLease-modal'),
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await axios.delete(`http://localhost:8000/lease/${lease.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response?.data?.status == 204) {
              document.getElementById('deleteLease-modal').close();
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
            }
          }
        });
      } else {
        console.log(document.getElementById('deleteLease-modal'));
        const response = await axios.delete(`http://localhost:8000/lease/${lease.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response?.status == 204) {
          filter();
          document.getElementById('deleteLease-modal').close();
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          });
        }
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      createError(errMsg, 'deleteLease-modal');
    }
  };
  return (
    <div>
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => document.getElementById('deleteLease-modal').close()}
      >
        ✕
      </button>
      <div className="text-2xl text-center">Delete This Lease?</div>

      <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
        <div className="flex">
          {/* Lease Id */}
          <label className="input w-full">
            {' '}
            Lease Id:
            <input type="input" className="grow" placeholder="Lease Id" required disabled value={lease.id} />
          </label>
          {/* Room Number */}
          <label className="input w-full">
            {' '}
            Room Number:
            <input type="input" className="grow" placeholder="Room Number" required disabled value={lease.roomId} />
          </label>
        </div>
        {/* Status */}
        <label className="input w-full">
          {' '}
          Status:
          <input type="input" className="grow" placeholder="Room Number" required disabled value={lease.status} />
        </label>
        {/* Start ate */}
        <label className="input w-full">
          Start Date:
          <input
            type="input"
            className="grow"
            placeholder="Start Date"
            required
            disabled
            value={`${lease.startDate.split('T')[0]}`}
          />
        </label>
        {/* Duration */}
        <label className="input w-full">
          Duration:
          <input type="input" className="grow" placeholder="Duration" disabled value={lease.duration} />
        </label>
        {/* End Date */}
        <label className="input w-full">
          End Date:
          <input
            type="input"
            className="grow"
            placeholder="End Date"
            disabled
            value={`${lease.endDate.split('T')[0]}`}
          />
        </label>

        {/* Tenants */}
        <div>Deleting this lease will also delete these tenants:</div>
        {lease?.Tenant.map((tenant) => {
          return (
            <label key={tenant.id} className="input w-full">
              Tenant:
              <input
                type="input"
                className="grow"
                placeholder="Tenant"
                disabled
                value={`${tenant.firstName} ${tenant.lastName}`}
              />
            </label>
          );
        })}
        <button className="btn btn-primary text-lg text-white" type="submit">
          Delete this lease
        </button>
      </form>
    </div>
  );
}

export default ModalDeleteLease;
