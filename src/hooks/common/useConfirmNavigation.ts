import { useEffect } from "react";
import { useBlocker } from "react-router-dom";
import { confirmAction } from "../../shared/notification/confirm";

export const useConfirmNavigation = (
  shouldBlock: boolean,
  message: string,
  onConfirmLeave?: () => Promise<void> | void
) => {
  const blocker = useBlocker(shouldBlock);

  useEffect(() => {
    if (!shouldBlock) return;

    if (blocker.state === "blocked") {
      (async () => {
        const confirmed = await confirmAction({
          title: "Leave booking?",
          description: message,
          confirmText: "Yes, leave",
          cancelText: "Stay",
          type: "warning",
        });

        if (confirmed) {
          if (onConfirmLeave) {
            await onConfirmLeave();
          }

          blocker.proceed();
        } else {
          blocker.reset();
        }
      })();
    }
  }, [blocker, message, onConfirmLeave, shouldBlock]);
};
