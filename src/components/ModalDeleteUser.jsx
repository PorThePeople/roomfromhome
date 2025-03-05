import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';
import { createError } from '../utils/error-warning';
import { createSuccess } from '../utils/success-alert';

function ModalDeleteUser(props) {
  const { setDeleteModalState, getUsers, currentUser, setCurrentUser } = props;
  const { register, handleSubmit, formState, reset, setValue } = useForm();
  const { isSubmitting, errors } = formState;
  console.log(currentUser);

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
    document.getElementById('deleteUser-modal').close();
    setDeleteModalState((prv) => false);
    setCurrentUser((prv) => {});
  };

  const hdlSubmit = async (value) => {
    try {
      console.log(value);
      const response = await axios.delete(`http://localhost:8000/user/${currentUser.id}`);
      getUsers();
      hdlCloseModal();
      createSuccess();
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      createError(errMsg, 'deleteUser-modal');
    }
  };

  return (
    <div>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={hdlCloseModal}>
        ✕
      </button>
      <div className="text-2xl text-center">Delete User</div>
      <form className="flex flex-col gap-4 p-4 w-full mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
        <div className="">
          {/* System Info */}
          <fieldset className="fieldset flex-1 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">User Info</legend>
            {/* Username */}
            <label className="input w-full">
              Username:
              <input type="input" className="grow" placeholder="Username" required {...register('username')} disabled />
            </label>
          </fieldset>
          {/* Personal Info */}
          <fieldset className="fieldset flex-1 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">Personal Info</legend>
            {/* Firstname */}
            <label className="input w-full">
              Firstname:
              <input
                type="input"
                className="grow"
                placeholder="Firstname"
                required
                {...register('firstName')}
                disabled
              />
            </label>

            {/* Lastname */}
            <label className="input w-full">
              Lastname:
              <input type="input" className="grow" placeholder="Lastname" required {...register('lastName')} disabled />
            </label>

            {/* Phone */}
            <label className="input w-full">
              Phone:
              <input
                type="input"
                className="grow"
                placeholder="Phone number"
                required
                {...register('phone')}
                disabled
              />
            </label>

            {/* Role */}
            <select className="select w-full" required {...register('role')} disabled>
              <option value="" disabled>
                Select a role
              </option>
              <option value={'USER'}>USER</option>
              <option value={'ADMIN'}>ADMIN</option>
            </select>

            {/* Salary */}
            <label className="input w-full">
              Salary:
              <input type="number" className="grow" placeholder="Salary" required {...register('salary')} disabled />
            </label>
          </fieldset>
        </div>
        <button className="btn btn-primary text-lg text-white" type="submit">
          Delete This User
        </button>
      </form>
    </div>
  );
}

export default ModalDeleteUser;
