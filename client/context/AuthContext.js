import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosConfig from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register User

  const register = async (user) => {
    console.log(user);
  };

  // Login User
  const login = async ({ email: identifier, password }) => {
    console.log({ identifier, password });
  };
  // Logout User

  const logout = async () => {
    console.log("logout");
  };

  // Check if user is logged in

  const checkUserLoggedIn = async (user) => {
    console.log("logout");
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
