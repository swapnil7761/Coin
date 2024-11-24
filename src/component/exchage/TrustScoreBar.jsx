import React from "react";

const TrustScoreBar = ({ trust_score }) => {
  const radius = 30; // Radius of the arc
  const centerX = 36; // Center of the arc (SVG center horizontally)
  const centerY = 35; // Vertical center for the arc's baseline

  // Calculate the angle (in radians) for the trust score
  const angle = (Math.PI * trust_score) / 10; // Map trust score (0-10) to angle (0-π)

  // Calculate the position of the circle on the arc
  const circleX = centerX + radius * Math.cos(Math.PI - angle); // Invert angle to start from the top
  const circleY = centerY - radius * Math.sin(Math.PI - angle);

  // Utility function to calculate arc paths
  const calculateArcPath = (startAngle, endAngle, color) => {
    const startX = centerX + radius * Math.cos(Math.PI - startAngle);
    const startY = centerY - radius * Math.sin(Math.PI - startAngle);
    const endX = centerX + radius * Math.cos(Math.PI - endAngle);
    const endY = centerY - radius * Math.sin(Math.PI - endAngle);

    return (
      <path
        d={`M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`}
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    );
  };

  return (
    <div
      data-role="progressbar-wrapper"
      style={{
        position: "relative",
        width: "72px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <svg width="72" height="40" viewBox="0 0 72 40">
        {calculateArcPath(0, Math.PI / 4, "#EA3943")}
        {calculateArcPath(Math.PI / 4, Math.PI / 2, "#EA8C00")}
        {calculateArcPath(Math.PI / 2, (3 * Math.PI) / 4, "#F3D42F")}
        {calculateArcPath((3 * Math.PI) / 4, Math.PI, "#16C784")}
        <path
          d={`M 6 35 A 30 30 0 0 1 ${circleX} ${circleY}`}
          stroke="transparent"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx={circleX}
          cy={circleY}
          r="4"
          fill="none"
          stroke="white"
          strokeWidth="2"
        ></circle>
        <circle cx={circleX} cy={circleY} r="3" fill="black"></circle>
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: "0px",
          width: "100%",
          textAlign: "center",
          marginBottom: "1px",
        }}
      >
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
          {trust_score}
        </div>
        <div style={{ fontSize: "12px" }}>
          {trust_score >= 9
            ? "Excellent"
            : trust_score >= 7
            ? "Good"
            : trust_score >= 5
            ? "Average"
            : trust_score >= 3
            ? "Low"
            : "Very Low"}
        </div>
      </div>
    </div>
  );
};

export default TrustScoreBar;
