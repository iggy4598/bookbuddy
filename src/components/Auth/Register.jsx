/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState } from "react";
import { useAddUserMutation } from "../../redux/slices/RegisterSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState(null);
  const [addUser, { isLoading }] = useAddUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError(null);

    try {
      const result = await addUser({ firstname, lastname, email, password }).unwrap();
      if (result) {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      setRegisterError(error?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {registerError && <p style={{ color: "red" }}>{String(registerError)}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;