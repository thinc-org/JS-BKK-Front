const createModalStore = (timeout: number, defaultOpen = true) => ({
  isModalOpen: defaultOpen,
  hiddenClassTimer: null as NodeJS.Timeout | null,
  setModalOpen(isOpen: boolean) {
    if (this.isModalOpen === isOpen && !isOpen) {
      return;
    }
    this.isModalOpen = isOpen;
    if (this.hiddenClassTimer) {
      clearTimeout(this.hiddenClassTimer);
    }
    if (!isOpen) {
      this.isAnimating = true;
      this.hiddenClassTimer = setTimeout(() => {
        this.isAnimating = false;
        this.isHidden = true;
      }, timeout);
    } else {
      this.isHidden = false;
      this.isAnimating = false;
    }
  },
  isAnimating: false,
  isHidden: true
});

export type ModalStore = ReturnType<typeof createModalStore>;

export default createModalStore;
