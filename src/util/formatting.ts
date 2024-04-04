export const formatCurrency = (currency: number, noDecimal?: boolean) => {
  return currency.toLocaleString("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: noDecimal ? 0 : 2,
  });
};

export const formatDateTime = (dateStr: Date) => {
  const date = new Date(dateStr);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
  return `${formattedDate} ${formattedTime}`;
};
