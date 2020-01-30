import { ModalStore } from '../commons/stores/authModalStores';
import { UserStore } from '../commons/stores/userStores';

export type Onclick =
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;

export interface RouteData {
  hasNavbar: boolean;
  title: string;
}

export interface RootStore {
  userStore: UserStore;
  authModalStore: ModalStore;
}

export interface FetchResult<T> {
  data?: T;
  error?: any;
  status: 'loading' | 'completed' | 'error';
}

export interface FetchedResult<T> {
  data: T;
  error?: any;
  status: 'completed';
}

/**
 * Checks if fetching is completed.
 * If yes, then fetchResult.data will not be undefined.
 */
export function isFetchingCompleted<T>(
  f: FetchResult<T>
): f is FetchedResult<T> {
  return f.status === 'completed';
}

/**
 * Checks if there is some fetching ongoing.
 */
export function isFetching<T>(f: FetchResult<T>): boolean {
  return f.status === 'loading';
}
