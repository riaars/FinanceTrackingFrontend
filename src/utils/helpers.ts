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

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | undefined;
  return function (...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => func(...args), delay);
  };
}

export const adjustColorByPercentage = (percentage: number) => {
  const roundPercentage = Math.round(percentage);
  if (roundPercentage > 70 && roundPercentage < 90) {
    return "orange";
  } else if (roundPercentage > 90) {
    return "#ee5656";
  } else return "#3459d4";
};

export const groupToChartData = <T extends Record<string, number>>(obj: T) => {
  return Object.entries(obj).map(([name, value]) => ({ name, value }));
};
