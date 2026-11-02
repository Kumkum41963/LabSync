import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const { handleLogin, handleSignup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const isLogin = type === "login";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await handleLogin(formData);
        navigate("/");
      } else {
        await handleSignup(formData);
        navigate("/");
      }
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Signup"} failed:`, error);
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "student", label: "Student" },
    { value: "moderator", label: "Moderator" },
    { value: "lab_assistant", label: "Lab Assistant" },
    { value: "admin", label: "Admin" },
  ];

  return (
    // Full width of its grid column, centered flex layout
    <div className="w-full flex justify-center items-center p-6 md:p-12">
      <Card className="w-full max-w-md bg-transparent border-none text-white shadow-none">
        <CardContent className="p-0 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-300 gap-1">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="eg. admin"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="eg. admin@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="eg. admin@123"
                value={formData.password}
                onChange={handleChange}
                className="bg-slate-900/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500"
                required
              />
            </div>

            {/* Role selection only on Sign Up */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-slate-300">
                  Role
                </Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-md bg-slate-900/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required={!isLogin}
                >
                  <option value="" disabled className="bg-slate-900 text-slate-400">
                    Select your role
                  </option>
                  {roles.map((role) => (
                    <option value={role.value} key={role.value} className="bg-slate-900 text-white">
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold py-2 px-4 rounded-md transition-all duration-200"
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

          <p className="text-sm text-slate-400 text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="text-cyan-400 hover:underline font-medium ml-1"
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