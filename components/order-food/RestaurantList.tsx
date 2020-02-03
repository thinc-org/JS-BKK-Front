import { Button } from 'reakit/Button';
import { useContext, useMemo } from 'react';
import { useId } from 'react-id-generator';
import Card from '../../commons/components/Card';
import { Restaurant } from '../../interfaces/Orders';
import { currentMenuContext } from '../../pages/user/order';
import useRestaurantAvailability from './FoodAvailabilityHooks';
import { isFetchingCompleted } from '../../interfaces/Commons';

interface ListItemProps {
  lastItem: boolean;
  restaurant: Restaurant;
}

const ListItem: React.FC<ListItemProps> = ({ lastItem, restaurant }) => {
  const { title, info } = restaurant;
  const { orderFood } = useContext(currentMenuContext);
  const [titleId] = useId(1, 'RestaurantListItem');
  const availabilityState = useRestaurantAvailability(restaurant);
  const isDisabled = !(availabilityState.data && availabilityState.data > 0);
  const availabilityText = useMemo(() => {
    if (!isFetchingCompleted(availabilityState)) {
      return <>…</>;
    }
    const availability = availabilityState.data;
    return (
      <>
        <span data-testid='restaurant-availability'>{availability}</span> left
      </>
    );
  }, [availabilityState]);
  return (
    <Button
      as='div'
      role='button'
      onClick={() => orderFood(restaurant)}
      className={`cursor-pointer flex flex-row justify-between py-4 mx-4 ${!lastItem &&
        ' border-b border-grey'} ${isDisabled ? 'opacity-25' : ''}`}
      data-testid='restaurant-item'
      disabled={isDisabled}
    >
      <div className='flex flex-col'>
        <h3
          className='text-lg font-bold text-black'
          data-testid='restaurant-title'
          id={titleId}
        >
          {title}
        </h3>
        {info && <div className='text-normal'>{info}</div>}
      </div>
      <div className='flex ml-4'>
        <div className='font-bold text-bkk-blue whitespace-no-wrap'>
          {availabilityText}
        </div>
      </div>
    </Button>
  );
};

const RestaurantList: React.FC<{ restaurants: Restaurant[] }> = ({
  restaurants
}) => {
  return (
    <Card noPadding>
      {restaurants.map((restaurant, index) => (
        <ListItem
          restaurant={restaurant}
          key={restaurant.id}
          lastItem={index === restaurants.length - 1}
        />
      ))}
    </Card>
  );
};

export default RestaurantList;
