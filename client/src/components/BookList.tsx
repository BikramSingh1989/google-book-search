import React from "react";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK, REMOVE_BOOK } from "../graphql/mutations.ts";
import Auth from "../utils/auth.ts";

interface Book {
  bookId: string;
  authors: string[];
  title: string;
  description?: string;
  image?: string;
  link?: string;
}

interface BookListProps {
  books: Book[];
  isSavedPage?: boolean;
  refetch?: () => void;
}

const BookList: React.FC<BookListProps> = ({ books, isSavedPage, refetch }) => {
  const [saveBook] = useMutation(SAVE_BOOK);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleSaveBook = async (book: Book) => {
    if (!Auth.loggedIn()) {
      alert("Please log in to save books!");
      return;
    }

    try {
      await saveBook({
        variables: { input: { ...book } },
      });
      alert("Book saved!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveBook = async (bookId: string) => {
    try {
      await removeBook({
        variables: { bookId },
      });
      alert("Book removed!");
      refetch && refetch(); // Refresh saved books list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book.bookId} className="border p-4 rounded shadow-md bg-white">
          <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded" />
          <h3 className="text-lg font-bold mt-2">{book.title}</h3>
          <p className="text-sm text-gray-700">By {book.authors?.join(", ") || "Unknown"}</p>
          <p className="text-sm mt-2">{book.description?.slice(0, 100)}...</p>
          <div className="mt-3">
            {isSavedPage ? (
              <button
                onClick={() => handleRemoveBook(book.bookId)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            ) : (
              <button
                onClick={() => handleSaveBook(book)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            )}
            {book.link && (
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 underline"
              >
                View on Google Books
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;

