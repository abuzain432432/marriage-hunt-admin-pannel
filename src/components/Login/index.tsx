import React from 'react';
import LoginForm from '@/components/Login/LoginForm';
import Sidebar from '@/components/Login/Sidebar';

export default function Login() {
  return (
    <section className='grid bg-[#F7F6F9] grid-cols-5  min-h-screen items-center'>
      <LoginForm />
      <Sidebar />
    </section>
  );
}
