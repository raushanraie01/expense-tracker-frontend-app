// import React from "react";
// import {
//   Bar,
//   BarChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";

// function CustomBarChart({ data }) {
//   // Alternate bar colors
//   const getBarColor = (index) => (index % 2 === 0 ? "#875cf5" : "#cfbefb");

//   const CustomTooltip = ({ active, payload }) => {
//     if (!active || !payload || !payload.length) return null;

//     const { source, category, amount } = payload[0].payload;

//     return (
//       <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
//         <p className="text-sm font-semibold text-purple-800 mb-1">
//           {source ? source : category}
//         </p>
//         <p className="text-sm text-gray-600">
//           Amount: <span className="font-bold">$ {amount}</span>
//         </p>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white mt-6 p-4 rounded-lg">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid stroke="none" />
//           <XAxis
//             dataKey="month"
//             tick={{ fontSize: 12, fill: "#555" }}
//             stroke="none"
//           />
//           <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
//           <Tooltip content={<CustomTooltip />} />
//           <Bar
//             dataKey="amount"
//             radius={[10, 10, 0, 0]}
//             barSize={40}
//             fill="#875cf5"
//           >
//             {data.map((_, index) => (
//               <Cell key={index} fill={getBarColor(index)} />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default CustomBarChart;

import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

function CustomBarChart({ data = [] }) {
  console.log("DAta", data);
  const getBarColor = (index) => (index % 2 === 0 ? "#875cf5" : "#cfbefb");

  return (
    <div className="bg-white mt-6 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />

          <YAxis
            stroke="none"
            tick={{ fontSize: 12, fill: "#555" }}
            domain={[0, "dataMax + 5000"]}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="amount"
            barSize={60}
            radius={[12, 12, 0, 0]}
            fill="#875cf5"
          >
            {data.map((item, index) => (
              <Cell key={item.key} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const { source, category, amount } = payload[0].payload;

  return (
    <div className="bg-white shadow-md rounded-lg p-2 border">
      <p className="text-sm font-semibold text-purple-800 mb-1">
        {source || category}
      </p>
      <p className="text-sm text-gray-600">
        Amount: <span className="font-bold">₹{amount}</span>
      </p>
    </div>
  );
};
