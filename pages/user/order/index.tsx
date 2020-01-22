import React, { useContext, useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { rootContext } from '../../_app';
import useMockApi from '../../../commons/hooks/hook.mock-api';
import { Order } from '../../../interfaces/interface.order';
import OrderItem from './component.order-item';
import Card from '../../../commons/components/Card';
import Countdown from './countDown';
import { RootStore } from '../../../interfaces/interface.commons';

const Orders: React.FC = observer(() => {
  const { userStore } = useContext<RootStore>(rootContext);
  const [orders, setOrders] = useState<Order[] | undefined | null>();
  const mockApi = useMockApi('order');

  useEffect(() => {
    const fetchData = async () => {
      const result = await mockApi();
      setOrders(result);
    };
    fetchData();
  }, []);

  const orderFood = useCallback(
    (orderData: Order) => {
      // eslint-disable-next-line no-console
      console.log(orderData, 'order item');
    },
    [orders]
  );

  const OrderItems =
    orders &&
    orders.map(order => {
      return (
        <div key={order.key} className='my-3'>
          <OrderItem onOrder={orderFood} order={order} />
        </div>
      );
    });

  return (
    <div>
      <div className='text-sm '>
        Ordering as{' '}
        <span className='font-bold'>{userStore.userInfo?.username}</span>
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
  );
});

export default Orders;
