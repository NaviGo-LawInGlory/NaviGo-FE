"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading, error } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-white flex flex-col">

      <header className="w-full p-4 flex justify-between">
        <Link href="/" className="flex items-center gap-2 text-purple-700 font-medium">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </header>


      <div className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <motion.div className="bg-white shadow-lg rounded-2xl overflow-hidden p-6 md:p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            <div className="flex justify-center mb-6">
              <Image src="/Sidebar/logoNavigoHitam.svg" alt="NaviGo Logo" width={140} height={40} priority />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">Welcome Back</h1>
            <p className="text-center text-gray-600 mb-6">Sign in to access your account</p>


            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormErrors({ ...formErrors, email: undefined });
                  }}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? "border-red-300 bg-red-50" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  disabled={isLoading}
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>


              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFormErrors({ ...formErrors, password: undefined });
                    }}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.password ? "border-red-300 bg-red-50" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10`}
                    disabled={isLoading}
                  />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
              </div>


              <motion.button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl flex items-center justify-center font-medium transition-shadow hover:shadow-lg"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" color="white" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </motion.button>
            </form>


            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign in with</span>
                </div>
              </div>

              <div className="mt-6">
                <button type="button" className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <img className="h-5 w-5 mr-2" src="/google.svg" alt="Google icon" />
                  Google
                </button>
              </div>
            </div>


            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-purple-600 hover:text-purple-800 font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>


      <footer className="p-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} NaviGo. All rights reserved.</p>
      </footer>
    </div>
  );
}

