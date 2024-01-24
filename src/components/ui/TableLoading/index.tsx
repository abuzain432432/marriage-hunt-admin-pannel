import React from 'react';
import Spinner from '../Spinner';

export default function TableLoading() {
  return (
    <div className='flex h-[40vh] bg-gray-150 justify-center items-center'>
      <Spinner color='gray' />
    </div>
  );
}
