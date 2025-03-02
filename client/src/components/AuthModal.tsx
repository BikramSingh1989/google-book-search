import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../graphql/mutations";
import Auth from "../utils/auth";

const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formState, setFormState] = useState({ username: "", email: "", password: "" });

  const [loginUser] = useMutation(LOGIN_USER);
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let { data } = isLogin
        ? await loginUser({ variables: { email: formState.email, password: formState.password } })
        : await addUser({ variables: { ...formState } });

      Auth.login(data?.login?.token || data?.addUser?.token);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border rounded"
              value={formState.username}
              onChange={(e) => setFormState({ ...formState, username: e.target.value })}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={formState.password}
            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 text-lg">
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
