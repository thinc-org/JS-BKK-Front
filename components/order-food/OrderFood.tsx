import { useMemo } from 'react';
import { useId } from 'react-id-generator';
import Card from '../../commons/components/Card';
import Button from '../../commons/components/Button';
import { RestaurantGroup, MyOrder } from '../../interfaces/Orders';
import ErrorMessage from '../../commons/components/ErrorMessage';
import FloorMap, { floor4, floor5 } from './FloorMap';

interface Props {
  className?: string;
  menu: RestaurantGroup[];
  myOrder: MyOrder;
  onChangeSelection: () => void;
}

const groupToFloorMap: {
  [title: string]: { title: string; mapData: React.ReactNode };
} = {
  'Floor 4: Restaurants': { title: 'Floor 4', mapData: floor4 },
  'Floor 5: Restaurants': { title: 'Floor 5', mapData: floor5 }
};

const OrderFood: React.FC<Props> = ({
  className,
  menu,
  myOrder,
  onChangeSelection
}) => {
  const restaurants = useMemo(() => menu.flatMap(m => m.choices), [menu]);
  const [headingId] = useId(1, 'OrderFood');

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

  const groupTitle = menu.find(r => r.choices.includes(restaurant))?.title;

  const renderTitle = (text: string) => {
    const m = String(text).match(/^([^]+)\s*?\(([^]+?)\)$/);
    if (m) {
      return (
        <>
          <span className='text-xl block'>{m[2]}</span>
          <span className='text-gray-700'>{m[1]}</span>
        </>
      );
    }
    return <span className='text-xl block'>{text}</span>;
  };
  const map = groupToFloorMap[groupTitle || ''];

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
                      {renderTitle(choice.title)}
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
          onClick={onChangeSelection}
        >
          Change your mind?
        </Button>
      </Card>
      {!!map && (
        <>
          <h1 className='text-white text-xl font-semibold mt-4 mb-2'>
            {map.title} Map
          </h1>
          <Card>
            <FloorMap map={map.mapData} highlight={restaurant.id} />
          </Card>
        </>
      )}
    </div>
  );
};

export default OrderFood;
