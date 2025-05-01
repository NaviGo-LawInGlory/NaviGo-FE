"use client";

import React from "react";
import InputField from "../components/Input/InputField";
import BtnGoogle from "../components/Btn/BtnGoogle";
import BtnSign from "../components/Btn/BtnSign";
import Link from "next/link";
import SwitchLogin from "./../components/Btn/SwitchLogin";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/dashboard/me");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex justify-between p-[2rem] gap-[5rem]">
      <div className="w-[50%] h-screen pt-[7rem]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
          <h1 className=" text-[2.625rem] text-center font-bold bg-gradient-to-r from-[#A31ABE] to-[#E250CE] bg-clip-text text-transparent">Sign In</h1>
          <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <div className="flex flex-col gap-4 items-center mt-7">
            <BtnSign text={isLoading ? "Signing In..." : "Sign In"} disabled={isLoading} onClick={handleSubmit} />
            <h3 className="text-[#707375] font-medium">OR</h3>
            <BtnGoogle />
            <Link href="/register">
              <SwitchLogin questionText="Don't have an account?" linkText="Sign Up" />
            </Link>
          </div>
        </form>
      </div>
      <div className="w-[60%]">
        <img src="/heroImage.svg" alt="Hero Image" />
      </div>
    </div>
  );
};

export default Login;
