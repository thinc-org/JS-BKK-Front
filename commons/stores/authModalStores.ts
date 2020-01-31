const createModalStore = (timeout: number, defaultOpen = true) => ({
  isModalOpen: defaultOpen,
  hiddenClassTimer: null as NodeJS.Timeout | null,

  /**
   * Number of components currently requesting for the modal to be open.
   */
  referenceCount: 0,

  /**
   * Requests for a modal to be open.
   * This handles the race condition where multiple components requests the same modal.
   * Once the modal is no longer needed, call `release()` to close.
   */
  requestModal() {
    const shouldOpen = this.referenceCount === 0;
    this.referenceCount += 1;
    if (shouldOpen) {
      this.setModalOpen(true);
    }
    return {
      release: () => {
        this.referenceCount -= 1;
        const shouldClose = this.referenceCount === 0;
        if (shouldClose) {
          this.setModalOpen(false);
        }
      }
    };
  },
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
