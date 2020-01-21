import { UserInfo, UserStore } from '../../interfaces/interface.user';

const createUserStore = (): UserStore => ({
  userInfo: undefined as UserInfo | undefined,
  token: '' as string,
  setUserInfo(userInfo: UserInfo | undefined): void {
    this.userInfo = userInfo;
  },
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  },
  isAuthenticated(): boolean {
    return !!this.userInfo;
  },
  logout(): void {
    this.userInfo = undefined;
    this.token = '';
    localStorage.removeItem('token');
  }
});

export default createUserStore;
