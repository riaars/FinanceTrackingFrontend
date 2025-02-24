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
        return handleCloseDialog;
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dialog-overlay" ref={dialogRef}>
      <div className="dialog">
        <div className="dialog__title">{title}</div>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
