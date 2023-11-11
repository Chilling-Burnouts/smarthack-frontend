const LOCAL_STORAGE_TOKEN = "auth";

export interface IUser {
  username: string;
}

export const setUser = (user: IUser) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN, JSON.stringify(user));
};

export const getUser = (): IUser | null => {
  const item = localStorage.getItem(LOCAL_STORAGE_TOKEN);

  if (!item) return null;

  return JSON.parse(item);
};
