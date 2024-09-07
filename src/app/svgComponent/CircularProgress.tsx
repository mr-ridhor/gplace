import React from "react";
import "../globals.css";

interface CircularProgressProps {
  percentage: number;
  circleWidth: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  circleWidth,
}) => {
  const radius = 15;
  const dashArray = radius * Math.PI * 2;
  const dashOff = dashArray - (dashArray * percentage) / 100;

  return (
    <div>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          r={radius}
          strokeWidth="0px"
          className="circle-b"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          r={radius}
          strokeWidth="2px"
          className="circle-pr"
          style={{ strokeDasharray: dashArray, strokeDashoffset: dashOff }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dy="0.2rem"
          textAnchor="middle"
          fill="#ddd"
          className="circle-text text-red-200"
        >
          {percentage}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
