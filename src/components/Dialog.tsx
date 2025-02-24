import React, { useEffect, useRef } from "react";

type DialogType = {
  title: string;
  content: string;
  handleCloseDialog: () => void;
};
function Dialog({ title, content, handleCloseDialog }: DialogType) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        handleCloseDialog();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dialog-overlay" ref={dialogRef}>
      <div className="dialog">
        <div className="dialog__title">{title}</div>
        <div className="dialog__content">{content}</div>
        <div className="dialog__actions">
          <button className="secondary-button" onClick={handleCloseDialog}>
            Close
          </button>
          <button className="primary-button" onClick={handleCloseDialog}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
