import type { ModalState } from "../state";

export const activeAddActivityModal = (state: ModalState) => {
  state.addActivityModal.isOpen = !state.addActivityModal.isOpen;
};

export const activeEditActivityModal = (state: ModalState) => {
  state.editActivityModal.isOpen = !state.editActivityModal.isOpen;
};
