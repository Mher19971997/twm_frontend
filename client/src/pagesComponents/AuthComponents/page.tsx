"use client";
import { useState } from "react";
import HeadLogin from "@/components/headLogin/HeadLogin";
import HeadRegister from "@/components/headRegister/HeadRegister";
import BottomLogin from "@/components/bottomLogin/BottomLogin";

export default function AuthComponent() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = (state: boolean) => {
    setIsLogin(state);
  };

  return (
    <div>
      {isLogin ? <HeadLogin setIsLogin={setIsLogin} /> : <HeadRegister setIsLogin={setIsLogin} />}
      <BottomLogin isLogin={isLogin} onToggle={handleToggle} />
    </div>
  );
}

