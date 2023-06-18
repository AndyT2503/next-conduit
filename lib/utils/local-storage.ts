import { useState } from "react";

export const useLocalStorage = <TData = string>(key: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const item = window.localStorage.getItem(key);
    if (!item) {
      return null;
    }

    try {
      const parsed = JSON.parse(item);
      if (typeof parsed === "object") {
        return parsed;
      }

      return item as TData extends object ? TData : string;
    } catch (e) {
      return item as TData extends object ? TData : string;
    }
  });

  const setItem = (value: TData) => {
    setStoredValue(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const removeItem = () => {
    setStoredValue(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  };

  return [storedValue as (TData extends object ? TData : string) | null, setItem, removeItem] as const;
};
