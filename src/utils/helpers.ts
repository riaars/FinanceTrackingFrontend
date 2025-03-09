export const formattedDate = (date: string) => {
  return date?.split("T")[0];
};

export const isEmailValid = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const getPercentage = (current: number, previous: number) => {
  let percentage = (current - previous) / previous;
  return previous > 0 ? (percentage * 100).toFixed() + "%" : "+100%";
};
