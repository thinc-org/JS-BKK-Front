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
import Countdown, {
  useCurrentTime
} from '../../../components/order-food/CountDown';
import {
  RootStore,
  isFetchingFailed,
  isFetchingCompleted,
  ModalType
} from '../../../interfaces/Commons';
import rootContext from '../../../commons/context.root';
import SelectFoodModal from '../../../components/order-food/SelectFoodModal';
import createModalStore from '../../../commons/stores/authModalStores';
import useOrders from '../../../commons/hooks/useOrders';
import RestaurantList from '../../../components/order-food/RestaurantList';
import {
  withRequiredAuthentication,
  useAuthenticationState
} from '../../../components/authentication';
import ErrorMessage from '../../../commons/components/ErrorMessage';
import useMyOrder from '../../../commons/hooks/useMyOrder';
import Button from '../../../commons/components/Button';
import Loading from '../../../commons/components/Loading';
import {
  FirebaseModule,
  useFirestoreSnapshot
} from '../../../commons/firebase';

export const currentMenuContext = createContext<CurrentMenuContext>({
  orderFood: () => {}
});

const Orders: React.FC = observer(() => {
  const modalStore = useLocalStore(() => createModalStore(400, false));

  const [mindChanged, setMindChanged] = useState(false);
  const changeMind = useCallback(() => setMindChanged(true), []);
  const unchangeMind = useCallback(() => setMindChanged(false), []);
  const myOrderFetchStatus = useMyOrder();
  const menuFetchResult = useOrders();

  const { data: foodConfiguration } = menuFetchResult;
  const data = foodConfiguration?.menu?.groups;
  const [currentMenu, setCurrentMenu] = useState<Restaurant>();
  const orderFood = useCallback((orderData: Restaurant) => {
    setCurrentMenu(orderData);
    modalStore.setModalType(ModalType.normal);
    modalStore.setModalOpen(true);
  }, []);
  const restaurantGroupList = useMemo(() => {
    return data?.map(group => {
      return (
        <div key={group.title} className='my-3 mx-4'>
          <h2 className='text-white text-lg mb-4'>{group.title}</h2>
          <RestaurantList restaurants={group.choices} />
        </div>
      );
    });
  }, [data]);

  if (isFetchingFailed(menuFetchResult)) {
    return <ErrorMessage error={menuFetchResult.error} />;
  }
  if (!isFetchingCompleted(menuFetchResult)) {
    return <Loading message='Loading menu' color='light' />;
  }
  if (isFetchingFailed(myOrderFetchStatus)) {
    return <ErrorMessage error={myOrderFetchStatus.error} />;
  }
  if (!isFetchingCompleted(myOrderFetchStatus)) {
    return <Loading message='Loading your selection' color='light' />;
  }

  const { orderingPeriodEndTime } = menuFetchResult.data;
  const myOrder = myOrderFetchStatus.data;
  return (
    <>
      <SelectFoodModal
        menuChoice={currentMenu}
        modalStore={modalStore}
        onFinish={unchangeMind}
      />
      <div>
        {myOrder && !mindChanged ? (
          <OrderFood
            className='m-4'
            menu={menuFetchResult.data.menu.groups}
            myOrder={myOrder}
            onChangeSelection={changeMind}
          />
        ) : (
          <div className='flex flex-col'>
            {myOrder ? (
              <Button
                type='button'
                className='bg-yellow-dark rounded p-2 m-4 text-xl'
                onClick={unchangeMind}
              >
                Back to my selection
              </Button>
            ) : null}

            <Card className='m-4'>
              <p className='mb-4'>
                We have a lot of food for you to choose! We have partnered with
                restaurants on floor 4 and 5, and food stalls are available on
                floor 8.
              </p>
              <p className='mb-4'>
                You can pick one restaurant or two food stalls. We recommend you
                to make your selection early because seatings are limited.
              </p>
              <p className='mb-4'>Please select your menu before time limit:</p>
              <div
                className='flex justify-center text-3xl'
                data-testid='food-ordering-countdown-timer'
              >
                <Countdown due={orderingPeriodEndTime} />
              </div>
            </Card>

            <DietaryRestrictionContainer />

            <MealTimeLimitCurtain
              due={orderingPeriodEndTime}
              fallback={<TimeIsUp />}
            >
              <h1 className='text-white text-xl font-semibold my-2 mx-4'>
                Select your lunch
              </h1>
              <currentMenuContext.Provider value={{ orderFood }}>
                {restaurantGroupList}
              </currentMenuContext.Provider>
            </MealTimeLimitCurtain>
          </div>
        )}
      </div>
    </>
  );
});

const MealTimeLimitCurtain: React.FC<{
  due: number;
  fallback: React.ReactNode;
  children: React.ReactNode;
}> = ({ due, fallback, children }) => {
  const time = useCurrentTime();
  return <>{time && time > due ? fallback : children}</>;
  // return <>{fallback}</>;
};

const TimeIsUp = () => (
  <>
    <Card className='m-4'>
      <div className='font-bold text-bkk-nak text-center'>
        <span className='text-lg'>
          Meal selection is finished
          <br />
        </span>
        <span className='text-bg text-black'>
          If you need further assistance, please contact our staff.
        </span>
      </div>
    </Card>
  </>
);

const DietaryRestrictionContainer: React.FC<{}> = () => {
  const authenticationState = useAuthenticationState();
  if (!isFetchingCompleted(authenticationState) || !authenticationState.data) {
    return null;
  }
  return (
    <>
      {authenticationState.data.profile.ticketType === 'Event Staff' && (
        <div className='border-2 border-yellow-dark rounded-lg bg-yellow-light p-4 m-4'>
          <h2 className='text-lg font-bold'>You are an event staff!</h2>
          Hello awesome staffs! We’ve got a separate lunctime meal for you.{' '}
          <strong>Please don’t make any food selection</strong> except for
          testing. All selections made by staffs will be cleared out.
        </div>
      )}
      <DietaryRestrictionConnector
        referenceCode={authenticationState.data.profile.referenceCode}
      >
        {result => {
          if (result) {
            return (
              <div className='border-2 border-yellow-dark rounded-lg bg-yellow-light p-4 m-4'>
                <h2 className='text-lg font-bold'>Dietary Restrictions Note</h2>
                Our record shows that you have specified your dietary
                restrictions as “<strong>{result}</strong>” which may not be on
                the below lunch menu, or is not available in abundance.
                Therefore, we’ve prepared a lunchtime meal for you. Please
                contact our staff at lunchtime for assistance. (Don’t have to
                make a selection here.)
              </div>
            );
          }
          return null;
        }}
      </DietaryRestrictionConnector>
    </>
  );
};

const DietaryRestrictionConnector: React.FC<{
  referenceCode: string;
  children: (result: string) => React.ReactNode;
}> = ({ children, referenceCode }) => {
  const getDocument = useCallback(
    (firebase: FirebaseModule) =>
      firebase
        .getEnvDoc()
        .collection('dietaryRestrictions')
        .doc(referenceCode),
    [referenceCode]
  );
  const snapshotFetchResult = useFirestoreSnapshot(getDocument);
  if (!isFetchingCompleted(snapshotFetchResult)) {
    return null;
  }
  return <>{children(snapshotFetchResult.data.get('info'))}</>;
};

export default withRequiredAuthentication(Orders);
