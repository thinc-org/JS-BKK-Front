import { observable, action, computed } from 'mobx';
import { UserInfo } from '../interfaces/interface.user';

export default class UserStore {
  @observable userInfo: UserInfo | undefined;
  @observable token: string = '';

  @action
  setUserInfo(userInfo: UserInfo): void {
    this.userInfo = userInfo;
  }

  @action
  setToken(token: string) {
    this.token = token;
  }

  @computed
  get isAuthenticated(): boolean {
    return !!this.userInfo;
  }
}
