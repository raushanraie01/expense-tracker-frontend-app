import React, { useEffect, useState } from "react";
import { prepareIncomeChartData } from "../../utils/helper.js";
import CustomBarChart from "../Charts/CustomBarChart.jsx";

function Last60DaysIncomes({ data }) {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareIncomeChartData(data);
    setChartData(result);
    return () => {};
  }, [data]);
  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Incomes</h5>
      </div>
      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
}

export default Last60DaysIncomes;
