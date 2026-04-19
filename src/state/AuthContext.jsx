import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in, string = username

  // Check if the user is logged in when the page loads
  useEffect(() => {
    fetch('/api/user/isLoggedIn')
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) setUser(data.username);
      })
      .catch(() => {});
  }, []);

  const login = (username) => setUser(username);

  const logout = async () => {
    await fetch('/api/user/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
