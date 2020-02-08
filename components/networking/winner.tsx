import React from 'react';
import Card from '../../commons/components/Card';

const Winner: React.FC = () => {
  return (
    <Card className='text-center w-full flex flex-col items-center justify-center'>
      <div className='mb-5 text-2xl font-bold '>
        Congratulations! <br /> You are the winner.
      </div>
      <div>
        Please <span className='font-extrabold'>claim your reward </span> <br />
        at the information desk.
      </div>
    </Card>
  );
};

export default Winner;
