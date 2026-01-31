import React, { useState, useRef } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
const AddIncomeForm = ({ onAddIncome }) => {
  const [error, setError] = useState("");
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const dateRef = useRef(null);
  const handleChange = (key, value) => {
    setIncome((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    if (!income.source || !income.amount || !income.date) return;

    if (isNaN(Number(income.amount))) {
      setError("Amount must be number!");
      return;
    }

    onAddIncome({
      ...income,
      amount: Number(income.amount),
    });

    // reset form
    setIncome({
      source: "",
      amount: "",
      date: "",
      icon: "",
    });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={(src) => handleChange("source", src)}
        label="Income Source"
        placeholder="Freelance, Salary, etc"
        type="text"
      />

      <Input
        value={income.amount}
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
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
