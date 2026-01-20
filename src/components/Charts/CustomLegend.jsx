import React from "react";

function CustomLegend({ payload }) {
  if (!payload || !payload.length) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm space-x-6">
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center gap-2 space-x-2"
        >
          {/* Color indicator */}
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />

          {/* Label */}
          <span className="text-xs text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CustomLegend;
