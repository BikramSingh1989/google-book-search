const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

export const searchGoogleBooks = async (query: string) => {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return { items: [] }; // Return empty array on error
  }
};
