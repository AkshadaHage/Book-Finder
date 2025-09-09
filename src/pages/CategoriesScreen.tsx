import React, { useEffect, useState } from "react";
import fetchBooksByCategory, { Book } from "../api_service/Book_API";
import { Search, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import bookImage from "../assets/booknotfound.jpg";
const headerCategories = [
    "Genres",
    "New",
    "Popular",
    "Samizdat",
    "Learn",
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
    "Crime",
];

const CategoriesScreen: React.FC = () => {
    const location = useLocation();
    const initialCategory =
        (location.state as { category?: string })?.category || "All";

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
        setSidebarOpen(false);
    };


    return (
        <div className="bg-gradient-to-r from-[#121a16] via-[#2d3b34] to-[#a6b8a8] min-h-screen text-white ">
            {/* HEADER SECTION */}
            <div className="relative h-56 bg-gradient-to-r from-[#121a16] via-[#2d3b34] to-[#a6b8a8] pt-5">
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="relative z-10 flex flex-wrap justify-center gap-3 px-4 pt-20">
                    {headerCategories.map((cat) => (
                        <button
                            key={cat}
                            className="rounded-full bg-yellow-400 text-gray-900 px-4 py-2 text-xs sm:text-sm md:px-5 md:py-2 font-medium shadow hover:bg-yellow-500 transition"
                            onClick={() => {
                                setSelectedCategory(cat);
                                setSearchTerm("");
                                setSidebarOpen(false);
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* BREADCRUMB */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-yellow-300 text-xs sm:text-sm flex items-center justify-between">
                <div>
                    <span
                        className="cursor-pointer hover:underline"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </span>
                    &gt; Categories &gt;
                    <span className="text-white font-medium">{selectedCategory}</span>
                </div>

                {/* Mobile toggle button */}
                <button
                    className="md:hidden text-yellow-400 flex items-center gap-1"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    <span className="text-xs">Menu</span>
                </button>
            </div>

            {/* MAIN LAYOUT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row gap-6">
                {/* SIDEBAR (Mobile: collapsible) */}
                <aside
                    className={`${sidebarOpen ? "block" : "hidden"
                        } md:block w-full md:w-72 shrink-0`}
                >
                    <div className="bg-[#1d2622] p-4 rounded-xl shadow-lg md:sticky md:top-24">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="mb-4 relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search category..."
                                className="w-full px-4 py-2 rounded-full text-gray-900 focus:outline-none text-sm"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </form>

                        <h3 className="text-yellow-400 font-semibold mb-4">Sections:</h3>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:block gap-2 text-gray-200 text-xs sm:text-sm">
                            {sidebarCategories.map((item) => (
                                <li key={item}>
                                    <button
                                        className={`hover:text-yellow-400 ${selectedCategory === item
                                                ? "font-semibold text-yellow-400"
                                                : ""
                                            }`}
                                        onClick={() => {
                                            setSelectedCategory(item);
                                            setSearchTerm("");
                                            setSidebarOpen(false);
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
                    <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-300">
                            {selectedCategory} Books
                        </h2>
                    </div>

                    {/* BOOK CARDS */}
                    {loading ? (
                        <p className="text-center text-gray-300">Loading books...</p>
                    ) : books.length === 0 ? (
                        <p className="text-center text-gray-300">No books found.</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

                            {books.map((book) => (
                                <div
                                    key={(book.title || "Untitled") + (book.key || Math.random())}
                                    className="rounded-xl bg-[#1d2622] p-4 shadow hover:shadow-lg transition cursor-pointer"
                                    onClick={() => handleBookClick(book)}
                                >
                                    <img
                                        src={book.image || book.cover || bookImage}
                                        alt={book.title}
                                        className="h-40 sm:h-48 w-full object-cover rounded-lg"
                                    />
                                    <div className="mt-3">
                                        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                                            {book.title}
                                        </h4>
                                        <p className="text-gray-400 text-xs sm:text-sm truncate">
                                            {book.author}
                                        </p>
                                        <div className="mt-1 text-xs sm:text-sm text-gray-300">
                                            Category: {book.category || "General"}
                                        </div>
                                        <div className="mt-2 flex items-center justify-between">
                                            <button className="text-yellow-400 text-xs sm:text-sm font-medium">
                                                Preview
                                            </button>
                                            <span className="text-white font-semibold text-xs sm:text-sm">
                                                Free
                                            </span>
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
