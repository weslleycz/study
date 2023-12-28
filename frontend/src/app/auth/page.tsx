"use client";
import { useState } from "react";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </>
  );
};

export default Page;
