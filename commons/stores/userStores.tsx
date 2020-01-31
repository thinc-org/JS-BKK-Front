import { UserInfo } from '../../interfaces/Users';

const createUserStore = () => ({
  userInfo: undefined as UserInfo | undefined,
  setUserInfo(userInfo: UserInfo | undefined): void {
    this.userInfo = userInfo;
  }
});

export type UserStore = ReturnType<typeof createUserStore>;

export default createUserStore;
