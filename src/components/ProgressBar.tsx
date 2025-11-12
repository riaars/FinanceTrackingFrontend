import React from "react";

type ProgressBarProps = {
  percentage: number;
};

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ "--progress": `${props.percentage}%` }}
      >
        <span className="progress-label">{props.percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
