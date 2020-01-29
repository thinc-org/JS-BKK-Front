import { useEffect, useState, ReactNode, useContext, useMemo } from 'react';
import {
  getFirebase,
  User,
  FirestoreSnapshot,
  FirebaseModule
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
    FirestoreSnapshot | null | 'loading'
  >(null);

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
    if (firebaseUser === 'loading') {
      return () => {};
    }
    if (!firebase || !firebaseUser) {
      setProfileSnapshot(null);
      return () => {};
    }
    setProfileSnapshot('loading');
    return firebase
      .getEnvDoc()
      .collection('profiles')
      .doc(firebaseUser.uid)
      .onSnapshot(setProfileSnapshot);
  }, [firebase, firebaseUser]);

  if (profileSnapshot === 'loading' || firebaseUser === 'loading') {
    return 'checking';
  }
  if (!profileSnapshot || !firebaseUser) {
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
      async login() {
        // TODO
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
}) {
  const { children, fallback = null } = props;
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

  if (authState === 'checking' || !authState) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
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
