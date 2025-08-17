import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on first load
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const { user } = await res.json();
          setUser(user);
          localStorage.setItem("servix_user", JSON.stringify(user));
        } else {
          setUser(null);
          localStorage.removeItem("servix_user");
        }
      } catch {
        setUser(null);
        localStorage.removeItem("servix_user");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (userObj) => {
    localStorage.setItem("servix_user", JSON.stringify(userObj));
    setUser(userObj);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    localStorage.removeItem("servix_user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
