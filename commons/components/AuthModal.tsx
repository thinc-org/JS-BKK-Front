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
import TextSpinner from './TextSpinner';

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

  const login2 = useCallback(async e => {
    e.preventDefault();
    setActiveSignInProcesses(x => x + 1);
    try {
      // eslint-disable-next-line no-alert
      const referenceCode = prompt('Ticket reference code (6 digits code)');
      if (!referenceCode) {
        throw new Error('No reference code provided');
      }
      // eslint-disable-next-line no-alert
      const phoneNumber = prompt('Your phone number registered with Eventpop');
      if (!phoneNumber) {
        throw new Error('No phone number provided');
      }
      await authenticationController.loginWithEventpopInfo(
        referenceCode,
        phoneNumber
      );
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
      <section aria-label='Authentication modal'>
        <Card className='flex flex-col items-center'>
          <p className='font-extrabold text-bg mb-4'>
            To continue, Please log in
          </p>
          <p className='text-base leading-tight'>
            Make your meal selection and meet other people through our
            networking activity to win special prizes.
          </p>
          <Button
            onClick={login}
            type='button'
            className={`mt-12 py-3 px-20 font-bg bg-yellow-dark text-black rounded ${
              activeSignInProcesses > 0 ? 'opacity-50' : ''
            }`}
          >
            {activeSignInProcesses > 0 ? (
              <>
                Please wait… <TextSpinner />
              </>
            ) : (
              'Sign in with Eventpop'
            )}
          </Button>
          - or -
          <Button
            onClick={e => login2(e)}
            type='button'
            className='py-2 px-4 font-bg border bg-white border-yellow-dark text-black rounded'
          >
            Sign in with your ticket code and phone number
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
      </section>
    </Modal>
  );
});

export default AuthModal;
