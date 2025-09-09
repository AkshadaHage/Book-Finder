import React, { useEffect, useState } from "react";
import HeroSection from "../components/Herosection";
import CategoriesSection from "../components/Categories";
import DiscoverSection from "../components/Discovered";
import fetchBooksByCategory, { Book } from "../api_service/Book_API";

interface HomeProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const Home: React.FC<HomeProps> = ({ searchTerm, setSearchTerm }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooksByCategory("All");
      setBooks(data);
    };
    getBooks();
  }, []);

  return (
    <>
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoriesSection />
      <DiscoverSection />
    </>
  );
};

export default Home;
