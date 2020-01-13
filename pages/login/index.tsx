/* eslint-disable jsx-a11y/label-has-associated-control */
// import React, { useCallback, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
// import { useRouter } from 'next/router';
// import { rootContext } from '../_app';

interface ErrorProps {
  error: string | null;
}

const Home: React.FC = observer(() => {
  // const { userStore } = useContext(rootContext);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  // const login = useCallback(
  //   e => {
  //     e.preventDefault();
  //     if (username === 'admin' && password === '123456') {
  //       userStore.setToken('validtoken');
  //       router.push('/user/profile');
  //     } else {
  //       setError('Username or password wrong');
  //       setPassword('');
  //       setUsername('');
  //     }
  //   },
  //   [username, password]
  // );

  return (
    <div className='flex flex-col items-center'>
      {/* <div className='bg-green-600 flex flex-row'>Login</div>
      <form onSubmit={login}>
        <input
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div>{error}</div>}
        <button type='submit'>Login</button>
      </form> */}

      <img
        className='mt-16 border-black border-solid border w-40 h-40'
        src='https://images.pexels.com/photos/3496994/pexels-photo-3496994.jpeg?cs=srgb&dl=white-and-black-2020-with-confetti-3496994.jpg&fm=jpg'
        alt='logo'
      />
      <p className='mt-8'>Please enter your Ticket ID</p>

      <form>
        <input className='mt-5 border-black border-solid border' type='text' />
      </form>

      <p className='mt-10'>or Scan QR</p>

      <label className="mt-3">
        <span>Open Camera</span>
        <input className='hidden' type='file' />
      </label>

      <button type="button" className="mt-16">
        Login
      </button>

    </div>
  );
});

export default Home;
