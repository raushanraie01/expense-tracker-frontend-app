import React, { useState, useRef } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [error, setError] = useState("");
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const dateRef = useRef(null);
  const handleChange = (key, value) => {
    setExpense((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    if (!expense.category || !expense.amount) return;

    if (isNaN(Number(expense.amount))) {
      setError("Amount must be number!");
      return;
    }

    onAddExpense({
      ...expense,
      amount: Number(expense.amount),
    });

    // reset form
    setExpense({
      category: "",
      amount: "",
      date: "",
      icon: "",
    });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.source}
        onChange={(src) => handleChange("category", src)}
        label="Expense Category"
        placeholder="Food,Transport Shopping,Rent, etc"
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={(amt) => handleChange("amount", amt)}
        label="Amount"
        placeholder="1000000"
        type="text"
      />
      <p className="px-2 text-sm text-red-700">{error}</p>

      <div onClick={() => dateRef.current?.showPicker()}>
        <label className="text-[13px] text-slate-800">Date</label>
        <div className="input-box">
          <input
            type="date"
            className="w-full bg-transparent outline-none"
            ref={dateRef}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
