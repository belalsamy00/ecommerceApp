import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthorisationContext = createContext();
function AuthorisationContextProvider({ children, Role }) {
  const { userRole } = useContext(AuthContext);
  const [curntRole, setCurntRole] = useState(0);
  useEffect(() => {
    
    const array = userRole.concat(Role);

    const duplicates = array.filter(
      (item, index) => array.indexOf(item) !== index
    );
    setCurntRole(duplicates.length);
    return () => {
    };
  }, [userRole]);

  if (curntRole > 0) {
    return (
      <AuthorisationContext.Provider value={{}}>
        {children}
      </AuthorisationContext.Provider>
    );
  }
}

export default AuthorisationContextProvider;
