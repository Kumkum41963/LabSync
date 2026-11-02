import React from "react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    // w-screen and h-screen force it to take up the full browser window
    <main className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* Left Column: Full width of its 50% grid track and full height */}
      <div className="w-full h-full flex flex-col justify-center items-center">
        <AuthSidebar
          title="Welcome Back to Labsync"
          subtitle="Login to continue managing your lab efficiently."
        />
      </div>

      {/* Right Column: Full width of its 50% grid track and full height */}
      <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-12">
        <AuthForm type="login" />
      </div>
    </main>
  );
};

export default Login;