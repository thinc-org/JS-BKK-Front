import React from 'react';
import { RouteData } from '../../interfaces/interface.commons';

interface PropTypes {
  routeData: RouteData;
}

const Viewing: React.FC<PropTypes> = ({ routeData }) => {
  return (
    <nav className='flex flex-row justify-center items-center'>
      <div className='text-4xl font-sans py-24'>
        {routeData.title}
      </div>
    </nav>
  );
};

export default Viewing;
