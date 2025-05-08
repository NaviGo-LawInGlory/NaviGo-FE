"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus, ArrowLeft, Check, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const { register, isLoading, error } = useAuth();
  const router = useRouter();

  const passwordStrength = (): { strength: number; text: string; color: string } => {
    if (!password) return { strength: 0, text: "", color: "bg-gray-200" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const strengthMap = [
      { text: "Weak", color: "bg-red-500" },
      { text: "Fair", color: "bg-orange-500" },
      { text: "Good", color: "bg-yellow-500" },
      { text: "Strong", color: "bg-green-500" },
    ];

    return {
      strength,
      text: strengthMap[strength - 1]?.text || "",
      color: strengthMap[strength - 1]?.color || "bg-gray-200",
    };
  };

  const validateForm = () => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
    } = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      errors.terms = "You must agree to the Terms and Privacy Policy";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await register(name, email, password, confirmPassword);
  };

  const { strength, text: strengthText, color: strengthColor } = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-white flex flex-col">

      <header className="w-full p-4 flex justify-between">
        <Link href="/" className="flex items-center gap-2 text-purple-700 font-medium">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </header>


      <div className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-lg">
          <motion.div className="bg-white shadow-lg rounded-2xl overflow-hidden p-6 md:p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            <div className="flex justify-center mb-6">
              <Image src="/Sidebar/logoNavigoHitam.svg" alt="NaviGo Logo" width={140} height={40} priority />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">Create Account</h1>
            <p className="text-center text-gray-600 mb-6">Sign up to get started with NaviGo</p>


            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFormErrors({ ...formErrors, name: undefined });
                  }}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? "border-red-300 bg-red-50" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  disabled={isLoading}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>


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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
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
                {formErrors.password ? (
                  <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                ) : password ? (
                  <div className="mt-1">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full ${strengthColor}`} style={{ width: `${(strength / 4) * 100}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Password strength: <span className="font-medium">{strengthText}</span>
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="flex items-center text-xs text-gray-600">
                        {/[A-Z]/.test(password) ? <Check size={14} className="text-green-500 mr-1" /> : <X size={14} className="text-gray-400 mr-1" />}
                        Uppercase letter
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        {/[0-9]/.test(password) ? <Check size={14} className="text-green-500 mr-1" /> : <X size={14} className="text-gray-400 mr-1" />}
                        Number
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        {password.length >= 8 ? <Check size={14} className="text-green-500 mr-1" /> : <X size={14} className="text-gray-400 mr-1" />}
                        At least 8 characters
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        {/[^A-Za-z0-9]/.test(password) ? <Check size={14} className="text-green-500 mr-1" /> : <X size={14} className="text-gray-400 mr-1" />}
                        Special character
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>


              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setFormErrors({ ...formErrors, confirmPassword: undefined });
                    }}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10`}
                    disabled={isLoading}
                  />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
              </div>


              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => {
                        setAgreeToTerms(e.target.checked);
                        setFormErrors({ ...formErrors, terms: undefined });
                      }}
                      className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="text-gray-600">
                      I agree to the{" "}
                      <Link href="/terms" className="text-purple-600 hover:text-purple-800">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-purple-600 hover:text-purple-800">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
                {formErrors.terms && <p className="text-red-500 text-xs mt-1">{formErrors.terms}</p>}
              </div>


              <motion.button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl flex items-center justify-center font-medium transition-shadow hover:shadow-lg mt-6"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" color="white" />
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
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
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
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
                Already have an account?{" "}
                <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                  Sign In
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

