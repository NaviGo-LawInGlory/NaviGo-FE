"use client";

import React from "react";
import InputField from "../components/Input/InputField";
import BtnGoogle from "../components/Btn/BtnGoogle";
import BtnSign from "../components/Btn/BtnSign";
import Link from "next/link";
import SwitchLogin from './../components/Btn/SwitchLogin';
import { useState } from "react";


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    return (
    
    <div className="flex justify-between p-[2rem] gap-[5rem]">
        <div className="w-[50%] h-screen pt-[7rem]">
            <form action="" className="flex flex-col gap-3 items-center">
                <div>
                    <h1 className=" text-[2.625rem] text-center font-semibold bg-[#3D3F40] bg-clip-text text-transparent">
                        Create Your
                    </h1>
                    <h1 className=" -mt-4 text-[2.625rem] text-center font-semibold bg-gradient-to-r from-[#A31ABE] to-[#E250CE] bg-clip-text text-transparent">
                        Navigo <span className="bg-[#3D3F40]  bg-clip-text text-transparent">Account</span>
                    </h1>
                </div>
                <InputField label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <InputField label="Password" type="password" value={password} onChange={(e) => setpassword(e.target.value)}/>
                <div className="flex flex-col gap-4 items-center mt-7">
                    <BtnSign text="Sign In"/>
                    <h3 className="text-[#707375] font-medium">OR</h3>
                    <BtnGoogle />
                    <Link href="/login">
                    <SwitchLogin questionText="Already have an account?" linkText="Sign In" />
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

export default Register;
