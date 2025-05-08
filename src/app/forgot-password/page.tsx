"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);

  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-white flex flex-col">

      <header className="w-full p-4 flex justify-between">
        <Link href="/login" className="flex items-center gap-2 text-purple-700 font-medium">
          <ArrowLeft size={18} />
          <span>Back to Login</span>
        </Link>
      </header>


      <div className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <motion.div className="bg-white shadow-lg rounded-2xl overflow-hidden p-6 md:p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            <div className="flex justify-center mb-6">
              <Image src="/Sidebar/logoNavigoHitam.svg" alt="NaviGo Logo" width={140} height={40} priority />
            </div>

            {!isSubmitted ? (
              <>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">Forgot Password</h1>
                <p className="text-center text-gray-600 mb-6">Enter your email and we'll send you instructions to reset your password</p>


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
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={isLoading}
                    />
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
                        <Send className="w-5 h-5 mr-2" />
                        Send Reset Link
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Didn't receive an email? Check your spam folder or{" "}
                  <button className="text-purple-600 hover:text-purple-800 font-medium" onClick={() => setIsSubmitted(false)}>
                    try again
                  </button>
                </p>
              </motion.div>
            )}


            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Remember your password?{" "}
                <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                  Back to Sign In
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

