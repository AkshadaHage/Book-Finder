import React, { useEffect, useState } from "react";
import fetchBooksByCategory, { Book } from "../api_service/Book_API";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const headerCategories = [
  "Genres",
  "New",
  "Popular",
  "What to Read",
  "Samizdat",
  "Promo",
  "Blog",
];

const sidebarCategories = [
  "Business",
  "Motivation",
  "Marketing",
  "Sports",
  "Fiction",
  "Hobbies",
  "Science",
  "Travel",
  "History",
  "Biography",
  "Self-Help",
  "Technology",
  "Philosophy",
  "Cooking",
  "Education",
  "Poetry",
  "Fantasy",
  "Romance",
  "Politics",
  "Religion",
  "Comics",
  "Parenting",
  "Nature",
  "Psychology",
  "Science Fiction",
  "Adventure",
  "Music",
  "Crime"
];


const CategoriesScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate();
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await fetchBooksByCategory(selectedCategory);
      setBooks(data);
      setLoading(false);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    setSelectedCategory(searchTerm);
  };

  return (
    <div className="bg-gradient-to-r from-[#121a16] via-[#2d3b34] to-[#a6b8a8] min-h-screen text-white">
      {/* HEADER SECTION */}
      <div className="relative h-56 bg-gradient-to-r from-[#121a16] via-[#2d3b34] to-[#a6b8a8]">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex flex-wrap justify-center gap-4 pt-20">
          {headerCategories.map((cat) => (
            <button
              key={cat}
              className="rounded-full bg-yellow-400 text-gray-900 px-5 py-2 text-sm font-medium shadow hover:bg-yellow-500 transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-yellow-300 text-sm">
  <span 
    className="cursor-pointer hover:underline" 
    onClick={() => navigate("/")}
  >
    Home
  </span>  
  &gt; Categories &gt; 
  <span className="text-white font-medium">{selectedCategory}</span>
</div>

      {/* MAIN LAYOUT */}
      <section className="max-w-7xl mx-auto px-6 py-6 flex gap-8">
        {/* SIDEBAR */}
        <aside className="w-72 shrink-0">
          <div className="sticky top-24 bg-[#1d2622] p-4 rounded-xl shadow-lg">
            {/* Search on top of sidebar */}
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search category..."
                className="w-full px-4 py-2 rounded-full text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            <h3 className="text-yellow-400 font-semibold mb-4">Sections:</h3>
            <ul className="space-y-2 text-gray-200 text-sm">
              {sidebarCategories.map((item) => (
                <li key={item}>
                  <button
                    className={`hover:text-yellow-400 ${
                      selectedCategory === item ? "font-semibold text-yellow-400" : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory(item);
                      setSearchTerm("");
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-gray-400 text-xs">Over 120 genres</p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 min-w-0">
          TOP FILTERS
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-yellow-300">{selectedCategory} Books</h2>
            {/* <select className="rounded-full border border-gray-400 bg-[#2d3b34] px-3 py-2 text-sm text-white">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select> */}
          </div>

          {/* BOOK CARDS */}
          {loading ? (
            <p className="text-center text-gray-300">Loading books...</p>
          ) : books.length === 0 ? (
            <p className="text-center text-gray-300">No books found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={(book.title || "Untitled") + (book.key || Math.random())}
                  className="rounded-xl bg-[#1d2622] p-4 shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleBookClick(book)}
                >
                  <img
                    src={book.image || book.cover}
                    alt={book.title}
                    className="h-48 w-full object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-white">{book.title}</h4>
                    <p className="text-gray-400 text-sm truncate">{book.author}</p>
                    <div className="mt-2 text-sm text-gray-300">
                      Category: {book.category || "General"}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <button className="text-yellow-400 text-sm font-medium">Preview</button>
                      <span className="text-white font-semibold">Free</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoriesScreen;
