import { useEffect, useState, ReactNode, useContext, useMemo } from 'react';
import {
  getFirebase,
  User,
  FirestoreSnapshot,
  getEnvName,
  useFirebase
} from '../../commons/firebase';
import rootContext from '../../commons/context.root';
import {
  isFetchingCompleted,
  FetchResult,
  FetchedResult,
  isFetching
} from '../../interfaces/Commons';

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

export type AuthenticationState = FetchResult<AuthenticatedState | null>;

/**
 * Returns the current authentication state.
 */
export function useAuthenticationState(): AuthenticationState {
  const firebaseFetchResult = useFirebase();
  const [firebaseUser, setFirebaseUser] = useState<User | null | 'loading'>(
    'loading'
  );
  const [profileSnapshot, setProfileSnapshot] = useState<
    FirestoreSnapshot | 'loading'
  >('loading');

  useEffect(() => {
    if (!isFetchingCompleted(firebaseFetchResult)) {
      return () => {};
    }
    const firebase = firebaseFetchResult.data;
    return firebase.auth().onAuthStateChanged(setFirebaseUser);
  }, [firebaseFetchResult]);

  useEffect(() => {
    if (!isFetchingCompleted(firebaseFetchResult)) {
      return () => {};
    }
    const firebase = firebaseFetchResult.data;
    if (firebaseUser === 'loading') {
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
  }, [firebaseFetchResult, firebaseUser]);

  if (firebaseUser === 'loading') {
    return { status: 'loading' };
  }
  if (!firebaseUser) {
    return { status: 'completed', data: null };
  }
  if (profileSnapshot === 'loading') {
    return { status: 'loading' };
  }
  if (!profileSnapshot.exists) {
    return { status: 'completed', data: null };
  }
  return {
    status: 'completed',
    data: {
      uid: firebaseUser.uid,
      profile: profileSnapshot.data() as any
    }
  };
}

export function isAuthenticated(
  state: AuthenticationState
): state is FetchedResult<AuthenticatedState> {
  return isFetchingCompleted(state) && state.data !== null;
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

  if (isFetching(authState)) {
    return <>{checking}</>;
  }
  if (!isAuthenticated(authState)) {
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
