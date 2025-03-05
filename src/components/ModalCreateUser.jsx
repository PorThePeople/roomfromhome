import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useUserStore from '../stores/userStore';
import { createError } from '../utils/error-warning';
import { createSuccess } from '../utils/success-alert';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const createUserSchema = z
  .object({
    username: z.string().toLowerCase().min(6, 'Username must be at least 6 characters'),
    password: z.string().min(6, 'Username must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Username must be at least 6 characters'),
    firstName: z
      .string()
      .regex(/^[A-Za-z\u0E00-\u0E7F]+$/)
      .min(3, 'Firstname must be at least 3 characters'),
    lastName: z
      .string()
      .regex(/^[A-Za-z\u0E00-\u0E7F]+$/)
      .min(3, 'Lastname must be at least 3 characters'),
    nationalId: z.string().regex(/^\d{13}$/, 'National Id must be 13 characters'),
    phone: z.string().regex(/^0\d{9}$/, 'Phone must be 10 characters'),
    role: z.enum(['ADMIN', 'MANAGER', 'USER']),
    salary: z
      .string()
      .transform((val) => Number(val))
      .pipe(z.number().gte(15000, 'Salary must be greater than minimum wage')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

function ModalCreateUser(props) {
  const token = useUserStore((state) => state.token);
  const { setModalState, getUsers } = props;
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(createUserSchema),
  });
  const { isSubmitting, errors } = formState;

  const hdlCloseModal = () => {
    document.getElementById('createUser-modal').close();
    setModalState((prv) => false);
  };

  const hdlSubmit = async (value) => {
    try {
      console.log(value);
      const response = await axios.post('http://localhost:8000/auth/register', value, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getUsers();
      hdlCloseModal();
      createSuccess();
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      createError(errMsg, 'createUser-modal');
    }
  };

  return (
    <div>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={hdlCloseModal}>
        ✕
      </button>
      <div className="text-2xl text-center">Create New User</div>

      <form className="flex flex-col gap-4 p-4 w-full mx-auto" onSubmit={handleSubmit(hdlSubmit)}>
        <div className="flex w-full gap-4">
          {/* System Info */}
          <fieldset className="fieldset flex-1 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">User Info</legend>
            {/* Username */}
            <label className="input w-full">
              <input type="input" className="grow" placeholder="Username" required {...register('username')} />
            </label>
            {errors?.username && <p className="validator-hint text-red-500">{errors?.username.message}</p>}
            {/* Password */}
            <label className="input w-full">
              <input type="password" className="grow" placeholder="Password" required {...register('password')} />
            </label>
            {errors?.password && <p className="validator-hint text-red-500">{errors?.password.message}</p>}

            <label className="input w-full">
              <input
                type="password"
                className="grow"
                placeholder="Confirm Your Password"
                required
                {...register('confirmPassword')}
              />
            </label>
            {errors?.confirmPassword && (
              <p className="validator-hint text-red-500">{errors?.confirmPassword.message}</p>
            )}
          </fieldset>
          {/* Personal Info */}
          <fieldset className="fieldset flex-1 border border-base-300 p-4 rounded-box">
            <legend className="fieldset-legend">Personal Info</legend>
            {/* Firstname */}
            <label className="input w-full">
              <input type="input" className="grow" placeholder="Firstname" required {...register('firstName')} />
            </label>
            {errors?.firstName && <p className="validator-hint text-red-500">{errors?.firstName.message}</p>}

            {/* Lastname */}
            <label className="input w-full">
              <input type="input" className="grow" placeholder="Lastname" required {...register('lastName')} />
            </label>
            {errors?.lastName && <p className="validator-hint text-red-500">{errors?.lastName.message}</p>}
            {/* National Id */}
            <label className="input w-full">
              <input type="input" className="grow" placeholder="National Id" required {...register('nationalId')} />
            </label>
            {errors?.nationalId && <p className="validator-hint text-red-500">{errors?.nationalId.message}</p>}
            {/* Phone */}
            <label className="input w-full">
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
              <input type="number" className="grow" placeholder="Salary" required {...register('salary')} />
            </label>
            {errors?.salary && <p className="validator-hint text-red-500">{errors?.salary.message}</p>}
          </fieldset>
        </div>

        <button className="btn btn-primary text-lg text-white" type="submit">
          Create New User
        </button>
      </form>
    </div>
  );
}

export default ModalCreateUser;
