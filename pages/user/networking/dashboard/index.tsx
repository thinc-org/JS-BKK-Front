import { observer } from 'mobx-react-lite';
import QRCode from 'qrcode.react';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Webcam from 'react-webcam';
import Button from '../../../../commons/components/Button';
import rootContext from '../../../../commons/context.root';
import { withRequiredAuthentication } from '../../../../components/authentication';
import { RootStore } from '../../../../interfaces/Commons';
import BadgeItem from './Badge';
import addUserToNetwork, {
  createNetworkingProfile,
  useNetworking
} from '../../../../commons/hooks/networkingHooks';

const Loading: React.FC<{}> = () => <div>...Loading</div>;

const Dashboard: React.FC = observer(() => {
  const { userStore } = useContext<RootStore>(rootContext);
  const { firstname, lastname } = userStore.userInfo || {};
  const router = useRouter();
  const [isCameraOpen, openCamera] = useState(false);
  const network = useNetworking();

  if (network.status === 'notRegistered') {
    router.push('/user/networking/welcome');
  }

  const isLoading = network.status === 'loading';

  // const BadgeItems = useMemo(
  //   () => (
  //     <div className='flex overflow-x-auto'>
  //       {currentBadge &&
  //         badges &&
  //         [currentBadge, ...badges].map(
  //           badge =>
  //             badge && (
  //               <BadgeItem
  //                 key={`badge-${badge.owner}-${badge.type}`}
  //                 owner={badge.owner}
  //                 type={badge.type}
  //               />
  //             )
  //         )}
  //     </div>
  //   ),
  //   [currentBadge, badges]
  // );

  return (
    <div className={`px-10 ${isLoading ? 'hidden' : ''}`}>
      <span className='text-gray-500'>
        {firstname} {lastname}
      </span>
      <div className='flex justify-center  items-center my-16'>
        <div>
          <div className='bg-gray-200 align-bottom w-64 h-40  justify-center items-end'>
            {isCameraOpen ? <Webcam /> : <div>QR code</div>}
            <div className={!isCameraOpen ? 'mt-24' : 'mt-1'}>
              <div className='border border-yellow-dark px-2 mx-4 mb-2  flex rounded'>
                <div className='px-2 py-2 ml-1 my-1 mr-2  rounded bg-yellow-dark' />
                <Button
                  className='font-semibold'
                  type='button'
                  onClick={() => {
                    openCamera(!isCameraOpen);
                  }}
                >
                  {isCameraOpen ? (
                    <div>Close Camera</div>
                  ) : (
                    <div>Open Camera</div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className='text-white font-semibold'>Total Badge</div>
      <div className='mt-12'>
        <div className='text-white font-semibold'>Your new Friends</div>
        <div className='mt-4 px-24 py-8 bg-white rounded-t'>
          Firstname Lastname
        </div>
        <div className=' px-24 py-8 bg-white rounded-b'>Firstname Lastname</div>
        <button
          className='text-white font-semibold'
          onClick={() => addUserToNetwork('test04')}
        >
          No idea? Here are some questions!
        </button>
        <ul className='pl-16 '>
          <li>
            <span className='block py-1 text-white font-semibold'>
              Where do you work?
            </span>
          </li>
          <li>
            <span className='block py-1 text-white font-semibold'>
              What is your stack?
            </span>
          </li>
          <li>
            <span className='block py-1 text-white font-semibold'>...</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default withRequiredAuthentication(Dashboard);
