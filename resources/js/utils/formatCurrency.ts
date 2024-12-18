export function formatCurrency(amount: number | string, currency = "IDR", locale = "id-ID") {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(parseInt(amount.toString()));
  } catch (error) {
    return amount;
  }
}
