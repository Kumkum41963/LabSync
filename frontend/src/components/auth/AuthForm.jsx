import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Get the type of form (login/signup) from props
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

  const isLogin = (type === "login");

  // Handle input changes
  const handleChange = (e) => {
    // chnage or append the form data or state to state -> form (literally)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // send an object to server for destructuring
        // form has got the data from the unput fields
        await handleLogin(formData);
        navigate("/"); // redirect to home/dashboard after login
      } else {
        // sent the entire form data 
        await handleSignup(formData);
        navigate("/");
      }
    } catch (error) {
      console.error(`${isLogin ? "Login" : "Signup"} failed:`, error);
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
    <div className="auth-page">
      <Card className="auth-card text-white">
        <CardContent className="p-8">
          <h2 className="auth-heading">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="auth-label">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="eg. admin"
                  value={formData.name}
                  onChange={handleChange}
                  className="auth-input"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="auth-label">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="eg. admin@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="auth-label">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="eg. admin@123"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
                required
              />
            </div>

            <div>
              <Label htmlFor="role" className="auth-label">
                Role
              </Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="auth-select"
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

            <Button type="submit" disabled={loading} className="auth-btn">
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                  ? "Login"
                  : "Sign Up"}
            </Button>
          </form>

          <p className="auth-link-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="auth-link"
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
