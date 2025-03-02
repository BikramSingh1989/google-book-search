import React, { useState } from "react";

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload

    if (!searchInput.trim()) {
      alert("Please enter a search term!");
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data = await response.json();
      setBooks(data.items || []);
      console.log("Search Results:", data.items);
    } catch (error) {
      console.error(error);
      alert("Error fetching search results!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-32">
      {/* Search Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">SEARCH FOR BOOKS!</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          placeholder="Enter book title..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-[500px] px-4 py-3 border border-gray-400 rounded-md text-lg shadow-md"
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 text-lg transition-all"
        >
          Submit Search
        </button>
      </form>

      {/* Display Search Results */}
      <div className="mt-6 w-full max-w-4xl">
        {books.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book: any) => (
              <li key={book.id} className="bg-white p-4 shadow-md rounded-md">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                  alt={book.volumeInfo.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-semibold mt-2">{book.volumeInfo.title}</h3>
                <p className="text-sm text-gray-700">{book.volumeInfo.authors?.join(", ")}</p>
                <a
                  href={book.volumeInfo.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mt-2 inline-block"
                >
                  View Book
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-lg mt-4">No books found.</p>
        )}
      </div>
    </div>
  );
};

<div className="mt-32 pt-20 text-center">
  <h2 className="text-3xl font-bold">Welcome to Book Search</h2>
</div>

export default SearchBooks;
