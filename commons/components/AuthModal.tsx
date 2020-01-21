/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { rootContext } from '../../pages/_app';
import { RootStore } from '../../interfaces/interface.commons';
import Button from './component.button';

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

  const handleScan = (data: string | null) => {
    if (data) {
      setTicketID(data);
      setIsScanningQR(false);
    }
  };

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
    <div className='flex flex-col items-center bg-white rounded-lg px-4 pt-5 pb-7.5'>
      <p className='font-bold text-bg mb-4 font-robo'>
        To continue, Please log in
      </p>
      <p className='text-base font-robo leading-tight'>
        Meet other people through our networking activity and win special
        prizes.
      </p>
      <form className='flex flex-col items-center' onSubmit={login}>
        <p className='mt-5 font-inter text-xs'>Please enter your Ticket ID</p>
        <input
          className='mt-3 text-xs border-black border-solid border rounded px-4 py-2'
          type='text'
          value={ticketID}
          onChange={handleTicketIDChange}
        />
        <p className={`text-red-600 pt-2 ${!wrongInputFormat && 'hidden'}`}>
          Please enter 10 digits
        </p>
        <p className='mt-3 text-xs font-inter'>or Scan QR</p>
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
          className='mt-12 py-3 px-20 font-bg bg-yellow-dark text-black font-robo rounded'
        >
          Login
        </Button>
        {loginError}
      </form>
    </div>
  );
});

export default AuthModal;
