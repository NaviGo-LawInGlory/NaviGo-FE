"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, CreditCard, Calendar, Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [planTitle, setPlanTitle] = useState<string>("");
  const [planPrice, setPlanPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const title = searchParams.get("plan");
    const price = searchParams.get("price");

    if (title) setPlanTitle(title);
    if (price) setPlanPrice(parseInt(price, 10) || 0);

    if (!title || !price) {
      router.push("/#pricing");
    }
  }, [searchParams, router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    }

    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    if (!expiryDate.trim()) {
      newErrors.expiryDate = "Expiration date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = "Please enter a valid expiration date (MM/YY)";
    } else {
      const [month, year] = expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = "Card has expired";
      }
    }

    if (!cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));


      setPaymentSuccess(true);
    } catch (err: any) {
      setErrors({
        form: err.message || "Payment processing failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");

    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }

    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
    if (errors.cardNumber) {
      setErrors({ ...errors, cardNumber: "" });
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
    if (errors.expiryDate) {
      setErrors({ ...errors, expiryDate: "" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (field === "cardName") setCardName(e.target.value);
    if (field === "cvv") setCvv(e.target.value.replace(/\D/g, "").slice(0, 3));

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  if (!planTitle && !planPrice && !paymentSuccess) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => router.push("/#pricing")} className="flex items-center text-gray-600 mb-8 hover:text-purple-700 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Pricing
          </button>

          {paymentSuccess ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-2xl shadow-md text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for subscribing to NaviGo <span className="font-semibold text-purple-700">{planTitle}</span> plan. You now have access to premium features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => router.push("/dashboard/me")} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                  Go to Dashboard
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white p-6 sm:p-8 rounded-2xl shadow-md">
                  <h1 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h1>

                  {errors.form && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">{errors.form}</div>}

                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-5">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        value={cardName}
                        onChange={(e) => handleInputChange(e, "cardName")}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 border ${errors.cardName ? "border-red-300 bg-red-50" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200`}
                        required
                      />
                      {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                    </div>

                    <div className="mb-5">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-4 py-3 border ${errors.cardNumber ? "border-red-300 bg-red-50" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pl-12 transition-colors duration-200`}
                          required
                          maxLength={19}
                        />
                        <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            className={`w-full px-4 py-3 border ${errors.expiryDate ? "border-red-300 bg-red-50" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pl-12 transition-colors duration-200`}
                            required
                            maxLength={5}
                          />
                          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => handleInputChange(e, "cvv")}
                            placeholder="123"
                            className={`w-full px-4 py-3 border ${errors.cvv ? "border-red-300 bg-red-50" : "border-gray-200"} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pl-12 transition-colors duration-200`}
                            required
                            maxLength={3}
                          />
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <LoadingSpinner size="sm" color="white" />
                            <span className="ml-2">Processing...</span>
                          </>
                        ) : (
                          <>Pay Now</>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center mt-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <span>Your payment information is secure and encrypted</span>
                      </div>
                    </div>
                  </form>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-md h-fit">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium text-gray-800">{planTitle}</span>
                  </div>

                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Billing</span>
                    <span className="font-medium text-gray-800">Monthly</span>
                  </div>

                  <div className="border-t border-gray-200 my-4"></div>

                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-800">Rp {planPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-800">Rp 0</span>
                  </div>

                  <div className="border-t border-gray-200 my-4"></div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="font-bold text-purple-700">Rp {planPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center text-sm text-purple-700 mb-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

