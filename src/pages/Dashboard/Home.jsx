import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import InfoCard from "../../components/Card/InfoCard.jsx";
import RecentTransactions from "../../components/Dashboard/RecentTransactions.jsx";
import FinanceOverview from "../../components/Dashboard/FinanceOverview.jsx";
import ExpenseTransaction from "../../components/Dashboard/ExpenseTransaction.jsx";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses.jsx";
import Last60DaysIncomes from "../../components/Dashboard/Last60DaysIncomes.jsx";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { addThousandsSeperator } from "../../utils/helper.js";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import IncomeTransaction from "../../components/Dashboard/IncomeTransaction.jsx";

function Home({ setActiveMenu, activeMenu }) {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  //custom hook
  useUserAuth();

  // fetching dashboard data
  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await api.get(API_PATHS.DASHBOARD.GET_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong. Please try again later", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);
  console.log(dashboardData);
  return (
    <DashboardLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeperator(dashboardData?.balance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeperator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeperator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.lastTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.balance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
          <IncomeTransaction
            transactions={dashboardData?.last60DaysIncome?.transactions}
            onSeeMore={() => navigate("/income")}
          />
          <Last60DaysIncomes
            data={dashboardData?.last60DaysIncome?.transactions}
          />
          <ExpenseTransaction
            transactions={dashboardData?.last30DaysExpenses?.transactions}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
