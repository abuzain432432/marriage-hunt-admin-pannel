import React from 'react';
import LoginForm from '@/components/Login/LoginForm';
import Sidebar from '@/components/Login/Sidebar';

export default function Login() {
  return (
    <section className='grid grid-cols-5  min-h-screen items-center'>
      <LoginForm />
      <Sidebar />
    </section>
  );
}
