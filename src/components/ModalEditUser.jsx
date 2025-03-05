import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';
import { createError } from '../utils/error-warning';
import { createSuccess } from '../utils/success-alert';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const editUserSchema = z.object({
  username: z.string().toLowerCase().min(6, 'Username must be at least 6 characters'),
  firstName: z
    .string()
    .regex(/^[A-Za-z\u0E00-\u0E7F]+$/)
    .min(3, 'Firstname must be at least 3 characters'),
  lastName: z
    .string()
    .regex(/^[A-Za-z\u0E00-\u0E7F]+$/)
    .min(3, 'Lastname must be at least 3 characters'),
  phone: z.string().regex(/^0\d{9}$/, 'Phone must be 10 characters'),
  role: z.enum(['ADMIN', 'MANAGER', 'USER']),
  salary: z.number().gte(15000, 'Salary must be greater than minimum wage'),
});

function ModalEditUser(props) {
  const { setEditModalState, getUsers, currentUser, setCurrentUser } = props;
  const { register, handleSubmit, formState, reset, setValue } = useForm({
    resolver: zodResolver(editUserSchema),
  });
  const { isSubmitting, errors } = formState;

  useEffect(() => {
    if (currentUser.id) setValue('id', currentUser.id);
    if (currentUser.username) setValue('username', currentUser.username);
    if (currentUser.firstName) setValue('firstName', currentUser.firstName);
    if (currentUser.lastName) setValue('lastName', currentUser.lastName);
    if (currentUser.phone) setValue('phone', currentUser.phone);
    if (currentUser.role) setValue('role', currentUser.role);
    if (currentUser.salary) setValue('salary', currentUser.salary);
  }, []);

  const hdlCloseModal = () => {
    document.getElementById('editUser-modal').close();
    setEditModalState((prv) => false);
    setCurrentUser((prv) => {});
  };

  const hdlSubmit = async (value) => {
    try {
      console.log(value);
      const response = await axios.put(`http://localhost:8000/user/${currentUser.id}`, value);
      getUsers();
      hdlCloseModal();
      createSuccess();
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      createError(errMsg, 'editUser-modal');
    }
  };

  return (
    <div>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={hdlCloseModal}>
        ✕
      </button>
      <div className="text-2xl text-center">Edit User Info</div>
      <form className="flex flex-col gap-4 p-4 w-full mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
        <div className="">
          {/* System Info */}
          <fieldset className="fieldset flex-1 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">User Info</legend>
            {/* Username */}
            <label className="input w-full">
              Username:
              <input type="input" className="grow" placeholder="Username" required {...register('username')} />
            </label>
            {errors?.username && <p className="validator-hint text-red-500">{errors?.username.message}</p>}
          </fieldset>
          {/* Personal Info */}
          <fieldset className="fieldset flex-1 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">Personal Info</legend>
            {/* Firstname */}
            <label className="input w-full">
              Firstname:
              <input type="input" className="grow" placeholder="Firstname" required {...register('firstName')} />
            </label>
            {errors?.firstName && <p className="validator-hint text-red-500">{errors?.firstName.message}</p>}
            {/* Lastname */}
            <label className="input w-full">
              Lastname:
              <input type="input" className="grow" placeholder="Lastname" required {...register('lastName')} />
            </label>
            {errors?.lastName && <p className="validator-hint text-red-500">{errors?.lastName.message}</p>}
            {/* Phone */}
            <label className="input w-full">
              Phone:
              <input type="input" className="grow" placeholder="Phone number" required {...register('phone')} />
            </label>
            {errors?.phone && <p className="validator-hint text-red-500">{errors?.phone.message}</p>}
            {/* Role */}
            <select className="select w-full" required {...register('role')}>
              <option value="" disabled>
                Select a role
              </option>
              <option value={'USER'}>USER</option>
              <option value={'ADMIN'}>ADMIN</option>
            </select>
            {errors?.role && <p className="validator-hint text-red-500">{errors?.role.message}</p>}
            {/* Salary */}
            <label className="input w-full">
              Salary:
              <input type="number" className="grow" placeholder="Salary" required {...register('salary')} />
            </label>
            {errors?.salary && <p className="validator-hint text-red-500">{errors?.salary.message}</p>}
          </fieldset>
        </div>
        <button className="btn btn-primary text-lg text-white" type="submit">
          Update User Info
        </button>
      </form>
    </div>
  );
}

export default ModalEditUser;
