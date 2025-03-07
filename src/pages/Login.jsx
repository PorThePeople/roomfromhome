import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useUserStore from '../stores/userStore';
import Swal from 'sweetalert2';

const loginSchema = z.object({
  username: z.string().toLowerCase().min(6, 'Username must contain at least 6 characters'),
  password: z.string().min(6, 'Password must contain at least 6 characters'),
});

function Login() {
  const login = useUserStore((state) => state.login);
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { isSubmitting, errors } = formState;
  const hdlSubmit = async (value) => {
    try {
      const resp = await login(value);
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.error || error.message;
      console.log(errMsg);
      Swal.fire({
        title: 'Erorr!',
        text: errMsg,
        icon: 'error',
      });
    }
  };
  return (
    <div className="relative bg-[url('./assets/login-bg.jpg')] bg-cover bg-center min-h-screen flex flex-col justify-center items-center gap-2">
      {/* Gradient Overlay */}
      <div class="absolute inset-0 bg-gradient-to-t from-black opacity-75"></div>
      {/* Logo */}
      <div className="text-5xl font-extrabold text-white z-10">RoomFromHome</div>
      <form
        className="flex flex-col gap-4 p-4 w-[400px] bg-gray-50 z-10 h-1/2 rounded-2xl"
        onSubmit={handleSubmit(hdlSubmit)}
      >
        {/* Username */}
        <label className="input w-full">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </g>
          </svg>
          <input type="input" className="grow" placeholder="Username" {...register('username')} />
        </label>
        {errors?.username && <p className="validator-hint text-red-500">{errors?.username.message}</p>}
        {/* Password */}
        <label className="input w-full">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input type="password" className="grow" placeholder="Password" {...register('password')} />
        </label>
        {errors?.password && <p className="validator-hint text-red-500">{errors?.password.message}</p>}
        <button className="btn btn-primary text-lg text-white	" type="submit">
          Create New Account
        </button>
      </form>
    </div>
  );
}

export default Login;
