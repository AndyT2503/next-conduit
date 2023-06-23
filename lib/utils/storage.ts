export const storageService = (storeType: "localStorage" | "sessionStorage") => {
  const getStorage = () => {
    if (typeof window === "undefined") {
      return null;
    }
    const store = window[storeType];
    if (!store) {
      return null;
    }
    return store;
  };
  const storage = getStorage();
  return {
    getItem: <TData>(key: string) => {
      if (!storage) {
        return null;
      }
      const item = storage.getItem(key);
      if (!item) {
        return null;
      }

      try {
        const parsed = JSON.parse(item);
        if (typeof parsed === "object") {
          return parsed as TData;
        }

        return item as TData extends object ? TData : string;
      } catch (e) {
        return item as TData extends object ? TData : string;
      }
    },
    setItem: (key: string, data: unknown) => {
      if (!storage) return;

      if (typeof data === "object") {
        storage.setItem(key, JSON.stringify(data));
      } else {
        storage.setItem(key, data as string);
      }
    },
    removeItem: (key: string) => {
      if (!storage) return;
      storage.removeItem(key);
    },
  };
};
