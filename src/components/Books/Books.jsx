/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useEffect } from "react";
import { useGetBooksQuery } from "../../redux/slices/BooksSlice";

const Books = () => {
  const { data: books, error, isLoading, refetch } = useGetBooksQuery();

  useEffect(() => {
    console.log("Books API response:", books);
  }, [books]);

  const bookList = books && books.books ? books.books : [];

  if (isLoading) return <p>Loading books...</p>;
  if (error)
    return <p style={{ color: "red" }}>Error loading books: {error.message}</p>;

  return (
    <div>
      <h2>Library Books</h2>
      {bookList.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {bookList.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author}
            </li>
          ))}
        </ul>
      )}
      <button onClick={refetch}>Refresh Books</button>
    </div>
  );
};

export default Books;
