import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';
import { createSuccess } from '../utils/success-alert';
import { createError } from '../utils/error-warning';

function ModalProfile(props) {
  const { setModalState } = props;
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const { register, handleSubmit, formState, reset, setValue } = useForm();
  const { isSubmitting, errors } = formState;

  const hdlCloseModal = () => {
    setModalState((prv) => false);
    document.getElementById('profile-modal').close();
  };

  const hdlSubmit = async (value) => {
    try {
      const { id, ...body } = value;

      const response = await axios.put(`http://localhost:8000/user/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status == 200) {
        useUserStore.setState({ user: response.data.result });
        createSuccess();
        hdlCloseModal();
      }
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      createError(errMsg, 'profile-modal');
    }
  };

  useEffect(() => {
    if (user.id) setValue('id', user.id);
    if (user.firstName) setValue('firstName', user.firstName);
    if (user.lastName) setValue('lastName', user.lastName);
    if (user.phone) setValue('phone', user.phone);
  }, [user]);

  return (
    <div>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={hdlCloseModal}>
        ✕
      </button>
      <div className="text-center">Hello, {user.firstName}!</div>
      <form className="flex flex-col gap-4 p-4 w-[400px] mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
        {/* Firstname */}
        <label className="input w-full">
          Firstname:
          <input type="input" className="grow" placeholder="Firstname" required {...register('firstName')} />
        </label>
        {/* Lastname */}
        <label className="input w-full">
          Lastname:
          <input type="input" className="grow" placeholder="Lastname" required {...register('lastName')} />
        </label>
        {/* Phone */}
        <label className="input w-full">
          Phone:
          <input type="input" className="grow" placeholder="Phone" required {...register('phone')} />
        </label>
        <button className="btn btn-primary text-lg text-white" type="submit">
          Update My Profile
        </button>
      </form>
    </div>
  );
}

export default ModalProfile;
