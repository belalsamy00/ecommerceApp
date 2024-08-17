import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [token, setToken] = useState(false);
  const [userName, setUserName] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userRole, setUserRole] = useState([false]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      setUserName(decoded.name);
      setUserId(decoded.id);
      const UserRole = decoded.role
      if (typeof UserRole === "object") {
        setUserRole([...UserRole]);
      } else {
        setUserRole([UserRole]);
      }
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ token, userName, userId, userRole, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
