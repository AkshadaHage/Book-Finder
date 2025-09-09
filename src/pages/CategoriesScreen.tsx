// pages/CategoriesScreen.tsx
import React, { useState, useEffect } from "react";
import fetchBooksByCategory, { Book } from "../api_service/Book_API";
import { FaHeart, FaStar } from "react-icons/fa";

const categories = ["All", "Science", "Fiction", "Programming", "Financial"];

const CategoriesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooksByCategory(selectedCategory);
      setBooks(data);
    };
    loadBooks();
  }, [selectedCategory]);

  const handleBookClick = (book: Book) => {
    if (book.editionKey) {
      window.open(`https://openlibrary.org/books/${book.editionKey}`, "_blank");
    } else if (book.key) {
      window.open(`https://openlibrary.org${book.key}`, "_blank");
    } else {
      alert("No preview available for this book.");
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0">
        <h3 className="font-semibold mb-4">Categories</h3>
        <ul className="space-y-2 text-gray-700">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className={`w-full text-left px-3 py-1 rounded hover:bg-gray-200 ${
                  selectedCategory === cat ? "bg-yellow-300 font-semibold" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Search & Sort */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 flex-wrap w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 border px-3 py-2 rounded focus:outline-none"
            />
          </div>
          <select className="border px-3 py-2 rounded">
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.title + book.key}
              className="bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={book.cover || book.image}
                  alt={book.title}
                  className="h-64 w-full object-cover rounded mb-3"
                  onClick={() => handleBookClick(book)}
                />
                <button className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                  <FaHeart />
                </button>
              </div>

              <h4
                className="mt-2 font-semibold cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                {book.title}
              </h4>
              <p className="text-gray-600">{book.author}</p>

              {/* Rating */}
              <div className="flex items-center mt-1 gap-1">
                {/* {Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <FaStar
                      key={idx}
                      className={`text-yellow-400 ${
                        idx < (book.rating || 0) ? "opacity-100" : "opacity-30"
                      }`}
                    />
                  ))}
                <span className="ml-2 text-gray-500 text-sm">
                  {book.rating?.toFixed(1) || "—"}
                </span> */}
              </div>

              {/* Price */}
              {/* <p className="mt-2 font-bold">{book.price ? `${book.price} ₽` : "—"}</p> */}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesScreen;
