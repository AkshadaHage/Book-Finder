import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Book, fetchBooksByTitle } from "../api_service/Book_API";
import BookCard from "../components/BookCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialSearchTerm = new URLSearchParams(location.search).get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) return;

    const getBooks = async () => {
      setLoading(true);
      const data = await fetchBooksByTitle(searchTerm);
      setBooks(data);
      setLoading(false);
    };

    getBooks();
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <section className="relative py-20 bg-gradient-to-r from-[#121a16] via-[#2d3b34] to-[#a6b8a8] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mb-10 flex justify-center w-full"
        >
          <div className="flex w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search for books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 rounded-l-xl text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 px-5 rounded-r-xl hover:bg-yellow-500 transition flex items-center justify-center"
            >
              <Search className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </form>

        {/* Title */}
        <h2 className="text-3xl font-extrabold mb-10 text-center">
          Search results for{" "}
          <span className="text-yellow-300">"{searchTerm}"</span>
        </h2>

        {/* Content */}
        {loading ? (
          <p className="text-center mt-20 text-gray-200">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-center mt-20 text-gray-200">No books found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
