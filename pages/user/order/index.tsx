import { observer, useLocalStore } from 'mobx-react-lite';
import React, {
  useCallback,
  useContext,
  useMemo,
  createContext,
  useState
} from 'react';
import Card from '../../../commons/components/Card';
import OrderFood from '../../../components/order-food/OrderFood';
import { Restaurant, CurrentMenuContext } from '../../../interfaces/Orders';
import Countdown from '../../../components/order-food/CountDown';
import {
  RootStore,
  isFetchingFailed,
  isFetchingCompleted
} from '../../../interfaces/Commons';
import rootContext from '../../../commons/context.root';
import SelectFoodModal from '../../../components/order-food/SelectFoodModal';
import createModalStore from '../../../commons/stores/authModalStores';
import useOrders from '../../../commons/hooks/useOrders';
import RestaurantList from '../../../components/order-food/RestaurantList';
import { withRequiredAuthentication } from '../../../components/authentication';
import ErrorMessage from '../../../commons/components/ErrorMessage';

export const currentMenuContext = createContext<CurrentMenuContext>({
  orderFood: () => {}
});

const Orders: React.FC = observer(() => {
  const { userStore } = useContext<RootStore>(rootContext);
  const modalStore = useLocalStore(() => createModalStore(400, false));
  const menuFetchResult = useOrders();
  const { data } = menuFetchResult;
  const [currentMenu, setCurrentMenu] = useState();

  const orderFood = useCallback(
    (orderData: Restaurant) => {
      setCurrentMenu(orderData);
      modalStore.setModalOpen(true);
    },
    [data]
  );

  const restaurantGroupList = useMemo(() => {
    return data?.map(group => {
      return (
        <div key={group.title} className='my-3 mx-4'>
          <h4 className='text-white text-lg mb-4'>{group.title}</h4>
          <RestaurantList restaurants={group.choices} />
        </div>
      );
    });
  }, [data]);

  if (isFetchingFailed(menuFetchResult)) {
    return <ErrorMessage error={menuFetchResult.error} />;
  }
  if (!isFetchingCompleted(menuFetchResult)) {
    return <span>Loading food menu...</span>;
  }

  return (
    <>
      <SelectFoodModal menuChoice={currentMenu} modalStore={modalStore} />
      <div>
        <div className='text-sm'>
          Ordering as{' '}
          <span className='font-extrabold'>{userStore.userInfo?.name}</span>
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
        <OrderFood className='m-4' menu={menuFetchResult.data} />
        <div className='flex flex-col items-center'>
          <h3 className='w-full px-4 text-white text-xl font-bold'>
            Select your lunch
          </h3>
          <currentMenuContext.Provider value={{ orderFood }}>
            {restaurantGroupList}
          </currentMenuContext.Provider>
        </div>
      </div>
    </>
  );
});

export default withRequiredAuthentication(Orders);
