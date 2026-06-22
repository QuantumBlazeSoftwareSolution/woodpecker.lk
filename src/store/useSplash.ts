import { create } from "zustand";

export type SplashStatus = "idle" | "playing" | "exiting" | "completed";

interface SplashState {
  status: SplashStatus;
  startSplash: () => void;
  exitSplash: () => void;
  completeSplash: () => void;
}

export const useSplash = create<SplashState>((set) => ({
  status: "idle", // Defaults to idle, will be initialized on client mount
  startSplash: () => set({ status: "playing" }),
  exitSplash: () => set({ status: "exiting" }),
  completeSplash: () => set({ status: "completed" }),
}));
