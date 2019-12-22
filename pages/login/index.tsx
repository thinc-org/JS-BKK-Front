import React, { useCallback, useContext, useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { rootContext } from '../_app';

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

  const Input = useMemo(
    () => styled.input`
      padding: 10px;
    `,
    []
  );

  const Container = useMemo(
    () => styled.div`
      display: flex;
      flex-direction: column;
    `,
    []
  );

  const Error = useMemo(
    () => styled.span<ErrorProps>`
      color: red;
      font-size: 20px;
      display: ${props => (props.error ? 'block' : 'none')};
    `,
    []
  );

  return (
    <div>
      <div>Login</div>
      <form onSubmit={login}>
        <Container>
          <Input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Container>
        <Error error={error}>{error}</Error>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
});

export default Home;
