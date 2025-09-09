// api/booksApi.ts
export type Book = {
  title: string;
  author: string;
  image: string;
  category?: string;
  cover?: string;
  key?: string;        // Open Library work key
  editionKey?: string; // Open Library edition key for reading
};


const fetchBooksByCategory = async (category: string): Promise<Book[]> => {
  try {
    let fetchedBooks: Book[] = [];

    if (category === "All") {
      const categories = ["Science", "Fiction", "Programming", "Financial"];
      for (const cat of categories) {
        const res = await fetch(`https://openlibrary.org/subjects/${cat.toLowerCase()}.json?limit=2`);
        const data = await res.json();
       const mappedBooks = data.works.map((work: any) => ({
  title: work.title,
  author: work.authors?.[0]?.name || "Unknown",
  image: work.cover_id
    ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`
    : "/images/book-placeholder.jpg",
  category: cat,
  key: work.key, // e.g., "/works/OL12345W"
  editionKey: work.edition_key?.[0], // first edition key
}));
        fetchedBooks.push(...mappedBooks);
      }
    } else {
      const res = await fetch(`https://openlibrary.org/subjects/${category.toLowerCase()}.json?limit=8`);
      const data = await res.json();
      fetchedBooks = data.works.map((work: any) => ({
        title: work.title,
        author: work.authors?.[0]?.name || "Unknown",
        image: work.cover_id
          ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`
          : "/images/book-placeholder.jpg",
        category,
      }));
    }

    return fetchedBooks;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export default fetchBooksByCategory;



export const fetchBooksByTitle = async (title: string): Promise<Book[]> => {
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
    );
    const data = await res.json();

    const mappedBooks: Book[] = data.docs.slice(0, 20).map((doc: any) => ({
  title: doc.title,
  author: doc.author_name?.[0] || "Unknown",
  cover: doc.cover_i
    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
    : "/images/book-placeholder.jpg",
  key: doc.key,            // "/works/OL12345W"
  editionKey: doc.edition_key?.[0], // first edition key
}));

    return mappedBooks;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

