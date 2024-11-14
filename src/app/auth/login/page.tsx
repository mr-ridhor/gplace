// 'use client'
import React from "react";
import Login from "./component/Login";
// import { useState } from "react";
// import { signIn } from "next-auth/react";

const page = () => {
  const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  
  // const handleSubmit = (e: any) =>{
  //   e.preventDefault();

  //   signIn("credentials", {
  //     email,
  //     password,
  //     callbackUrl: "/dashboard",
  //   })
  // }
  return (
    <div>
      <Login />
      {/* <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} name="" id="" />
        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} name="" id="" />
        <input type="submit" value="Login" />
      </form> */}
    </div>
  );
};

export default page;
