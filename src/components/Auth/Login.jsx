/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState } from "react";
import { useAddLoginMutation } from "../../redux/slices/LoginSlice";
import { useGetBooksQuery } from "../../redux/slices/BooksSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [addLogin, { isLoading }] = useAddLoginMutation();
  const { refetch } = useGetBooksQuery();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const result = await addLogin({ email, password }).unwrap();
      if (result) {
        alert("Login successful!");
        refetch(); 
        navigate("/books");
      }
    } catch (error) {
      setLoginError(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {loginError && <p style={{ color: "red" }}>{String(loginError)}</p>}
      <form onSubmit={handleSubmit}>
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
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
