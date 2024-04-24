'use client';

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoAlertCircleSharp } from "react-icons/io5";

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  
  useEffect(()=>{
    if (errorMessage == "Success") {
      window.location.replace('/')
    }


  },[errorMessage])

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
      {(errorMessage && errorMessage!=="Success") && (
        <div className="flex flex-row gap-2">
          <IoAlertCircleSharp className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}
      <LoginButton />

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


function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button type="submit" 
            className={clsx( pending? "btn-disabled":"btn-primary" )}
            disabled={pending}>
      Log in
    </button>
  );
}