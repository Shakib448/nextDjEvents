import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import nextUrl from "../config/NextUrl";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register User

  const register = async (user) => {
    console.log(user);
  };

  // // Login User
  // const login = async ({ email: identifier, password }) => {
  //   const { data, statusText } = await nextUrl.post("/api/login", {
  //     identifier,
  //     password,
  //   });

  //   console.log(data);

  //   if (statusText) {
  //     setUser(data.user);
  //   } else {
  //     setError(data.message);
  //     setError(null);
  //   }
  // };

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      // router.push('/account/dashboard')
    } else {
      setError(data.message);
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
