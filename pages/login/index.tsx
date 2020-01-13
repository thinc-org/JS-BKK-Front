/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import QrReader from 'react-qr-reader';
import { rootContext } from '../_app';

interface ErrorProps {
  error: string | null;
}

const Home: React.FC = observer(() => {
  const { userStore } = useContext(rootContext);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [qrScanner, setQrScanner] = useState<string>('No result');
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
      setQrScanner(data);
      setTicketID(data)
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <form onSubmit={login} className='flex flex-col items-center'>
      <img
        className='mt-16 border-black border-solid border w-40 h-40 rounded'
        src='https://images.pexels.com/photos/3496994/pexels-photo-3496994.jpeg?cs=srgb&dl=white-and-black-2020-with-confetti-3496994.jpg&fm=jpg'
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
          const _ticketID = e.target.value;
          setTicketID(_ticketID);
          if (_ticketID.length < 10 || _ticketID.length > 10) {
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

      <label className='mt-3 py-2 px-8 bg-gray-800 text-white rounded cursor-pointer'>
        <span>Open Camera</span>
        <input className='hidden' type='file' />
      </label>

      <button
        onClick={login}
        type='button'
        className='my-16 py-4 px-24 bg-gray-800 text-white rounded'
      >
        Login
      </button>
      
      <QrReader className="w-40 h-40" delay={300} onError={handleError} onScan={handleScan} />
      {error}
    </form>
  );
});

export default Home;
