export const useLocalStorage = () => {
  const get = (key: string) => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  };

  const set = (key: string, value: any) => {
    const item = JSON.stringify(value);

    localStorage.setItem(key, item);
  };

  return { get, set };
};
