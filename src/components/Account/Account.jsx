/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/AccountSlice";
import { useFetchAccountDetailsQuery } from "../../redux/slices/AccountSlice";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: accountData, error, isLoading } = useFetchAccountDetailsQuery();
  const { user } = accountData || {};
  const booksCheckedOut = accountData?.booksCheckedOut || [];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (isLoading) {
    return <p>Loading account details...</p>;
  }

  if (!user) {
    return <p>Please log in to view your account.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {booksCheckedOut.length > 0 ? (
        <div>
          <h3>Your Checked-Out Books:</h3>
          <ul>
            {booksCheckedOut.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You have no books checked out.</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;
