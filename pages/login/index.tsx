import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import useUserStore from '../../commons/hooks/hook.user';

const Home: React.FC = observer(() => {
  const userStore = useUserStore();
  const authenticate = useCallback(() => userStore.setToken('34'), []);
  return (
    <div>
      <div> Login Works</div>
      <div> userStore: {userStore.userInfo && userStore.userInfo.name}</div>
      <button type='button' onClick={authenticate}>
        Authenticate
      </button>
    </div>
  );
});

export default Home;
