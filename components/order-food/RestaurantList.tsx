import { Button } from 'reakit/Button';
import { useContext } from 'react';
import Card from '../../commons/components/Card';
import { Restaurant } from '../../interfaces/Orders';
import { currentMenuContext } from '../../pages/user/order';
import { useId } from 'react-id-generator';

interface ListItemProps {
  lastItem: boolean;
  restaurant: Restaurant;
}

const ListItem: React.FC<ListItemProps> = ({ lastItem, restaurant }) => {
  const { title, availability, info } = restaurant;
  const { orderFood } = useContext(currentMenuContext);
  const [titleId] = useId(1, 'RestaurantListItem');
  return (
    <Button
      as='div'
      role='button'
      onClick={() => orderFood(restaurant)}
      className={`cursor-pointer flex flex-row justify-between py-4 mx-4 ${!lastItem &&
        ' border-b border-grey'}`}
      data-testid='restaurant-item'
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
      <div className='flex'>
        <div className='font-bold text-bkk-blue whitespace-no-wrap'>
          <span data-testid='restaurant-availability'>{availability}</span> left
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
