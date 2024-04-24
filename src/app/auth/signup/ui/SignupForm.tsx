'use client';
import { login, registerUser } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';


type formInputs = {
  name: string,
  email: string,
  password: string
}

export const SignupForm = () => {

  const { register, handleSubmit, formState: {errors} } = useForm<formInputs>();
  const [errorMessage, setErrorMessage] = useState('')


  const onSubmit: SubmitHandler<formInputs> = async(data) => {
    const { name, email, password, } = data

    // server action
    const resp = await registerUser( name, email, password );
    
    if ( !resp.ok ) {
      setErrorMessage( resp.message )
      return;
    }

    await login(email.toLowerCase(),password);
    window.location.replace('/');
  }



  return (
    <form onSubmit={ handleSubmit( onSubmit )} className="flex flex-col">
      <label htmlFor="email" className='mt-5'>Full name</label>
      <input
        className={clsx( {'border-red-500': errors.name},
          "px-5 py-2 border bg-gray-300 rounded")}
        type="text"
        { ...register('name', {required: true })}
        autoFocus
      />
      {errors.name && <span className="text-red-700">Name is required</span>}

      <label htmlFor="email" className='mt-5'>Email</label>
      <input
        className={clsx( {'border-red-500': errors.email},
          "px-5 py-2 border bg-gray-300 rounded")}
        type="email"
        { ...register('email', {required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }) }
      />
      {errors.email && <span className="text-red-700">Email is required</span>}

      <label htmlFor="password" className='mt-5'>Password</label>
      <input
        className={clsx( {'border-red-500': errors.password},
          "px-5 py-2 border bg-gray-300 rounded")}
        type="password"
        { ...register('password', {required: true, minLength: 6 })}
      />
      {errors.password && <span className="text-red-700">Password is required</span>}

      {
        <span className="text-red-700">{ errorMessage }</span>
      }

      <button className="btn-primary  mt-5">Sign up</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Log in
      </Link>
    </form>
  );
};
