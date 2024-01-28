import ShadowContainer from '@/components/ui/ShadowContainer';
import Spinner from '@/components/ui/Spinner';
import React from 'react';

export default function loading() {
  return (
    <ShadowContainer className='py-8 px-8 min-h-[40vh] flex justify-center rounded-xl overflow-hidden'>
      <Spinner color='gray' size='small' />
    </ShadowContainer>
  );
}
