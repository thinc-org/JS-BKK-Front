const createModalStore = (timeout: number, defaultOpen = true) => ({
  isModalOpen: defaultOpen,
  setModalOpen(isOpen: boolean) {
    if (this.isModalOpen === isOpen && !isOpen) {
      return;
    }
    this.isModalOpen = isOpen;
    let hiddenClassTimer = null;
    if (hiddenClassTimer) {
      clearTimeout(hiddenClassTimer as NodeJS.Timeout);
    }
    if (!isOpen) {
      this.isAnimating = true;
      hiddenClassTimer = setTimeout(() => {
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
