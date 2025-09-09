// components/BookCard.tsx
import React from "react";
import { Book } from "../api_service/Book_API";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{book.title}</h3>
        <p className="text-gray-500 text-sm">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;
