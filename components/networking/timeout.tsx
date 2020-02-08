import React from 'react';
import Card from '../../commons/components/Card';

const TimeOut: React.FC = () => {
  return (
    <Card className='h-full text-center w-full flex flex-col items-center justify-center'>
      <div className='max-w-small'>
        <div className='mb-5 text-2xl  font-extrabold text-center'>
          Timeout!!!
        </div>
        <div className='text-center'>
          <div className='text-lg'>Try again...</div>
          <div className='text-base '>JavaScript Bangkok 2.0.0</div>
        </div>
      </div>
    </Card>
  );
};

export default TimeOut;
