import { UserStore } from './interface.user';

export type Onclick =
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;

export interface RouteData {
  hasNavbar: boolean;
  title: string;
}

export interface AuthModalStore {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

export interface RootStore {
  userStore: UserStore;
  authModalStore: AuthModalStore;
}
