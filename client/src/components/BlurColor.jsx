import React from "react";

const BlurColor = ({
  top = "auto",
  left = "auto",
  right = "auto",
  bottom = "auto",
  size = 400,
  gradient = "from-red-800/65 via-red-700/50 to-purple-800/65",
}) => {
  return (
    <div
      className={`pointer-events-none absolute -z-50 rounded-full blur-[120px]
        bg-gradient-to-tr ${gradient}`}
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
      }}
    />
  );
};

export default BlurColor;
