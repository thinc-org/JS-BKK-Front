import React, { useCallback, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { rootContext } from '../_app';
import Button from '../../commons/components/component.button';

interface ErrorProps {
  error: string | null;
}

const Home: React.FC = observer(() => {
  const { userStore } = useContext(rootContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = useCallback(
    e => {
      e.preventDefault();
      if (username === 'admin' && password === '123456') {
        userStore.setToken('validtoken');
        router.push('/user/profile');
      } else {
        setError('Username or password wrong');
        setPassword('');
        setUsername('');
      }
    },
    [username, password]
  );

  return (
    <div>
      <div className='bg-green-600 flex flex-row'>Login</div>
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
        <Button type='submit'>Login</Button>
      </form>
    </div>
  );
});

export default Home;
