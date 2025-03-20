import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutID);
  });
  return debounceValue;
};

export default useDebounce;
