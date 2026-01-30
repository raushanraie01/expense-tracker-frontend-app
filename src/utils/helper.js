import moment from "moment";

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getInitials(name) {
  if (!name) return "";
  const words = name.split(" ");

  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
}

export const addThousandsSeperator = (num) => {
  if (num === null || num === undefined) return "0";

  return new Intl.NumberFormat("en-US").format(num); //en-IN for india
};

export const prepareExpenseChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

export const prepareIncomeChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("DD MMM"),
    amount: item?.amount,
    source: item?.source,
  }));
  return chartData;
};
