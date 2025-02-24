export const formattedDate = (date: string) => {
  return (
    date?.substring(0, 19).split("T")[0] +
    " " +
    date?.substring(0, 19).split("T")[1]
  );
};
