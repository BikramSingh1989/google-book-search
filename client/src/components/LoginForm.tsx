import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../public/graphql/mutations";
import Auth from "../../public/utils/auth";

const LoginForm = () => {
  const [loginUser] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({ email: "", password: "" });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await loginUser({ variables: { ...formState } });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="email"
        name="email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={(e) => setFormState({ ...formState, password: e.target.value })}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
