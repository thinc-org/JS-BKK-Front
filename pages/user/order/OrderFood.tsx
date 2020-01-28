import Card from '../../../commons/components/Card';
import Button from '../../../commons/components/Button';
import MyOrder from '../../../commons/hooks/useMyOrder';
// import React, { useState, useEffect } from 'react';

interface Props {
  className?: string;
}

const OrderFood: React.FC<Props> = ({ className }) => {
  const { data } = MyOrder();

  return (
    <div className={className}>
      <h2 className='text-white text-2xl font-semibold my-2'>
        Your Food Selection
      </h2>
      <Card className='flex flex-col'>
        <h3 className='flex justify-center font-bold'>I am Thai Pasta</h3>
        <div className='my-4'>
          <span>Food (อาหาร):</span>
          <p className='font-bold'>{data?.food}</p>
        </div>
        <div className='my-4 '>
          <span>Spice level (ความเผ็ด):</span>
          <p className='font-bold'>{data?.spice}</p>
        </div>
        <div className='my-4'>
          <span>Drink (เครื่องดื่ม):</span>
          <p className='font-bold'>{data?.drink}</p>
        </div>
        <div className='my-4'>
          <span>Dessert (ขนมหว่าน):</span>
          <p className='font-bold'>{data?.dessert}</p>
        </div>
        <Button type='button' className='bg-yellow-dark rounded p-2 m-4 text-xl'>
          Change Your mind?
        </Button>
      </Card>
    </div>
  );
};

export default OrderFood;
