import React from "react";
import AuthSidebar from "@/components/auth/AuthSidebar";
import AuthForm from "@/components/auth/AuthForm";

const Signup = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <AuthSidebar
        title="Join Labsync"
        subtitle="Create your account and start collaborating today."
      />
      <AuthForm type="signup" />
    </div>
  );
};

export default Signup;






