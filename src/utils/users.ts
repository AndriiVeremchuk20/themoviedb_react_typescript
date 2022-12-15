import { localStorageKeys } from "../types/apps";
import { IUser } from "../types/user";

const getUsersList = (): Array<IUser> | null => {
  const usersStorage = localStorage.getItem(localStorageKeys.users);
  if (usersStorage) return JSON.parse(usersStorage) as Array<IUser>;

  return null;
};

export const addUser = (user: IUser) => {
  const users = getUsersList();

  if (users) {
    localStorage.setItem(
      localStorageKeys.users,
      JSON.stringify([user, ...users])
    );
  } else {
    window.localStorage.setItem(localStorageKeys.users, JSON.stringify([user]));
  }
};

export const getUser = (login: string, password: string): IUser | null => {
  const users = getUsersList();

  if (users) {
    let user: IUser | null = null;

    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email.toLowerCase() === login.toLowerCase() &&
        users[i].password === password
      ) {
        user = users[i];
        break;
      }
    }

    return user;
  }

  return null;
};

export const deleteUser = (id: string) => {
  const users = getUsersList();
  if (users) {
    const oUsers = users.filter((user) => user.id !== id);
    localStorage.setItem(localStorageKeys.users, JSON.stringify(oUsers));
  }
};

export const editedUsersData = (user: IUser) => {
  let users = getUsersList();

  if (users) {
    const result = users.map((currUser) => {
      if (currUser.id === user.id) {
        return user;
      }
      return currUser;
    });

    localStorage.setItem(localStorageKeys.users, JSON.stringify(result));
  }
};

export const setCurrUser = (user: IUser) => {
  localStorage.setItem(localStorageKeys.current_user, JSON.stringify(user));
};

export const getCurrUser = (): IUser | null => {
  const currentUser = window.localStorage.getItem(
    localStorageKeys.current_user
  );

  if (currentUser) {
    return JSON.parse(currentUser) as IUser;
  }

  return null;
};

export const deleteCurrUser = () => {
  localStorage.removeItem(localStorageKeys.current_user);
};

export const checkUniqueEmail = (email: string): boolean => {
  const list = getUsersList();
  if (list) return list.some((user) => user.email === email);

  return false;
};
