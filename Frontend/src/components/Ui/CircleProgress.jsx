import { useState, useEffect } from "react";

function CircleProgress({
  totalQuantity = 0,
  targetValue = 2000,
  size = 120,
  strokeWidth = 8,
  color = "#3b82f6",
  bgColor = "#e5e7eb",
}) {
  const [progress, setProgress] = useState(0);

  // Calculate target percentage
  const percentage = Math.min((totalQuantity / targetValue) * 100, 100);

  // Animate progress
  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 1;
      if (start <= percentage) {
        setProgress(start);
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [percentage]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${progress * 3.6}deg, ${bgColor} 0deg)`,
        borderRadius: "50%",
      }}
    >
      {/* Inner circle */}
      <div
        className="bg-white rounded-full flex flex-col items-center justify-center"
        style={{
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
        }}
      >
        <span className="text-lg font-bold text-blue-600">
          {Math.round(progress)}%
        </span>
        <span className="text-xs text-gray-500">
          {totalQuantity}/{targetValue}
        </span>
      </div>
    </div>
  );
}

export default CircleProgress;
