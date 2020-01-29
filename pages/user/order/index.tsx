import React, { useContext, useState, useCallback } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Choice } from '../../../interfaces/Orders';
import OrderItem from './OrderItem';
import Card from '../../../commons/components/Card';
import Countdown from '../../../commons/components/order-food/CountDown';
import { RootStore } from '../../../interfaces/Commons';
import rootContext from '../../../commons/context.root';
import SelectFoodModal from '../../../commons/components/order-food/SelectFoodModal';
import createModalStore from '../../../commons/stores/authModalStores';
import useOrders from '../../../commons/hooks/useOrders';

const Orders: React.FC = observer(() => {
  const { userStore } = useContext<RootStore>(rootContext);
  const modalStore = useLocalStore(() => createModalStore(400, false));
  const { data } = useOrders();
  const [currentMenu, setCurrentMenu] = useState();

  const orderFood = useCallback(
    (orderData: Choice) => {
      setCurrentMenu(orderData);
      modalStore.setModalOpen(true);
    },
    [data]
  );

  const OrderItems =
    data &&
    data.map(restaurant => {
      const restaurantChoices = restaurant.choices.map(choice => (
        <OrderItem
          key={choice.id}
          onOrder={() => orderFood(choice)}
          order={choice}
        />
      ));
      return (
        <div key={restaurant.title} className='my-3'>
          {restaurant.title}
          <div>{restaurantChoices}</div>
        </div>
      );
    });

  return (
    <>
      <SelectFoodModal menuChoice={currentMenu} modalStore={modalStore} />
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
