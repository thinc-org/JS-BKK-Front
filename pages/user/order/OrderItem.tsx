import React from 'react';
import { Restaurant } from '../../../interfaces/Orders';
import Button from '../../../commons/components/Button';

interface propTypes {
  order: Restaurant;
  onOrder: (data?: any) => any;
}

const OrderItem: React.FC<propTypes> = ({ order = {}, onOrder }) => {
  const { title } = order;

  // const allergicItems = useMemo(() => {
  //   return allergics?.map(allergic => {
  //     return (
  //       <div key={allergic} className='text-xs flex flex-col'>
  //         <span className='mb-1 text-red-400'>
  //           ข้อมูลสำหรับผู้แพ้อาหาร (Food Allergy)
  //         </span>{' '}
  //         <span className='text-red-600'>- {allergic}</span>
  //       </div>
  //     );
  //   });
  // }, [allergics]);

  // const genresItems = useMemo(() => {
  //   return genres?.map(genre => {
  //     return (
  //       <div key={genre} className='mr-1'>
  //         <Tag title={genre} />
  //       </div>
  //     );
  //   });
  // }, [genres]);

  return (
    <div className='flex justify-between text-xs leading-none border border-black px-4 py-3'>
      <div className='flex flex-col'>
        <div className='mb-3'>
          <div className='text-base my-1'>{title}</div>
          {/* <div className='text-gray-400 '>{merchant}</div> */}
        </div>
        {/* <div className='flex flex-row'>{genresItems}</div> */}
        {/* {allergicItems && <div className='mt-3'>{allergicItems}</div>} */}
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
