import React, { useContext, useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { rootContext } from '../../_app';
import { UserStore } from '../../../interfaces/interface.user';
import useMockApi from '../../../commons/hooks/hook.mock-api';
import { Order } from '../../../interfaces/interface.order';
import OrderItem from './component.order-item';

const UserProfile: React.FC = observer(() => {
  const { userStore } = useContext<{ userStore: UserStore }>(rootContext);
  const [orders, setOrders] = useState<Order[] | undefined | null>();
  const mockApi = useMockApi('order');

  useEffect(() => {
    const fetchData = async () => {
      const result = await mockApi();
      setOrders(result);
    };
    fetchData();
  }, []);

  
  const orderFood = useCallback((orderData: Order) => {
    // eslint-disable-next-line no-console
    console.log(orderData, 'order item')
  }, [orders])

  const OrderItems =
    orders &&
    orders.map(order => {
      return (
        <div className='my-3' key={order.key}>
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

export default UserProfile;
