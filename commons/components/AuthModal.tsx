/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { RootStore } from '../../interfaces/Commons';
import Button from './Button';
import Card from './Card';
import Modal from './Modal';
import rootContext from '../context.root';
import { useAuthenticationController } from '../../components/authentication';

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading</p>
});

const AuthModal: React.FC = observer(() => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [wrongInputFormat, setWrongInputFormat] = useState(false);
  const [isScanningQR, setIsScanningQR] = useState<boolean>(false);
  const [ticketID, setTicketID] = useState<string>('');
  const { authModalStore } = useContext<RootStore>(rootContext);
  const authenticationController = useAuthenticationController();

  const login = useCallback(
    async e => {
      e.preventDefault();
      try {
        await authenticationController.loginByTicketID(ticketID);
      } catch (error) {
        setLoginError(`Failed! ${error}`);
      }
    },
    [ticketID]
  );

  const handleScan = useCallback((data: string | null) => {
    if (data) {
      setTicketID(data);
      setIsScanningQR(false);
    }
  }, []);

  const handleError = (err: any) => {
    console.log(err);
  };

  const handleTicketIDChange = useCallback(e => {
    const ticketIDInput = e.target.value;
    const ticketLength = ticketIDInput.length;
    const isInputMismatch = ticketLength !== 6;
    setTicketID(ticketIDInput);
    setWrongInputFormat(isInputMismatch);
  }, []);

  return (
    <Modal noCloseButton modalStore={authModalStore} className='px-4 my-4'>
      <Card className='flex flex-col items-center'>
        <p className='font-extrabold text-bg mb-4'>
          To continue, Please log in
        </p>
        <p className='text-base leading-tight'>
          Meet other people through our networking activity and win special
          prizes.
        </p>
        <form className='flex flex-col items-center' onSubmit={login}>
          <p className='mt-5 text-xs'>Please enter your Ticket ID</p>
          <input
            maxLength={10}
            className='mt-3 text-xs border-black border-solid border rounded px-4 py-2'
            type='text'
            value={ticketID}
            onChange={handleTicketIDChange}
          />
          <p className={`text-red-600 pt-2 ${!wrongInputFormat && 'hidden'}`}>
            Use test01 to test05
          </p>
          <p className='mt-3 text-xs'>or Scan QR</p>
          <Button
            onClick={() => setIsScanningQR(true)}
            type='button'
            className='mt-3 py-2 px-8 bg-white border-yellow-dark border-2 text-yellow-dark rounded'
          >
            Open Camera
          </Button>
          {isScanningQR && (
            <QrReader
              className='w-40 h-40 mt-4 rounded'
              delay={300}
              onError={handleError}
              onScan={handleScan}
            />
          )}
          <Button
            onClick={login}
            type='button'
            className='mt-12 py-3 px-20 font-bg bg-yellow-dark text-black rounded'
          >
            Login
          </Button>
          {loginError}
        </form>
      </Card>
    </Modal>
  );
});

export default AuthModal;
