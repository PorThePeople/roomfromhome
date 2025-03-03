import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';
import Swal from 'sweetalert2';

function ModalEditTenant(props) {
  const { tenant, getTenants } = props;
  const { register, handleSubmit, formState, reset, setValue } = useForm();
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    if (tenant.id) setValue('id', tenant.id);
    if (tenant?.lease?.roomId) setValue('roomId', tenant?.lease?.roomId);
    if (tenant.firstName) setValue('firstName', tenant.firstName);
    if (tenant.lastName) setValue('lastName', tenant.lastName);
    if (tenant.phone) setValue('phone', tenant.phone);
  }, [tenant]);

  const hdlCloseModal = () => {
    document.getElementById('editTenant-modal').close();
  };

  const hdlSubmit = async (value) => {
    const body = {
      firstName: value.firstName,
      lastName: value.lastName,
      phone: value.phone,
    };
    const response = await axios.put(`http://localhost:8000/tenant/${value.id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status == 200) {
      getTenants();
      hdlCloseModal();
      Swal.fire({
        title: 'Update Tenant Info Successful!',
        icon: 'success',
      });
    }
  };

  return (
    <div>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={hdlCloseModal}>
        ✕
      </button>
      <div className="text-2xl text-center">Update Tenant Info</div>

      <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
        <div className="flex">
          {/* Tenant Id */}
          <label className="input w-full">
            Tenant ID:
            <input type="input" className="grow" placeholder="Tenant ID" required {...register('id')} disabled />
          </label>
          {/* Room Number */}
          <label className="input w-full">
            Room Number:
            <input type="input" className="grow" placeholder="Room Number" required {...register('roomId')} disabled />
          </label>
        </div>

        {/* Firstname */}
        <label className="input w-full">
          <input type="input" className="grow" placeholder="Firstname" required {...register('firstName')} />
        </label>
        {/* Lastname */}
        <label className="input w-full">
          <input type="input" className="grow" placeholder="Lastname" required {...register('lastName')} />
        </label>
        {/* Phone */}
        <label className="input w-full">
          <input type="input" className="grow" placeholder="Phone" required {...register('phone')} />
        </label>
        <button className="btn btn-primary text-lg text-white" type="submit">
          Update Tenant Info
        </button>
      </form>
    </div>
  );
}

export default ModalEditTenant;
