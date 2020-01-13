/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { rootContext } from '../_app';

interface ErrorProps {
  error: string | null;
}

const Home: React.FC = observer(() => {
  const { userStore } = useContext(rootContext);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [ticketID, setTicketID] = useState();

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
        className='mt-5 border-black border-solid border rounded'
        type='text'
        value={ticketID}
        onChange={e => setTicketID(e.target.value)}
      />

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
      {error}
    </form>
  );
});

export default Home;
