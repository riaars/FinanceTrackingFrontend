export const formattedDate = (date: string) => {
  return date?.substring(0, 19).split("T")[0];
};

export const isEmailValid = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
