import React from "react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthSidebar
        title="Welcome Back to Labsync"
        subtitle="Login to continue managing your lab efficiently."
      />
      <AuthForm type="login" />
    </div>
  );
};

export default Login;

