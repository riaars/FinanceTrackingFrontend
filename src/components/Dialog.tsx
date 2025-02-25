import React, { useEffect, useRef } from "react";

type DialogType = {
  title: string;
  children: any;
  handleCloseDialog: () => void;
};
function Dialog({ title, handleCloseDialog, children }: DialogType) {
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
  }, [handleCloseDialog]);

  return (
    <div className="dialog-overlay">
      <div className="dialog" ref={dialogRef}>
        <div className="dialog__title">{title}</div>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
