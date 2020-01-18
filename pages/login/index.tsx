/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { rootContext } from '../_app';

interface ErrorProps {
  error: string | null;
}

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false
});

const Home: React.FC = observer(() => {
  const { userStore } = useContext(rootContext);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [qrReady, setQrReady] = useState<boolean>(false);

  const [ticketID, setTicketID] = useState<string>('');

  const login = useCallback(
    e => {
      e.preventDefault();
      if (ticketID.length === 10) {
        userStore.setToken('validtoken');
        router.push('/user/profile');
      } else {
        setError('Username or password wrong');
      }
    },
    [ticketID]
  );

  const handleScan = (data: string | null) => {
    if (data) {
      setTicketID(data);
      setQrReady(false);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  

  return (
    <form onSubmit={login} className='flex flex-col items-center'>
      <img
        className='mt-16 border-black border-solid border w-40 h-40 rounded'
        src='images/icon.png'
        alt='logo'
      />
      <p className='mt-8'>
        Please enter your <span className='underline'>Ticket ID</span>
      </p>

      <input
        className='mt-5 border-black border-solid border rounded p-1'
        type='text'
        value={ticketID}
        onChange={e => {
          const loginError = e.target.value;
          setTicketID(loginError);
          if (loginError.length < 10 || loginError.length > 10) {
            setIsOpen(true);
          } else {
            setIsOpen(false);
          }
        }}
      />
      <p className={`text-red-600 pt-2 ${!isOpen && 'hidden'}`}>
        Please enter 10 digits
      </p>

      <p className='mt-10'>or Scan QR</p>

      <button
        onClick={() => setQrReady(true)}
        type='button'
        className='mt-3 py-2 px-8 bg-gray-800 text-white rounded'
      >
        Open Camera
      </button>

      {qrReady && true ? (
        <QrReader
          className='w-40 h-40 mt-4 rounded'
          delay={300}
          onError={handleError}
          onScan={handleScan}
        />
      ) : null}

      <button
        onClick={login}
        type='button'
        className='my-16 py-4 px-24 bg-gray-800 text-white rounded'
      >
        Login
      </button>

      {error}
    </form>
  );
});

export default Home;
