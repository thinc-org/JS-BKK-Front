import { AuthModalStore } from '../../interfaces/interface.commons';

const createAuthModalStore = (): AuthModalStore => ({
  isModalOpen: false,
  setModalOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
});

export default createAuthModalStore;
