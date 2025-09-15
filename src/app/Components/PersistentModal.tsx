import React, { useEffect, useRef } from "react";

/**
 * PersistentModal
 *
 * Props:
 *   isOpen: boolean
 *   onClose: () => void
 *   children: ReactNode
 *   autoCloseMs?: number   // optional auto-close time (ms)
 *   disableAutoCloseWhileInteracting?: boolean // defaults true
 *
 * Behavior:
 *  - click outside or Esc will only close when user is NOT interacting with modal inputs
 *  - cancels auto-close while user is interacting (focus or pointer inside)
 */

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  autoCloseMs?: number;
  disableAutoCloseWhileInteracting?: boolean;
};

export default function PersistentModal({
  isOpen,
  onClose,
  children,
  autoCloseMs = 0,
  disableAutoCloseWhileInteracting = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const interactionCountRef = useRef(0);
  const autoCloseTimerRef = useRef<number | null>(null);

  // pointerdown / mousedown is better than click to catch interactions before focus changes
  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(e: PointerEvent) {
      // if clicking outside the modal
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        // only close if user is not interacting OR disableAutoCloseWhileInteracting is false
        if (!disableAutoCloseWhileInteracting || interactionCountRef.current === 0) {
          onClose();
        }
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (!disableAutoCloseWhileInteracting || interactionCountRef.current === 0) {
          onClose();
        }
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, disableAutoCloseWhileInteracting]);

  // auto-close timer (respect interaction)
  useEffect(() => {
    function clearAutoClose() {
      if (autoCloseTimerRef.current) {
        window.clearTimeout(autoCloseTimerRef.current);
        autoCloseTimerRef.current = null;
      }
    }
    if (!isOpen) { clearAutoClose(); return; }

    if (autoCloseMs && (!disableAutoCloseWhileInteracting || interactionCountRef.current === 0)) {
      clearAutoClose();
      autoCloseTimerRef.current = window.setTimeout(() => {
        onClose();
      }, autoCloseMs);
    } else {
      clearAutoClose();
    }

    return () => clearAutoClose();
  }, [isOpen, autoCloseMs, disableAutoCloseWhileInteracting, onClose]);

  // helpers to track user interaction (use onFocus/onBlur capture at container level)
  function onFocusEnter() {
    interactionCountRef.current += 1;
    if (autoCloseTimerRef.current) {
      window.clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
  }
  function onFocusLeave() {
    // small delay to allow tabbing between inputs without decrementing prematurely
    setTimeout(() => {
      interactionCountRef.current = Math.max(0, interactionCountRef.current - 1);
    }, 0);
  }

  if (!isOpen) return null;

  return (
    <div
      aria-hidden={!isOpen}
      className="persistent-modal-overlay"
      // overlay should not capture inner pointer events (we rely on pointerdown on document)
      style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        onFocus={onFocusEnter}
        onBlur={onFocusLeave}
        onPointerDown={(e) => {
          // stop overlay pointer from closing when clicking inside. We handle outside via document listener.
          e.stopPropagation();
        }}
        className="persistent-modal-content"
        style={{
          // Proper centering positioning
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "28rem",
          padding: "1rem"
        }}
      >
        {children}
      </div>
    </div>
  );
}
