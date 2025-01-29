/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedBook } from "../../redux/slices/SingleBookSlice";
import { useCheckoutBookMutation } from "../../redux/slices/SingleBookSlice";

const SingleBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBook, error } = useSelector((state) => state.singleBook);
  const { user } = useSelector((state) => state.login);
  const [checkoutError, setCheckoutError] = useState(null);

  const [checkoutBook] = useCheckoutBookMutation();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        const data = await response.json();
        dispatch(setSelectedBook(data));
      } catch (err) {
        console.error("Failed to fetch book details:", err);
      }
    };
    fetchBookDetails();
  }, [dispatch, id]);

  const handleCheckout = async () => {
    setCheckoutError(null);
    if (!user) {
      setCheckoutError("You must be logged in to check out a book.");
      return;
    }

    try {
      await checkoutBook({ token: localStorage.getItem("token"), bookId: id }).unwrap();
      alert("Book checked out successfully!");
    } catch (err) {
      setCheckoutError(err?.data || "Failed to check out the book.");
    }
  };

  if (error) return <div>{error}</div>;
  if (!selectedBook) return <div>Loading...</div>;

  return (
    <div>
      <h2>{selectedBook.title}</h2>
      <p>Author: {selectedBook.author}</p>
      <p>{selectedBook.description}</p>
      {checkoutError && <p style={{ color: "red" }}>{checkoutError}</p>}
      {user && <button onClick={handleCheckout}>Checkout</button>}
    </div>
  );
};

export default SingleBook;