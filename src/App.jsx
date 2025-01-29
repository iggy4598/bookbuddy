import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation";
import Books from "./components/Books/Books";
import SingleBook from "./components/Books/SingleBook";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Account from "./components/Account/Account";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.login);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Account />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Account />}
        />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />
        <Route path="*" element={<Books />} />
      </Routes>
    </Router>
  );
};

export default App;
