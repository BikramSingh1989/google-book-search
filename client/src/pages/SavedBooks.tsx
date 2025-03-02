import React from "react";
import { REMOVE_BOOK } from "../../src/graphql/mutations.ts";
import "./SavedBooks.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../graphql/queries.ts";





const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || { savedBooks: [] };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await removeBook({ variables: { bookId } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* UI Code */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {userData.savedBooks.map((book) => (
            <div key={book.bookId}>
              <h3>{book.title}</h3>
              <button onClick={() => handleDeleteBook(book.bookId)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedBooks;
