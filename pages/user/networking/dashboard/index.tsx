import { observer } from 'mobx-react-lite';
import QRCode from 'qrcode.react';
import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Button from '../../../../commons/components/Button';
import rootContext from '../../../../commons/context.root';
import { withRequiredAuthentication } from '../../../../components/authentication';
import { RootStore } from '../../../../interfaces/Commons';
import BadgeItem from './Badge';
import addUserToNetwork, {
  useNetworking
} from '../../../../commons/hooks/networkingHooks';
import Card from '../../../../commons/components/Card';
import BadgeList from '../../../../commons/components/BadgeList';

const Loading: React.FC<{}> = () => <div>...Loading</div>;

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <Loading />
});

const Dashboard: React.FC = observer(() => {
  // const { userStore } = useContext<RootStore>(rootContext);
  // const { firstname, lastname } = userStore.userInfo || {};
  const router = useRouter();
  const [isCameraOpen, openCamera] = useState(false);
  const network = useNetworking();
  const [scanResult, setScanResult] = useState<string>();

  useEffect(() => {
    if (network.status === 'notRegistered') {
      router.push('/user/networking/welcome');
    } else if (network.hasAllwinner === true) {
      router.push('/user/networking/winner');
    }
  }, [network.status]);

  const isLoading = network.status === 'loading';

  const handleScan = (data: string | null) => {
    if (data) {
      setScanResult(data);
    }
  };
  // handleError = err => {
  //   setScanError(err);
  // };
  const networks = network.data?.networks;
  const BadgeItems = useMemo(() => {
    const onlyUnique = (value: number, index: number, self: number[]) => {
      return self.indexOf(value) === index;
    };
    return (
      <div className='flex overflow-x-auto'>
        {networks
          ?.map(_network => _network.badge)
          ?.filter(onlyUnique)
          ?.map(badge => badge && <BadgeList key={badge} id={badge} />)}
      </div>
    );
  }, [networks]);

  return (
    <div className={`m-4 ${isLoading ? 'hidden' : ''}`}>
      <div className='flex justify-center w-full items-center'>
        {scanResult}
        <Card className='flex w-full items-center text-lg flex-col font-bold justify-center items-end'>
          {isCameraOpen ? (
            <div className='w-full h-full mb-4'>
              <QrReader
                delay={300}
                onError={() => {}}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
            </div>
          ) : (
            <>
              <div>Your QR code is</div>
              <div className='my-4'>
                <QRCode value={`${network.uuid}`} />
              </div>
            </>
          )}
          <Button
            className='text-yellow-dark border-2 border-yellow-dark py-1 px-3 mb-1 flex items-center rounded-lg'
            type='button'
            onClick={() => {
              openCamera(!isCameraOpen);
            }}
          >
            <div className='w-5 h-5 ml-1 my-1 mr-2 bg-yellow-dark' />
            {isCameraOpen ? 'Close Camera' : 'Open Camera'}
          </Button>
        </Card>
      </div>
      <div className='text-white text-lg font-bold'>Total Badge</div>
      {BadgeItems}
      <div className='mt-12'>
        <div className='text-white text-lg font-bold'>Your new Friends</div>
        <div className='mt-4 px-24 py-8 bg-white rounded-t'>
          Firstname Lastname
        </div>
        <div className=' px-24 py-8 bg-white rounded-b'>Firstname Lastname</div>
      </div>
    </div>
  );
});

export default withRequiredAuthentication(Dashboard);
