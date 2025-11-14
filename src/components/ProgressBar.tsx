import React from "react";

type ProgressBarProps = {
  percentage: number;
};

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  const adjustColorByPercentage = () => {
    const roundPercentage = Math.round(percentage);
    if (roundPercentage > 70 && roundPercentage < 90) {
      return "orange";
    } else if (roundPercentage > 90) {
      return "#ee5656";
    } else return "#3459d4";
  };
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{
          "--progress": `${Math.round(percentage)}%`,
          backgroundColor: adjustColorByPercentage(),
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
