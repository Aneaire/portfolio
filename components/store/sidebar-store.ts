import { create } from "zustand";

type HamburgerShown = {
  hamburgerShown: boolean;
  setHamburger: (value: boolean) => void;
};

const useSideBarStore = create<HamburgerShown>((set: any) => ({
  hamburgerShown: false,
  setHamburger: (value: boolean) => set({ hamburgerShown: value }),
}));

export default useSideBarStore;
