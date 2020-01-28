import Card from '../../../commons/components/Card';
import Button from '../../../commons/components/Button';

// import React, { useState, useEffect } from 'react';

interface Props {
  className?: string;
}

const OrderFood: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Card className='flex flex-col'>
        <h3 className='flex justify-center'>I am Thai Pasta</h3>
        <div className='my-4'>
          <span>Food</span>
          <p className='font-bold'>Chicken Green Curry Spagehetti</p>
          <p className='font-bold'>หฟกเหกดเหกดเหกดเหกด้</p>
        </div>
        <div className='my-4'>
          <span>Spice Level</span>
          <p className='font-bold'>Level 2</p>
          <p className='font-bold'>ฟหกดฟหเ</p>
        </div>
        <div className='my-4'>
          <span>Drink</span>
          <p className='font-bold'>Drinking</p>
          <p className='font-bold'>ฟหกเฟหกเ</p>
        </div>
        <Button type="button" className="bg-yellow-dark rounded p-2 m-4">Change Your mind?</Button>
      </Card>
    </div>
  );
};

export default OrderFood;
