import { useMemo } from 'react';
import { useId } from 'react-id-generator';
import Card from '../../commons/components/Card';
import Button from '../../commons/components/Button';
import useMyOrder from '../../commons/hooks/useMyOrder';
import { RestaurantGroup } from '../../interfaces/Orders';
import {
  isFetchingFailed,
  isFetchingCompleted
} from '../../interfaces/Commons';
import ErrorMessage from '../../commons/components/ErrorMessage';

interface Props {
  className?: string;
  menu: RestaurantGroup[];
}

const OrderFood: React.FC<Props> = ({ className, menu }) => {
  const myOrderFetchStatus = useMyOrder();
  const restaurants = useMemo(() => menu.flatMap(m => m.choices), [menu]);
  const [headingId] = useId(1, 'OrderFood');

  if (isFetchingFailed(myOrderFetchStatus)) {
    return <ErrorMessage error={myOrderFetchStatus.error} />;
  }
  if (!isFetchingCompleted(myOrderFetchStatus)) {
    return <div>(Loading my food selection)</div>;
  }
  const myOrder = myOrderFetchStatus.data;
  if (!myOrder) {
    return <div>(No food selection yet)</div>;
  }

  const restaurant = restaurants.find(r => r.id === myOrder.restaurantId);
  if (!restaurant) {
    return (
      <ErrorMessage
        error={
          new Error(`Cannot find restaurant with ID: ${myOrder.restaurantId}`)
        }
      />
    );
  }

  return (
    <div className={className}>
      <h1 className='text-white text-xl font-semibold my-2' id={headingId}>
        Your Food Selection
      </h1>
      <Card className='flex flex-col' aria-labelledby={headingId}>
        <h2
          className='flex justify-center font-bold'
          data-testid='selected-restaurant-title'
        >
          {restaurant.title}
        </h2>
        {restaurant.customizations.map(customization => {
          return (
            <div className='my-4' key={customization.id}>
              <span className='text-gray-600'>{customization.title}:</span>
              {customization.choices
                .filter(c =>
                  (myOrder.customizations[customization.id] || []).includes(
                    c.id
                  )
                )
                .map(choice => {
                  return (
                    <p className='font-bold' key={choice.id}>
                      {choice.title}
                    </p>
                  );
                })}
            </div>
          );
        })}
        <Button
          type='button'
          className='bg-yellow-dark rounded p-2 m-4 text-xl'
          aria-label='Change your lunchtime meal selection'
        >
          Change your mind?
        </Button>
      </Card>
    </div>
  );
};

export default OrderFood;
