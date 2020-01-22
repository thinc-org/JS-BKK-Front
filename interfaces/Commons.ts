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
