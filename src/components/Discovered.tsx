import React, { useState, useEffect } from "react";
import fetchBooksByCategory, { Book } from "../api_service/Book_API";
import { motion } from "framer-motion";

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

  return (
    <section className="relative py-20 bg-gradient-to-r from-[#121a16] via-[#2d3b34] to-[#a6b8a8] text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-yellow-300">
            Featured Books
          </p>
          <h2 className="text-4xl font-extrabold mt-2">
            What Will You Discover?
          </h2>

          {/* Category Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
  {books.map((book, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => {
        if (book.editionKey) {
          window.open(
            `https://openlibrary.org/books/${book.editionKey}`,
            "_blank"
          );
        } else if (book.key) {
          window.open(
            `https://openlibrary.org${book.key}`,
            "_blank"
          );
        } else {
          alert("Book not available to read.");
        }
      }}
    >
      <img
        src={book.image || book.cover}
        alt={book.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 text-gray-900">
        <h3 className="font-semibold text-lg">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
      </div>
    </motion.div>
  ))}
</div>

        </div>

        {/* Book Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-200">
            Loading books...
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 text-gray-200">No books found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-gray-900">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DiscoverSection;
