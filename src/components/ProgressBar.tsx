import React from "react";

type ProgressBarProps = {
  percentage: number;
};

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ "--progress": `${props.percentage.toFixed(2)}%` }}
      >
        <span className="progress-label">{props.percentage.toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
