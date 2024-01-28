import ShadowContainer from '@/components/ui/ShadowContainer';
import Spinner from '@/components/ui/Spinner';
import React from 'react';

export default function Loading() {
  return (
    <ShadowContainer className='py-8 px-8 rounded-xl overflow-hidden'>
      <Spinner size='small' />
    </ShadowContainer>
  );
}
