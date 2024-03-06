import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className='flex w-full flex-1 items-center justify-center'>
      <FaSpinner className='h-10 w-10 animate-spin fill-primary' />
    </div>
  );
};

export default Loading;
