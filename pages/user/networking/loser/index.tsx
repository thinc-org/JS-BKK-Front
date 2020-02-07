import React from 'react';
import { observer } from 'mobx-react-lite';

import { withRequiredAuthentication } from '../../../../components/authentication';

const LoserUserProfile: React.FC = observer(() => {

  return (
    <div className='h-full flex flex-col'>
      
      <div className='h-full text-center w-full flex flex-col items-center justify-center'>
        <div className='max-w-small'>
          <div className='mb-5 text-2xl  font-extrabold text-center'>
            Timeout!!!
          </div>
          <div className='text-center'>
            <div className='text-lg'>
              Try again...
            </div>
            <div className='text-base '>
            JavaScript Bangkok 2.0.0
            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

export default withRequiredAuthentication(LoserUserProfile);
