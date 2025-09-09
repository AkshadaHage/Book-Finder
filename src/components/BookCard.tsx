import React from "react";
import { Book } from "../api_service/Book_API";
import bookImage from "../assets/booknotfound.jpg";
interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <div
      className="rounded-xl bg-[#1d2622] p-4 shadow hover:shadow-lg transition cursor-pointer"
      onClick={() => onClick(book)}
    >
      {/* Book Cover */}
      <img
        src={book.image || book.cover || bookImage}
        alt={book.title}
        className="h-40 sm:h-48 w-full object-cover rounded-lg"
      />

      {/* Content */}
      <div className="mt-3">
        <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">
          {book.title}
        </h4>

        <p className="text-gray-400 text-xs sm:text-sm truncate">
          {book.author}
        </p>

        <div className="mt-1 text-xs sm:text-sm text-gray-300">
          Category: {book.category || "General"}
        </div>

        {/* Footer */}
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
  );
};

export default BookCard;
