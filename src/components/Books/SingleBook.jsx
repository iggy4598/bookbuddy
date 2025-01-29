/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchBookDetailsQuery, useCheckoutBookMutation, useReturnBookMutation } from "../../redux/slices/SingleBookSlice";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, error, isLoading } = useFetchBookDetailsQuery(id);
  const { user } = useSelector((state) => state.login);

  const [checkoutBook] = useCheckoutBookMutation();
  const [returnBook] = useReturnBookMutation();
  const [message, setMessage] = useState("");

  if (isLoading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;
  if (!book) return <p>Book not found.</p>;

  const handleCheckout = async () => {
    if (!user) {
      setMessage("You must be logged in to check out a book.");
      return;
    }

    try {
      await checkoutBook({ bookId: id }).unwrap();
      setMessage("Book checked out successfully!");
    } catch (err) {
      setMessage("Failed to check out book.");
    }
  };

  const handleReturn = async () => {
    if (!user) {
      setMessage("You must be logged in to return a book.");
      return;
    }

    try {
      await returnBook({ bookId: id }).unwrap();
      setMessage("Book returned successfully!");
    } catch (err) {
      setMessage("Failed to return book.");
    }
  };

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>{book.description}</p>
      <p>Status: {book.available ? "Available" : "Checked Out"}</p>

      {message && <p style={{ color: "green" }}>{message}</p>}

      {user && book.available && <button onClick={handleCheckout}>Checkout</button>}
      {user && !book.available && <button onClick={handleReturn}>Return Book</button>}
    </div>
  );
};

export default SingleBook;