import React, { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
  title: "Dashboard" | "Settings" | "Transactions";
}
function Content({ children, title }: ContentProps) {
  return (
    <div className="content__container">
      <div className="content__title">{title}</div>
      <div className="content__body">{children}</div>
    </div>
  );
}

export default Content;
