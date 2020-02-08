import React from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import Button from '../../../../commons/components/Button';
import { withRequiredAuthentication } from '../../../../components/authentication';
import Card from '../../../../commons/components/Card';
import BadgeList from '../../../../components/networking/BadgeList';
import { useNetworking } from '../../../../commons/hooks/networkingHooks';

const MyBadge: React.FC = observer(() => {
  const network = useNetworking();
  return (
    <div>
      <Card className='flex flex-col items-center m-4 text-center p-5'>
        <p className='mb-4 font-bold text-xl'>Your badge is</p>
        <BadgeList id={network.data?.badge} />
        <p className='mb-8 mt-4'>
          There are 7 total badges. Please talk to other people and scan their
          QR code to obtain other 6 badges! The first 3 people will get the
          reward!
        </p>
        <img
          className='h-32 mb-5'
          src='/icons/scanQR.svg'
          alt='Scan QRCode instruction '
        />
        <Link href='/user/networking/dashboard'>
          <a className='w-full' href='/user/networking/dashboard'>
            <Button
              type='button'
              className='bg-yellow-dark w-full rounded px-4 py-2 text-lg mb-2'
            >
              Continue
            </Button>
          </a>
        </Link>
      </Card>
    </div>
  );
});

export default withRequiredAuthentication(MyBadge);
