import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const { handleLogin, handleSignup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);

  const isLogin = (type === "login");

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // send an object to server for destructuring
        await handleLogin({
          email: form.email,
          password: form.password,
          role: form.role,
        });
        navigate("/");
      } else {
        await handleSignup(form);
        navigate("/");
      }
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Signup"} failed:`, error);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // roles arr. disntictified
  const roles = [
    { value: "student", label: "Student" },
    { value: "moderator", label: "Moderator" },
    { value: "lab assistant", label: "Lab Assistant" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <div className="flex items-center justify-center w-full h-full px-6 py-12 bg-[#0b1120]">
      <Card className="w-full max-w-md bg-[#111827]/80 border border-cyan-500/40 shadow-[0_0_40px_-10px_rgba(56,189,248,0.4)] backdrop-blur-md rounded-2xl text-white">
        <CardContent className="p-8 ">
          {/* heading */}
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {/* form holders and labels */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-gray-300 mb-1 ml-1">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="eg. admin"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-[#0f172a] border border-cyan-500/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-300 mb-1 ml-1">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="eg. admin@gmail.com"
                value={form.email}
                onChange={handleChange}
                className="bg-[#0f172a] border border-cyan-500/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            {/* Pwd */}
            <div>
              <Label htmlFor="password" className="text-gray-300 mb-1 ml-1">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="eg. admin@123"
                value={form.password}
                onChange={handleChange}
                className="bg-[#0f172a] border border-cyan-500/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            {/* Role */}

            <div>
              <Label htmlFor="role" className="text-gray-300 ml-1">
                Role
              </Label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full mt-1 bg-[#0f172a] border border-cyan-500/50 text-white rounded-md py-2 px-3 focus:ring-2 focus:ring-cyan-400 outline-none"
                required
              >
                <option value="" disabled>
                  Select your role
                </option>
                {roles.map((role) => (
                  <option value={role.value} key={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Btn */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-pink-500 hover:to-cyan-400 text-white font-semibold py-2 mt-4 transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                  ? "Login"
                  : "Sign Up"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="text-cyan-300 hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Login"}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
