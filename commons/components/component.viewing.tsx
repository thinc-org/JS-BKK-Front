import React from 'react';
import { RouteData } from '../../interfaces/interface.commons';

interface PropTypes {
  routeData: RouteData;
}

const Viewing: React.FC<PropTypes> = ({ routeData }) => {
  return (
    <nav className=''>
      <div className='text-h font-bold'>
        {routeData.title}
      </div>
    </nav>
  );
};

export default Viewing;
