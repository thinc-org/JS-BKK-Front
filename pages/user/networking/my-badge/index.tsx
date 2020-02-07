import React from 'react';
import { observer } from 'mobx-react-lite';

import Button from '../../../../commons/components/Button';
import { withRequiredAuthentication } from '../../../../components/authentication';
import Card from '../../../../commons/components/Card';

const MyBadge: React.FC = observer(() => {
  return (
    <div>
      <Card className='flex flex-col items-center m-4 text-center p-5'>
        <p className='mb-8'>Your badge is</p>
        <img className='h-32 mb-4' src='/icons/myBadge.svg' alt='My Badge' />
        <p className='mb-6'>
          There are 7 total badges. Please talk to other people and scan their
          QR code to obtain other 6 badges! The first 3 people will get the
          reward!
        </p>
        <img
          className='h-32 mb-5'
          src='/icons/scanQR.svg'
          alt='Scan QRCode instruction '
        />
        <Button
          type='button'
          className='bg-yellow-dark w-full rounded px-4 py-3 m-4 text-lg'
        >
          Submit
        </Button>
      </Card>
    </div>
  );
});

export default withRequiredAuthentication(MyBadge);
