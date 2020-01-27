import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Card from '../../../commons/components/Card';
import useMockApi from '../../../commons/hooks/hook.mock-api';
import RestaurantList, {
  IRestaurant
} from '../../../components/order-food/RestaurantList';
import { RootStore } from '../../../interfaces/interface.commons';
import { Order } from '../../../interfaces/interface.order';
import { rootContext } from '../../_app';
import OrderItem from './component.order-item';
import Countdown from './countDown';

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

  const temp: IRestaurant[] = [
    {
      name: {
        th: 'I am Thai Pasta',
        en: 'I am Thai Pasta'
      },
      availableServings: 100
    },
    {
      name: {
        th: 'เพลินพุง Noodle & More',
        en: 'เพลินพุง Noodle & More'
      },
      availableServings: 100
    },
    {
      name: {
        th: 'Hua Seng Hong',
        en: 'Hua Seng Hong'
      },
      availableServings: 0,
      description:
        'Casual rice and noodle dishes<br>- Crispy Pork or Chicken Omelette with Ham and Rice<br>- Tom Yum Minced Pork Omelette with Rice<br>- Tom Yum Goong (Shrimp) Omelette with Rice'
    }
  ];

  return (
    <div>
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
      <RestaurantList restaurants={temp} />
    </div>
  );
});

export default Orders;
