import React, { useContext, useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { rootContext } from '../../_app';
import { UserStore } from '../../../interfaces/interface.user';
import useMockApi from '../../../commons/hooks/hook.mock-api';
import { Order } from '../../../interfaces/interface.order';
import OrderItem from './component.order-item';
import { Schedule } from '../../../interfaces/interface.schedule';

const Orders: React.FC = observer(() => {
  const { userStore } = useContext<{ userStore: UserStore, scheduleStore: any[]}>(rootContext);
  const [orders, setOrders] = useState<Order[] | Schedule[] | undefined | null>();
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
    (orders as any)?.map((order: any) => {
      return (
        <div key={order.key} className='my-3'>
          <OrderItem onOrder={orderFood} order={order} />
        </div>
      );
    });

  return (
    <div>
      <div className='text-sm'>
        Ordering as{' '}
        <span className='font-bold'>{userStore.userInfo?.username}</span>
      </div>
      <div className='flex flex-col items-center'>
        <div className='w-64'>{OrderItems}</div>
      </div>
    </div>
  );
});

export default Orders;
