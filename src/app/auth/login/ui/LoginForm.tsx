'use client';

import { authenticate } from "@/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { IoAlertCircleSharp } from "react-icons/io5";

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  console.log({errorMessage: errorMessage});

  return (
    <form action={ dispatch } className='flex flex-col'>
      <label htmlFor='email'>Email</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
      />

      <label htmlFor='password'>Password</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        name='password'
      />
      {errorMessage && (
        <div className="flex flex-row gap-2">
          <IoAlertCircleSharp className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}
      <button type="submit" className='btn-primary'>Log in</button>

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>or</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/signup' className='btn-secondary text-center'>
        Create account
      </Link>
    </form>
  );
};