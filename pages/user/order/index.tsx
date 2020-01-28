import React, { useContext, useEffect, useState, useCallback } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import useMockApi from '../../../commons/hooks/useMockApi';
import { Restaurant } from '../../../interfaces/Orders';
import OrderItem from './OrderItem';
import Card from '../../../commons/components/Card';
import Countdown from './CountDown';
import { RootStore } from '../../../interfaces/Commons';
import rootContext from '../../../commons/context.root';
import SelectFoodModal from '../../../commons/components/order-food/SelectFoodModal';
import createModalStore from '../../../commons/stores/authModalStores';

const Orders: React.FC = observer(() => {
  const { userStore } = useContext<RootStore>(rootContext);
  const [restaurants, setRestaurant] = useState<Restaurant[] | null>(null);
  const modalStore = useLocalStore(() => createModalStore(400, false));
  const mockApi = useMockApi('order');

  useEffect(() => {
    const fetchData = async () => {
      const result = await mockApi();
      setRestaurant(result);
    };
    fetchData();
  }, []);

  const orderFood = useCallback(
    (orderData: Restaurant) => {
      // eslint-disable-next-line no-console
      console.log(orderData, 'order item');
      modalStore.setModalOpen(true);
    },
    [restaurants]
  );

  const OrderItems =
    restaurants &&
    restaurants.map(order => {
      return (
        <div key={order.key} className='my-3'>
          <OrderItem onOrder={orderFood} order={order} />
        </div>
      );
    });

  return (
    <>
      <SelectFoodModal
        storeData={{ items: [], name: 'เพลินพุง Noodle & More' }}
        modalStore={modalStore}
      />
      <div>
        <div className='text-sm '>
          Ordering as{' '}
          <span className='font-extrabold'>{userStore.userInfo?.username}</span>
        </div>
        <Card className='m-4'>
          <p className='mb-4'>
            We have a lot of food for you to choose! We have partnered with
            restaurants on floor 4 and 5, and food stalls are available on floor
            8.
          </p>
          <p className='mb-4'>
            You can pick one restaurant or two food stalls. We recommend you to
            make your selection early because seatings are limited.
          </p>
          <p className='mb-4'>Please select your menu before time limit:</p>
          <Countdown className='flex justify-center text-3xl' />
        </Card>
        <div className='flex flex-col items-center'>
          <div className='w-64'>{OrderItems}</div>
        </div>
      </div>
    </>
  );
});

export default Orders;
