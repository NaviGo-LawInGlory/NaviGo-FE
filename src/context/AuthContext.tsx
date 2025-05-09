"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login as loginApi, register as registerApi, logout as logoutApi } from "@/services/api";
import { updateUserProfile } from "@/services/api/user";
import { UpdateUserProfileRequest } from "@/types/models";

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  google_id: string | null;
  email_verified_at: string | null;
  location?: string;
  phone?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateUserProfileRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  authInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }

      setAuthInitialized(true);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginApi({ email, password });

      setUser(data.data);
      setToken(data.access_token);

      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.access_token);

      router.push("/dashboard/me");
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await registerApi({
        name,
        email,
        password,
        password_confirmation,
      });

      setUser(data.data);
      setToken(data.access_token);

      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("token", data.access_token);

      router.push("/dashboard/me");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  const updateProfile = async (data: UpdateUserProfileRequest) => {
    if (!token || !user) return;

    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await updateUserProfile(data);

      const mergedUser = { ...user, ...updatedUser };
      setUser(mergedUser);

      localStorage.setItem("user", JSON.stringify(mergedUser));
    } catch (err: any) {
      setError(err.message || "An error occurred while updating profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        updateProfile,
        isLoading,
        error,
        authInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

