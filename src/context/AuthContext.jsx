import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import * as authService from '../services/authService.js';
import { trackEvent } from '../utils/analytics.js';
import {
  AUTH_UNAUTHORIZED_EVENT,
  clearAuth,
  getStoredUser,
  getToken,
  saveAuth,
} from '../utils/authStorage.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getToken());
  const [loading, setLoading] = useState(() => Boolean(getToken()));

  const applyAuth = useCallback((data) => {
    const nextUser = { _id: data._id, nama: data.nama, email: data.email };
    saveAuth(data.token, nextUser);
    setToken(data.token);
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(
    async (email, password) => {
      const data = await authService.login({ email, password });
      applyAuth(data);
      trackEvent('login', { method: 'password' });
      return data;
    },
    [applyAuth]
  );

  const register = useCallback(
    async (nama, email, password) => {
      const data = await authService.register({ nama, email, password });
      applyAuth(data);
      trackEvent('register', { method: 'password' });
      return data;
    },
    [applyAuth]
  );

  // Revalidate a stored token once on mount
  useEffect(() => {
    let active = true;

    if (!getToken()) {
      setLoading(false);
      return () => {
        active = false;
      };
    }

    (async () => {
      try {
        const data = await authService.getMe();
        if (active) setUser(data);
      } catch {
        if (!active) return;
        clearAuth();
        setToken(null);
        setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // Global 401 handling coming from the axios interceptor
  useEffect(() => {
    const handleUnauthorized = () => {
      setToken(null);
      setUser(null);
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    return () =>
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [user, token, loading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth harus dipakai di dalam AuthProvider');
  }

  return context;
}
