import { useEffect, useState, ReactNode, useContext, useMemo } from 'react';
import {
  getFirebase,
  User,
  FirestoreSnapshot,
  FirebaseModule,
  getEnvName
} from '../../commons/firebase';
import rootContext from '../../commons/context.root';

export type ProfileData = {
  firstname: string;
  lastname: string;
  email: string;
  referenceCode: string;
  ticketType: string;
};

type AuthenticatedState = {
  profile: ProfileData;
  uid: string;
};

export type AuthenticationState = 'checking' | null | AuthenticatedState;

/**
 * Returns the current authentication state.
 */
export function useAuthenticationState(): AuthenticationState {
  const [firebase, setFirebase] = useState<FirebaseModule | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null | 'loading'>(
    'loading'
  );
  const [profileSnapshot, setProfileSnapshot] = useState<
    FirestoreSnapshot | 'loading'
  >('loading');

  useEffect(() => {
    getFirebase().then(setFirebase);
  }, []);

  useEffect(() => {
    if (!firebase) {
      return () => {};
    }
    return firebase.auth().onAuthStateChanged(setFirebaseUser);
  }, [firebase]);

  useEffect(() => {
    if (!firebase || firebaseUser === 'loading') {
      return () => {};
    }
    if (!firebaseUser) {
      setProfileSnapshot('loading');
      return () => {};
    }
    setProfileSnapshot('loading');
    return firebase
      .getEnvDoc()
      .collection('profiles')
      .doc(firebaseUser.uid)
      .onSnapshot(setProfileSnapshot);
  }, [firebase, firebaseUser]);

  if (firebaseUser === 'loading') {
    return 'checking';
  }
  if (!firebaseUser) {
    return null;
  }
  if (profileSnapshot === 'loading') {
    return 'checking';
  }
  if (!profileSnapshot.exists) {
    return null;
  }
  return {
    uid: firebaseUser.uid,
    profile: profileSnapshot.data() as any
  };
}

export function isAuthenticated(
  state: AuthenticationState
): state is AuthenticatedState {
  return state !== 'checking' && state !== null;
}

/**
 * Returns an object with methods to authenticate user.
 */
export function useAuthenticationController() {
  return useMemo(
    () => ({
      async loginByTicketID(ticketID: string) {
        if (getEnvName() === 'production') {
          throw new Error(
            'Eventpop authentication is not implemented yet. To log in, please run the app in test mode by appending ?env=test to URL'
          );
        }
        const firebase = await getFirebase();
        const getTestTokenFromApp = firebase
          .functions('asia-northeast1')
          .httpsCallable('getTestTokenFromApp');
        const token = await getTestTokenFromApp({ uid: ticketID });
        await firebase.auth().signInWithCustomToken(token.data.token);
      },
      async logout() {
        const firebase = await getFirebase();
        await firebase.auth().signOut();
      }
    }),
    []
  );
}

/**
 * This component renders the children only if user is authenticated.
 * Otherwise, it requests the auth modal to be displayed.
 */
export function RequiresAuthentication(props: {
  children: ReactNode;
  fallback?: ReactNode;
  checking?: ReactNode;
}) {
  const {
    children,
    checking = <DefaultAuthenticationChecking />,
    fallback = null
  } = props;
  const authState = useAuthenticationState();
  console.log(authState);
  const mustDisplayModal = authState === null;
  const { authModalStore } = useContext(rootContext);

  useEffect(() => {
    if (!mustDisplayModal) {
      return () => {};
    }
    const modal = authModalStore.requestModal();
    return () => {
      modal.release();
    };
  }, [mustDisplayModal]);

  if (authState === 'checking') {
    return <>{checking}</>;
  }
  if (!authState) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}

function DefaultAuthenticationChecking() {
  return <div className='text-xl text-white'>Checking authentication...</div>;
}

export function withRequiredAuthentication<T>(
  BaseComponent: React.ComponentType<T>
): React.ComponentType<T> {
  return function Wrapped(props: T) {
    return (
      <RequiresAuthentication>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <BaseComponent {...props} />
      </RequiresAuthentication>
    );
  };
}
