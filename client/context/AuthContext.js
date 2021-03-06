import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import nextUrl from "../config/NextUrl";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => checkUserLoggedIn(), []);

  const router = useRouter();

  // Register User

  const register = async (user) => {
    console.log(user);
    try {
      const { data, statusText } = await nextUrl.post("/api/register", {
        user,
      });

      if (statusText) {
        setUser(data.user);
        router.push("/account/dashboard");
      }
    } catch (error) {
      setError(error.response.data.message);
      setError(null);
    }
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
        router.push("/account/dashboard");
      }
    } catch (error) {
      setError(error.response.data.message);
      setError(null);
    }
  };

  // Logout User

  const logout = async () => {
    const { statusText } = await nextUrl.post("/api/logout");
    if (statusText) {
      setUser(null);
      router.push("/");
    }
  };

  // Check if user is logged in

  const checkUserLoggedIn = async () => {
    try {
      const { data: user, statusText } = await nextUrl.get("/api/user");

      if (statusText) {
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
