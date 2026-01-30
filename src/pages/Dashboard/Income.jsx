import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import IncomeOverview from "../../components/Income/IncomeOverview.jsx";
import api from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";

function Income() {
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOPenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  useUserAuth();

  //Get All income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      if (response.data) {
        setIncomeData(response.data?.data);
      }
    } catch (error) {
      console.log("something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);
  console.log(incomeData);

  //handle Add income
  const handleAddIncome = async () => {};
  //Delete Income
  const handleDeleteIncome = async () => {};

  //handle download income details
  const handleDownloadIncomeDetails = async () => {};
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Income;
