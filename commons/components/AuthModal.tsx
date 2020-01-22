/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { rootContext } from '../../pages/_app';
import { RootStore } from '../../interfaces/interface.commons';
import Button from './component.button';
import Card from './Card';

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading</p>
});

interface PropTypes {
  isAnimating: boolean;
  isHidden: boolean;
}

const AuthModal: React.FC<PropTypes> = observer(({ isAnimating, isHidden }) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [wrongInputFormat, setWrongInputFormat] = useState(false);
  const [isScanningQR, setIsScanningQR] = useState<boolean>(false);
  const [ticketID, setTicketID] = useState<string>('');
  const { authModalStore, userStore } = useContext<RootStore>(rootContext);

  const login = useCallback(
    e => {
      e.preventDefault();
      if (ticketID.length === 10) {
        userStore.setToken('validtoken');
        authModalStore.setModalOpen(false);
      } else {
        setLoginError('Username or password wrong');
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
    const isInputMismatch = ticketLength < 10 || ticketLength > 10;
    setTicketID(ticketIDInput);
    setWrongInputFormat(isInputMismatch);
  }, []);

  return (
    <div
      className={`fixed flex justify-center pin-l pin-t my-4 px-4 z-50 ${
        isAnimating ? 'fade' : ''
      } ${isHidden ? 'hidden' : ''}`}
    >
      <Card className='flex flex-col items-center '>
        <p className='font-bold text-bg mb-4'>To continue, Please log in</p>
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
            Please enter 10 digits
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
    </div>
  );
});

export default AuthModal;
