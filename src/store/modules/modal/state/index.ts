export type ModalState = {
  addActivityModal: {
    isOpen: boolean;
  };
  editActivityModal: {
    isOpen: boolean;
  };
};

export const modalInitState = {
  addActivityModal: {
    isOpen: false,
  },
  editActivityModal: {
    isOpen: false,
  },
} as ModalState;
