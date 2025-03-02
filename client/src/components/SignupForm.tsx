import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  const [formState, setFormState] = useState({ username: "", email: "", password: "" });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...formState } });

      if (data?.addUser?.token) {
        Auth.login(data.addUser.token);
      }
    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
      {error && <p className="error">Signup failed. Try again.</p>}
    </form>
  );
};

export default SignupForm;
