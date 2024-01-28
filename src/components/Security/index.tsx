import React from 'react';
import ShadowContainer from '../ui/ShadowContainer';
import ChangePasswordForm from './ChangePasswordForm';
import Plans from './Plans';

export default function Security() {
  return (
    <ShadowContainer className='py-8 px-8 rounded-xl overflow-hidden'>
      <Plans />
      <div className='border-b my-6 border-black/10 h-1 w-full' />
      <ChangePasswordForm />
    </ShadowContainer>
  );
}
