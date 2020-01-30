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
        <h3 className='flex justify-center font-bold'>{data?.title}</h3>
        <div className='my-4'>
          <span className='text-gray-600'>Food (อาหาร):</span>
          <p className='font-bold'>{data?.food}</p>
          {data?.food2 && <p className='font-bold'>{data?.food2}</p>}
        </div>
        {data?.side && (
          <div className='my-4'>
            <span className='text-gray-600'>Side Dish (กับข้าว):</span>
            <p className='font-bold'>{data?.side}</p>
          </div>
        )}
        {data?.spice && (
          <div className='my-4 '>
            <span className='text-gray-600'>Spice level (ความเผ็ด):</span>
            <p className='font-bold'>{data?.spice}</p>
          </div>
        )}
        {data?.drink && (
          <div className='my-4'>
            <span className='text-gray-600'>Drink (เครื่องดื่ม):</span>
            <p className='font-bold'>{data?.drink}</p>
          </div>
        )}
        {data?.dessert && (
          <div className='my-4'>
            <span className='text-gray-600'>Dessert (ขนมหว่าน):</span>
            <p className='font-bold'>{data?.dessert}</p>
          </div>
        )}
        <Button
          type='button'
          className='bg-yellow-dark rounded p-2 m-4 text-xl'
        >
          Change Your mind?
        </Button>
      </Card>
    </div>
  );
};

export default OrderFood;
