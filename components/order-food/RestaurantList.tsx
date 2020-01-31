import { useContext } from 'react';
import Card from '../../commons/components/Card';
import { Restaurant } from '../../interfaces/Orders';
import { currentMenuContext } from '../../pages/user/order';

interface ListItemProps {
  lastItem: boolean;
  restaurant: Restaurant;
}

const ListItem: React.FC<ListItemProps> = ({ lastItem, restaurant }) => {
  const { title, availability, info } = restaurant;
  const { orderFood } = useContext(currentMenuContext);
  return (
    <div
      role='button'
      tabIndex={0}
      onKeyDown={e => e.keyCode === 13 && orderFood(restaurant)}
      onClick={() => orderFood(restaurant)}
      className={`cursor-pointer flex flex-row justify-between py-4 mx-4 ${!lastItem &&
        ' border-b border-grey'}`}
    >
      <div className='flex flex-col'>
        <p
          className='text-lg font-bold text-black'
          aria-label='Restaurant title'
        >
          {title}
        </p>
        {info && <div className='text-normal'>{info}</div>}
      </div>
      <div className='flex'>
        <div className='font-bold text-bkk-blue whitespace-no-wrap'>
          {availability} left
        </div>
      </div>
    </div>
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
