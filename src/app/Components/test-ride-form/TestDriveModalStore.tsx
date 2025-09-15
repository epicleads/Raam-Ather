"use client";
import { createContext, useCallback, useContext, useState, ReactNode } from "react";

type Reason = "timer" | "user" | "success" | "external";

type ModalState = {
  open: boolean;
  locked: boolean;        // when true, ignore all external close attempts
  reason?: Reason;
};

type ModalApi = {
  state: ModalState;
  openByTimer: () => void;      // opens + sets reason = "timer"
  openManually: () => void;     // opens + sets reason = "user"
  requestClose: (origin?: Reason) => void; // ignored if locked and origin !== "user" && origin !== "success"
  forceClose: (origin?: Reason) => void;   // closes regardless of lock
  lock: () => void;
  unlock: () => void;
};

const Ctx = createContext<ModalApi | null>(null);

export function TestDriveModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>({
    open: false,
    locked: false,
    reason: undefined,
  });

  const lock = useCallback(() => {
    console.log("ModalStore: Locking modal");
    setState((s) => ({ ...s, locked: true }));
  }, []);

  const unlock = useCallback(() => {
    console.log("ModalStore: Unlocking modal");
    setState((s) => ({ ...s, locked: false }));
  }, []);

  const openManually = useCallback(() => {
    console.log("ModalStore: Opening manually");
    setState({ open: true, locked: false, reason: "user" });
  }, []);

  const openByTimer = useCallback(() => {
    console.log("ModalStore: Opening by timer");
    setState({ open: true, locked: false, reason: "timer" });
  }, []);

  const requestClose = useCallback((origin: Reason = "external") => {
    console.log("ModalStore: Close requested with origin:", origin);

    // Always allow close on user/success
    if (origin === "user" || origin === "success") {
      console.log("ModalStore: Allowing close for user/success action");
      setState((s) => ({ ...s, open: false, reason: origin }));
    } else {
      // For external actions, check if locked
      setState((s) => {
        if (s.locked) {
          console.log("ModalStore: Blocking external close - modal is locked");
          return s; // ignore
        }
        console.log("ModalStore: Allowing external close - modal is unlocked");
        return { ...s, open: false, reason: origin };
      });
    }
  }, []);

  const forceClose = useCallback((origin: Reason = "external") => {
    console.log("ModalStore: Force closing with origin:", origin);
    setState((s) => ({ ...s, open: false, reason: origin }));
  }, []);

  const api: ModalApi = {
    state,
    openByTimer,
    openManually,
    requestClose,
    forceClose,
    lock,
    unlock,
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useTestDriveModal() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error(
      "❌ useTestDriveModal must be used within <TestDriveModalProvider>"
    );
  }
  return ctx;
}
