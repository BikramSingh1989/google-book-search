import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../graphql/mutations.ts";
import Auth from "../utils/auth.ts";
import "./LoginSignup.css";

const LoginSignup: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formState, setFormState] = useState({ username: "", email: "", password: "" });

  const [loginUser, { error: loginError }] = useMutation(LOGIN_USER);
  const [addUser, { error: signupError }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let { data } = isLogin
        ? await loginUser({ variables: { email: formState.email, password: formState.password } })
        : await addUser({ variables: { ...formState } });

      Auth.login(data?.login?.token || data?.addUser?.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-0"
              value={formState.username}
              onChange={(e) => setFormState({ ...formState, username: e.target.value })}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-0"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-0"
            value={formState.password}
            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          />

          {/* ✅ Fix: Removed blue border on focus */}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded focus:outline-none focus:ring-0"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {loginError && <p className="text-red-500 text-sm">Login failed. Check your credentials.</p>}
          {signupError && <p className="text-red-500 text-sm">Signup failed. Try again.</p>}
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
