import { UserRepo, UserData, Item } from "../interfaces/data.interface";

const StorageService = {
  setUserData: function (user: UserData) {
    if (user) {
      localStorage.setItem("UserData", JSON.stringify(user));
    }
  },
  setUserItems: function (items: Item[]) {
    if (items) {
      localStorage.setItem("UserItems", JSON.stringify(items));
    }
  },
  setUsersReposQuery: function (query: string) {
    if (query|| query==='') {
      localStorage.setItem("UsersReposQuery", JSON.stringify(query));
    }
  },
  setUserReposQuery: function (query: string) {
    if (query|| query==='') {
      localStorage.setItem("UserReposQuery", JSON.stringify(query));
    }
  },

  setUsersRepos: function (query: string) {
    if (query) {
      localStorage.setItem("UsersRepos", JSON.stringify(query));
    }
  },
  getUserData: function () {
    if (typeof window !== "undefined") {
      //@ts-ignore
      const User = JSON.parse(localStorage.getItem("UserData"));
      return User;
    } else {
      return {};
    }
  },
  getUserItems: function () {
    if (typeof window !== "undefined") {
      //@ts-ignore
      const UserItems = JSON.parse(localStorage.getItem("UserItems"));
      return UserItems;
    } else {
      return {};
    }
  },
  getUsersReposQuery: function () {
    if (typeof window !== "undefined") {
      //@ts-ignore
      const UsersReposQuery = JSON.parse(localStorage.getItem("UsersReposQuery"));
      return UsersReposQuery;
    } else {
      return {};
    }
  },
  getUserReposQuery: function () {
    if (typeof window !== "undefined") {
      //@ts-ignore
      const UserReposQuery = JSON.parse(localStorage.getItem("UserReposQuery"));
      return UserReposQuery;
    } else {
      return {};
    }
  },
  getUsersRepos: function () {
    if (typeof window !== "undefined") {
      //@ts-ignore
      const UsersRepos = JSON.parse(localStorage.getItem("UsersRepos"));
      return UsersRepos;
    } else {
      return {};
    }
  },
  removeUserData: function () {
    localStorage.removeItem("UserData");
  },
  removeUserItems: function () {
    localStorage.removeItem("UserItems");
  },
  removeUsersReposQuery: function () {
    localStorage.removeItem("UsersReposQuery");
  },
  removeUserReposQuery: function () {
    localStorage.removeItem("UserReposQuery");
  },

  removeUsersRepos: function () {
    localStorage.removeItem("UsersRepos");
  },
};

export default StorageService;
