import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import ExpenseOverview from "../../components/Expense/ExpenseOverview.jsx";
import api from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import Modal from "../../components/Modal.jsx";
import AddExpenseForm from "../../components/Expense/AddExpenseForm.jsx";
function Expense({ setActiveMenu, activeMenu }) {
  const [openAddExpenseModel, setOpenExpenseModel] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  useUserAuth();

  //Get All expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      if (response.data) {
        setExpenseData(response.data?.data);
      }
    } catch (error) {
      console.log("something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);
  console.log(expenseData);

  //handle Add expense
  const handleAddExpense = async (currentExpense) => {
    console.log("Expense added successfully", currentExpense);
    setOpenAddExpenseModel(false);
  };
  //Delete expense
  const handleDeleteExpense = async () => {};

  //handle download expense details
  const handleDownloadExpenseDetails = async () => {};
  return (
    <DashboardLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenExpenseModel(true)}
            />
          </div>
        </div>
        <Modal
          isOpen={openAddExpenseModel}
          onClose={() => setOpenExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Expense;
