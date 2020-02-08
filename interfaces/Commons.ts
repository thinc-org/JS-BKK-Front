import { ModalStore } from '../commons/stores/authModalStores';
import { UserStore } from '../commons/stores/userStores';
import { NetworkingProfile } from './Users';

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

export interface CompletedFetchResult<T> extends FetchResult<T> {
  data: T;
  error?: any;
  status: 'completed';
}

export interface FailedFetchResult<T> extends FetchResult<T> {
  data?: T;
  error: any;
  status: 'error';
}

export interface OngoingFetchResult<T> extends FetchResult<T> {
  data?: T;
  error?: any;
  status: 'loading';
}

export interface Networking {
  status: string;
  data?: NetworkingProfile;
  hasAllWinner?: boolean;
  isWinner?: boolean;
  error?: any;
  uuid?: string;
}

export enum ModalType {
  normal,
  error
}

/**
 * Checks if fetching is completed.
 * If yes, then fetchResult.data will not be undefined.
 */
export function isFetchingCompleted<T>(
  f: FetchResult<T>
): f is CompletedFetchResult<T> {
  return f.status === 'completed';
}

/**
 * Checks if there is some fetching ongoing.
 */
export function isFetching<T>(f: FetchResult<T>): f is OngoingFetchResult<T> {
  return f.status === 'loading';
}

/**
 * Checks if fetching result is failed.
 */
export function isFetchingFailed<T>(
  f: FetchResult<T>
): f is FailedFetchResult<T> {
  return f.status === 'error';
}
