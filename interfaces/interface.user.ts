import { Badge } from './interface.badge';

export interface UserInfo {
  name: string;
  username: string;
  points: number;
  currentBadge: Badge;
  badges: Badge[];
}

export interface UserStore {
  userInfo: UserInfo | undefined;
  token: string;
  setUserInfo(userInfo: UserInfo | undefined): void;
  setToken(token: string): void;
  isAuthenticated(): boolean;
}
