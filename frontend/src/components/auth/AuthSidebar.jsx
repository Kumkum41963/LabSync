import React from "react";

const AuthSidebar = ({ title = "Welcome to Labsync", subtitle }) => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1a103d] to-[#0a192f] text-white p-10 w-full h-full">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          {title}
        </h1>
        <p className="mt-4 text-gray-300 text-lg max-w-md mx-auto">
          {subtitle ||
            "Collaborate, innovate, and streamline your lab workflows seamlessly."}
        </p>
      </div>
    </div>
  );
};

export default AuthSidebar;
