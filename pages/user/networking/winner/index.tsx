import React from 'react';
import { observer } from 'mobx-react-lite';

import { withRequiredAuthentication } from '../../../../components/authentication';
import Card from '../../../../commons/components/Card';

const UserProfile: React.FC = () => {
  return (
    <div className='w-full flex flex-col m-4 text-center'>
      <Card className='text-center w-full flex flex-col items-center justify-center'>
        <div className='mb-5 text-2xl font-bold '>
          Congratulations! <br /> You are the winner.
        </div>
        <div>
          Please <span className='font-extrabold'>claim your reward </span>{' '}
          <br />
          at the information desk.
        </div>
      </Card>
    </div>
  );
};

export default withRequiredAuthentication(UserProfile);
