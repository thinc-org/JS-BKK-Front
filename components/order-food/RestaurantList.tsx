import Card from '../../commons/components/Card';

export interface IRestaurant {
  availableServings: number;
  name: {
    th: string;
    en: string;
  };
  description?: string;
  lastItem?: boolean;
}

export interface IRestaurantList {
  restaurants: IRestaurant[];
}

const ListItem = ({
  availableServings,
  name,
  description,
  lastItem
}: IRestaurant) => (
  <div
    className={`flex flex-row justify-between py-4 mx-4 ${!lastItem &&
      ' border-b border-grey'}`}
  >
    <div className='flex flex-col'>
      <p className='text-lg font-bold text-black'>{name.th}</p>
      <p className='text-lg text-grey'>{name.en}</p>
      {description && (
        <div
          className='text-normal'
          dangerouslySetInnerHTML={{
            __html: description
          }}
        />
      )}
    </div>
    <div className='flex'>
      <div className='font-bold text-bkk-blue'>{availableServings} left</div>
    </div>
  </div>
);

const RestaurantList = ({ restaurants }: IRestaurantList) => (
  <Card className='m-4' noPadding>
    {restaurants.map((restaurant: IRestaurant, index: number) => (
      <ListItem
        {...restaurant}
        lastItem={index === restaurants.length - 1}
      ></ListItem>
    ))}
  </Card>
);

export default RestaurantList;
