import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import nextUrl from "../config/NextUrl";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Register User

  const register = async (user) => {
    console.log(user);
  };

  // // Login User
  const login = async ({ email: identifier, password }) => {
    try {
      const { data, statusText } = await nextUrl.post("/api/login", {
        identifier,
        password,
      });

      if (statusText) {
        setUser(data.user);
      }
    } catch (error) {
      setError(error.response.data.message);
      setError(null);
    }
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
