/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Slices/AccountSlice";

const Navigation = () => {
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav>
      <ul style={styles.navList}>
        <li>
          <Link to="/books" style={styles.link}>Books</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/account" style={styles.link}>Account</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.button}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" style={styles.link}>Login</Link>
            </li>
            <li>
              <Link to="/register" style={styles.link}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navList: {
    display: "flex",
    gap: "15px",
    listStyle: "none",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "16px",
  },
  button: {
    background: "none",
    border: "none",
    color: "#007bff",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Navigation;