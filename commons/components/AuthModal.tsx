/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import { RootStore } from '../../interfaces/Commons';
import Button from './Button';
import Card from './Card';
import Modal from './Modal';
import rootContext from '../context.root';
import { useAuthenticationController } from '../../components/authentication';
import { getEnvName } from '../firebase';

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading</p>
});

const AuthModal: React.FC = observer(() => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeSignInProcesses, setActiveSignInProcesses] = useState<number>(0);
  const { authModalStore } = useContext<RootStore>(rootContext);
  const authenticationController = useAuthenticationController();

  const login = useCallback(async e => {
    e.preventDefault();
    setActiveSignInProcesses(x => x + 1);
    try {
      await authenticationController.loginWithEventpop();
    } catch (error) {
      setLoginError(`Failed! ${error}`);
    } finally {
      setActiveSignInProcesses(x => x - 1);
    }
  }, []);

  const loginTest = useCallback(async (e, uid: string) => {
    e.preventDefault();
    setActiveSignInProcesses(x => x + 1);
    try {
      await authenticationController.loginAsTestUser(uid);
    } catch (error) {
      setLoginError(`Failed! ${error}`);
    } finally {
      setActiveSignInProcesses(x => x - 1);
    }
  }, []);

  const [isTestEnvironment, setIsTestEnvironment] = useState(false);

  useEffect(() => {
    setIsTestEnvironment(getEnvName() === 'test');
  }, []);

  const testUsers = isTestEnvironment
    ? ['test01', 'test02', 'test03', 'test04', 'test05']
    : [];

  return (
    <Modal noCloseButton modalStore={authModalStore} className='px-4 my-4'>
      <Card className='flex flex-col items-center'>
        <p className='font-extrabold text-bg mb-4'>
          To continue, Please log in
        </p>
        <p className='text-base leading-tight'>
          Make your meal selection and meet other people through our networking
          activity to win special prizes.
        </p>
        <Button
          onClick={login}
          type='button'
          className='mt-12 py-3 px-20 font-bg bg-yellow-dark text-black rounded'
        >
          {activeSignInProcesses > 0 ? 'Please wait…' : 'Sign in with Eventpop'}
        </Button>
        {testUsers.map(uid => {
          return (
            <Button
              key={uid}
              onClick={e => loginTest(e, uid)}
              type='button'
              className='mt-2 py-2 px-8 font-bg border bg-white border-yellow-dark text-black rounded'
            >
              Sign in as test user {uid}
            </Button>
          );
        })}
        {loginError}
      </Card>
    </Modal>
  );
});

export default AuthModal;
