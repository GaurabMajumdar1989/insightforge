import { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginService,
  signup as signupService,
  refreshToken as refreshService,
  getCurrentUser,
  getStoredRefreshToken,
  clearRefreshToken
} from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login on page refresh using refresh token
  useEffect(() => {
    const initializeAuth = async () => {
      const refresh = getStoredRefreshToken();
      if (!refresh) {
        setLoading(false);
        return;
      }

      try {
        const newTokens = await refreshService();
        if (newTokens?.accessToken) {
          setAccessToken(newTokens.accessToken);

          const userData = await getCurrentUser(newTokens.accessToken);
          setUser(userData);
        }
      } catch (err) {
        clearRefreshToken();
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);


  // ---------- LOGIN ----------
  const login = async (email, password) => {
    const tokens = await loginService(email, password);
    setAccessToken(tokens.accessToken);

    const me = await getCurrentUser(tokens.accessToken);
    setUser(me);

    return true;
  };


  // ---------- SIGNUP ----------
  const signup = async (data) => {
    const newUser = await signupService(data);
    return newUser;
  };


  // ---------- LOGOUT ----------
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    clearRefreshToken();
  };


  const value = {
    user,
    accessToken,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


// Hook for using auth easily
export const useAuth = () => useContext(AuthContext);
