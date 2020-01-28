import React from 'react';
import { Choice } from '../../../interfaces/Orders';
import Button from '../../../commons/components/Button';

interface propTypes {
  order: Choice;
  onOrder: (data?: any) => any;
}

const OrderItem: React.FC<propTypes> = ({ order = {}, onOrder }) => {
  const { title, availability, info } = order;

  return (
    <div className='flex justify-between text-xs leading-none border border-black px-4 py-3'>
      <div className='flex flex-col'>
        <div className='mb-3'>
          <div className='text-base my-1'>{title}</div>
          <div>{availability} Left</div>
          <div>{info}</div>
        </div>
      </div>
      <div>
        <Button
          onClick={() => onOrder(order)}
          type='button'
          className='bg-black text-white py-2 px-4 truncate'
        >
          สั่งอาหาร
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;
