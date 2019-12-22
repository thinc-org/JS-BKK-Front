import React, { useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { rootContext } from '../_app';

const Home: React.FC = observer(() => {
  const { userStore } = useContext(rootContext);
  const authenticate = useCallback(() => userStore.setToken('validtoken'), []);
  return (
    <div>
      <div> Login Works</div>
      <div> userStore: {userStore.userInfo && userStore.userInfo.name}</div>
      <button type='button' onClick={authenticate}>
        Login
      </button>
    </div>
  );
});

export default Home;
