import React from "react";

const AuthSidebar = ({ title = "Welcome to Labsync", subtitle }) => {
  return (
    <div
      className="
        hidden md:flex flex-col items-center justify-center
        w-full h-full p-12 text-white
        relative overflow-hidden
        bg-[#0b0f19]
      "
    >
      {/* deep gradient layer */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-gradient-to-br
          from-[#0b0f19]
          via-[#0f1629]
          to-[#0b1220]
        "
      />

      {/* glow effects */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_25%_20%,rgba(56,189,248,0.18),transparent_40%),
               radial-gradient(circle_at_75%_80%,rgba(168,85,247,0.18),transparent_45%)]
        "
      />

      {/* content */}
      <div className="relative z-10 text-center max-w-lg">
        <h1
          className="
            text-5xl font-extrabold tracking-tight
            bg-gradient-to-r
            from-cyan-400 via-fuchsia-500 to-purple-500
            bg-clip-text text-transparent
            drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]
          "
        >
          {title}
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-gray-400">
          {subtitle ||
            "Collaborate, innovate, and streamline your lab workflows seamlessly."}
        </p>
      </div>
    </div>
  );
};

export default AuthSidebar;