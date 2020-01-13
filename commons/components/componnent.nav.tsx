import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { RouteData } from '../../interfaces/interface.commons';

interface PropTypes {
  routeData: RouteData;
}

const Nav: React.FC<PropTypes> = ({ routeData }) => {
  const router = useRouter();

  const goBack = useCallback(() => {
    router.push('/user/portal');
  }, []);
  return (
    <nav className='flex flex-row'>
      <button className='mr-1' onClick={goBack}>
        <img alt='arrow' src='/icons/arrow.svg' />
      </button>
      <div className='text-2xl font-bold'>{routeData.title}</div>
    </nav>
  );
};

export default Nav;
