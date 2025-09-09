// DiscoverSection.tsx
import React, { useState, useEffect } from "react";
import fetchBooksByCategory, { Book } from "../api_service/Book_API";
import { motion } from "framer-motion";
import BookCard from "./BookCard"; // ✅ Reuse BookCard component

const categories = ["All", "Science", "Fiction", "Programming", "Financial"];

const DiscoverSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      const data = await fetchBooksByCategory(selectedCategory);
      setBooks(data);
      setLoading(false);
    };
    getBooks();
  }, [selectedCategory]);

  // ✅ Handle card click
  const handleBookClick = (book: Book) => {
    if (book.editionKey) {
      window.open(`https://openlibrary.org/books/${book.editionKey}`, "_blank");
    } else if (book.key) {
      window.open(`https://openlibrary.org${book.key}`, "_blank");
    } else {
      alert("Book not available to read.");
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-r from-[#121a16] via-[#2d3b34] to-[#a6b8a8] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-yellow-300">
            Featured Books
          </p>
          <h2 className="text-4xl font-extrabold mt-2 mb-[40px] lg:mb-[50px]">
            What Will You Discover?
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedCategory === cat
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Book Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-200">
            Loading books...
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 text-gray-200">No books found.</div>
        ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
   {books.map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* ✅ Reused BookCard */}
                <BookCard book={book} onClick={handleBookClick} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DiscoverSection;
