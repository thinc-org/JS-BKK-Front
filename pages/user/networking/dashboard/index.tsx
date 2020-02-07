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
  // const [scanResult, setScanResult] = useState<string>();

  useEffect(() => {
    if (network.status === 'notRegistered') {
      router.push('/user/networking/welcome');
    } else if (network.hasAllWinner === true) {
      console.log('push');
      router.push('/user/networking/winner');
    }
    console.log(
      network,
      'effect',
      network.hasAllWinner === true,
      network.hasAllWinner
    );
  }, [network.status]);

  const isLoading = network.status === 'loading';

  const handleScan = (data: string | null) => {
    if (data) {
      addUserToNetwork(data);
      openCamera(false);
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
    console.log(networks, 'networks', network);
    return (
      <div className='flex overflow-x-auto'>
        {networks
          ?.map(_network => _network.badge)
          ?.filter(onlyUnique)
          ?.map(
            (badge, i) =>
              badge && (
                <div className={`${i === 0 ? '' : 'ml-2'}`}>
                  <BadgeList key={badge} id={badge} />
                </div>
              )
          )}
      </div>
    );
  }, [networks]);

  return (
    <div className={`m-4 ${isLoading ? 'hidden' : ''}`}>
      <div className='flex justify-center w-full items-center'>
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
      <div className='flex'>
        {BadgeItems}
        {/* <div>
          <svg
            width='41'
            height='47'
            viewBox='0 0 41 47'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M20.2225 0.302856L0 11.9771V35.3257L20.2225 47L40.4417 35.3257V11.9771L20.2225 0.302856ZM37.6658 21.3166L35.3244 23.6579L37.6658 25.9992V33.7626L31.6924 37.213L28.5015 36.3569L27.6453 39.5479L20.1511 43.8739L12.6601 39.5479L11.804 36.3569L8.61303 37.213L2.63968 33.7626V26.0057L4.98751 23.6579L2.63968 21.3101V13.5402L8.5806 10.1093L8.57735 10.1287L11.7878 10.9881L12.6471 7.77764L12.6277 7.77115L20.1511 3.42897L27.6616 7.76467L27.6162 7.77764L28.4755 10.9881L31.6859 10.1287L31.673 10.0833L37.6593 13.5402V21.3166H37.6658Z'
              fill='#F7D456'
            />
            <path
              d='M25.8812 19.5492H24.3182V17.9862L20.19 13.858L16.0619 17.9862V19.5492H14.4988L10.3739 23.6774L14.4988 27.8023H16.0619V29.3654L20.19 33.4935L24.3182 29.3654V27.8023H25.8812L30.0094 23.6742L25.8812 19.5492ZM19.6387 24.4687C19.6387 24.8902 19.5415 25.2664 19.3469 25.6004C19.1523 25.9344 18.8832 26.1971 18.5394 26.3884C18.1957 26.5798 17.8065 26.6738 17.372 26.6738C16.9472 26.6738 16.5613 26.5927 16.2175 26.4306C15.8738 26.2684 15.6079 26.0447 15.4133 25.7626C15.2187 25.4804 15.1214 25.1594 15.1214 24.8059C15.1214 24.5692 15.222 24.4038 15.4198 24.3098C15.6176 24.2157 15.8997 24.1671 16.2564 24.1671C16.2402 24.2676 16.2305 24.3973 16.2305 24.553C16.2305 24.9162 16.3278 25.1983 16.5224 25.3961C16.7169 25.5939 16.9991 25.6912 17.3687 25.6912C17.7319 25.6912 18.0141 25.5842 18.2119 25.3767C18.4097 25.1659 18.507 24.8643 18.507 24.4719V21.6863H17.6574C17.3947 21.6863 17.1969 21.6052 17.0672 21.4463C16.9374 21.2874 16.8726 21.041 16.8726 20.7102H19.0875C19.2399 20.7102 19.3663 20.7588 19.4734 20.8561C19.5804 20.9534 19.6323 21.0766 19.6323 21.2226V24.4687H19.6387ZM24.9635 25.8793C24.7689 26.1355 24.4933 26.3301 24.1366 26.4695C23.7799 26.6057 23.3648 26.6738 22.8881 26.6738C22.3822 26.6738 21.9412 26.6122 21.565 26.489C21.1888 26.3657 20.9002 26.1906 20.7024 25.9636C20.5046 25.7366 20.4041 25.4707 20.4041 25.1691C20.4041 24.7086 20.7154 24.4784 21.338 24.4784C21.3607 24.9064 21.5034 25.2275 21.7725 25.448C22.0385 25.6653 22.4146 25.7755 22.8978 25.7755C23.2967 25.7755 23.6048 25.7074 23.8253 25.5712C24.0425 25.435 24.1528 25.2405 24.1528 24.994C24.1528 24.8319 24.1106 24.6989 24.0263 24.5951C23.942 24.4914 23.7993 24.3973 23.5983 24.3162C23.3972 24.2352 23.1021 24.1541 22.713 24.0698C22.1617 23.9401 21.7304 23.7974 21.4126 23.6417C21.0948 23.4861 20.8678 23.2947 20.7251 23.0742C20.5857 22.8537 20.5143 22.5748 20.5143 22.2441C20.5143 21.923 20.6084 21.6441 20.7964 21.4009C20.9845 21.1609 21.2504 20.9729 21.5974 20.8367C21.9412 20.7005 22.34 20.6356 22.7876 20.6356C23.2189 20.6356 23.6048 20.694 23.9453 20.8075C24.2858 20.921 24.5517 21.0831 24.7462 21.2907C24.9408 21.4982 25.0381 21.7382 25.0381 22.0073C25.0381 22.4224 24.7365 22.6397 24.1366 22.6559C24.1042 22.27 23.9809 21.9846 23.7669 21.8063C23.5529 21.6279 23.2286 21.5371 22.7908 21.5371C22.4146 21.5371 22.126 21.5987 21.9217 21.722C21.7207 21.8452 21.6201 22.0203 21.6201 22.2441C21.6201 22.403 21.659 22.5327 21.7369 22.6364C21.8147 22.7402 21.9477 22.831 22.1325 22.9056C22.3173 22.9802 22.58 23.058 22.9238 23.1358C23.501 23.2656 23.9582 23.4082 24.2955 23.5704C24.6327 23.7293 24.876 23.9239 25.0284 24.1509C25.1808 24.3779 25.2554 24.6567 25.2554 24.9875C25.2554 25.3248 25.1581 25.6231 24.9635 25.8793Z'
              fill='#F7D456'
            />
            <path
              d='M12.1994 15.7097H10.6623L10.3705 15.4178L10.0786 15.7097H8.5415V14.1726L8.83336 13.8807L8.5415 13.5889V12.0518H10.0786L10.3705 12.3436L10.6623 12.0518H12.1994V13.5889L11.9076 13.8807L12.1994 14.1726V15.7097Z'
              fill='#F7D456'
            />
            <path
              d='M31.7898 15.7097H30.2527L29.9608 15.4178L29.6689 15.7097H28.1318V14.1726L28.4237 13.8807L28.1318 13.5889V12.0518H29.6689L29.9608 12.3436L30.2527 12.0518H31.7898V13.5889L31.4979 13.8807L31.7898 14.1726V15.7097Z'
              fill='#F7D456'
            />
            <path
              d='M31.7898 35.2998H30.2527L29.9608 35.0079L29.6689 35.2998H28.1318V33.7627L28.4237 33.4708L28.1318 33.179V31.6418H29.6689L29.9608 31.9337L30.2527 31.6418H31.7898V33.179L31.4979 33.4708L31.7898 33.7627V35.2998Z'
              fill='#F7D456'
            />
            <path
              d='M12.1994 35.2998H10.6623L10.3705 35.0079L10.0786 35.2998H8.5415V33.7627L8.83336 33.4708L8.5415 33.179V31.6418H10.0786L10.3705 31.9337L10.6623 31.6418H12.1994V33.179L11.9076 33.4708L12.1994 33.7627V35.2998Z'
              fill='#F7D456'
            />
            <path
              d='M20.177 38.6399L13.6588 32.125V30.1923H11.7261L5.21118 23.6774L11.7261 17.1625H13.6588V15.2297L20.1737 8.71484L26.6886 15.2297V17.1625H28.6214L35.1363 23.6774L28.6246 30.1923H26.6919V32.125L20.177 38.6399ZM14.7711 31.6645L20.177 37.0704L25.5828 31.6645V29.08H28.1674L33.5732 23.6741L28.1641 18.2683H25.5796V15.6837L20.177 10.2811L14.7711 15.687V18.2715H12.1866L6.78072 23.6774L12.1866 29.0832H14.7711V31.6645Z'
              fill='#F7D456'
            />
          </svg>
        </div>
        <div className='ml-2'>
          <svg
            width='41'
            height='47'
            viewBox='0 0 41 47'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M40.7058 35.3257V11.9771L20.4834 0.302856L0.26416 11.9771V35.3257L20.4834 47L40.7058 35.3257Z'
              fill='#ED1C24'
            />
            <path
              d='M20.4834 0.302856L0.26416 11.9771V35.3257L20.4834 47L40.7058 35.3257V11.9771L20.4834 0.302856ZM37.998 21.3166L35.6567 23.6579L37.998 25.9992V33.7626L32.0214 37.213L28.8337 36.3569L27.9776 39.5479L20.4834 43.8739L12.9924 39.5479L12.1363 36.3569L8.94529 37.213L2.97195 33.7626V26.0057L5.31977 23.6579L2.97195 21.3101V13.5402L8.91286 10.1093L8.90961 10.1287L12.12 10.9881L12.9826 7.77764L12.9632 7.77115L20.4866 3.42897L27.9971 7.76467L27.9517 7.77764L28.811 10.9881L32.0214 10.1287L32.0117 10.0866L37.998 13.5434V21.3166Z'
              fill='#F7D456'
            />
            <path
              d='M12.3438 15.5119H10.771L10.4727 15.2136L10.1743 15.5119H8.60156V13.9391L8.89991 13.6408L8.60156 13.3424V11.7697H10.1743L10.4727 12.068L10.771 11.7697H12.3438V13.3424L12.0455 13.6408L12.3438 13.9391V15.5119Z'
              fill='#F7D456'
            />
            <path
              d='M32.3912 15.5119H30.8184L30.5201 15.2136L30.2217 15.5119H28.6489V13.9391L28.9473 13.6408L28.6489 13.3424V11.7697H30.2217L30.5201 12.068L30.8184 11.7697H32.3912V13.3424L32.0928 13.6408L32.3912 13.9391V15.5119Z'
              fill='#F7D456'
            />
            <path
              d='M32.3912 35.5593H30.8184L30.5201 35.2609L30.2217 35.5593H28.6489V33.9865L28.9473 33.6881L28.6489 33.3898V31.817H30.2217L30.5201 32.1154L30.8184 31.817H32.3912V33.3898L32.0928 33.6881L32.3912 33.9865V35.5593Z'
              fill='#F7D456'
            />
            <path
              d='M12.3438 35.5593H10.771L10.4727 35.2609L10.1743 35.5593H8.60156V33.9865L8.89991 33.6881L8.60156 33.3898V31.817H10.1743L10.4727 32.1154L10.771 31.817H12.3438V33.3898L12.0455 33.6881L12.3438 33.9865V35.5593Z'
              fill='#F7D456'
            />
            <path
              d='M20.5093 38.9902L13.842 32.3228V30.3447H11.8638L5.19653 23.6774L11.8638 17.0101H13.842V15.0319L20.5093 8.36462L27.1766 15.0319V17.0101H29.1548L35.8221 23.6774L29.1548 30.3447H27.1766V32.3228L20.5093 38.9902ZM14.977 31.8526L20.5093 37.3849L26.0416 31.8526V29.2097H28.6845L34.2168 23.6774L28.6845 18.1451H26.0416V15.5021L20.5093 9.96984L14.977 15.5021V18.1451H12.3341L6.80175 23.6774L12.3341 29.2097H14.977V31.8526Z'
              fill='#F7D456'
            />
            <path
              d='M14.8246 27.6435L15.1943 27.8446H14.6333L10.4078 23.6224L13.949 20.0812L14.8246 27.6435Z'
              fill='#F7D456'
            />
            <path
              d='M20.4836 16.5657L16.2322 18.0639V17.8012L20.4544 13.5758L24.6766 17.8012V18.0412L20.4836 16.5657Z'
              fill='#F7D456'
            />
            <path
              d='M20.4836 30.7404L24.6766 28.4444V29.4465L20.4544 33.6687L16.2322 29.4465V28.412L20.4836 30.7404Z'
              fill='#F7D456'
            />
            <path
              d='M20.4835 21.4658L21.4952 23.8753H19.4717L20.4835 21.4658Z'
              fill='#F7D456'
            />
            <path
              d='M20.4834 18.0576L15.2008 19.9223L16.0148 26.8004L20.4834 29.2487L24.9521 26.8004L25.766 19.9223L20.4834 18.0576ZM22.6496 26.635L21.9492 24.9325H19.0079L18.3139 26.635H17.0233L20.4867 18.9656L23.9435 26.635H22.6496Z'
              fill='#F7D456'
            />
            <path
              d='M30.5006 23.6223L26.2784 27.8445H25.7758L26.1454 27.6434L27.0145 20.1362L30.5006 23.6223Z'
              fill='#F7D456'
            />
          </svg>
        </div> */}
      </div>
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
