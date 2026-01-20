import React from "react";

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const { name, amount } = payload[0].payload;

  return (
    <div className="bg-white shadow-lg rounded-md px-3 py-2 border border-gray-200">
      <p className="text-sm font-semibold text-purple-800 mb-1">{name}</p>
      <p className="text-sm text-gray-600">
        Amount: <span className="font-bold">₹ {amount}</span>
      </p>
    </div>
  );
}

export default CustomTooltip;
