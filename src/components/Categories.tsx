import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Palette,
  Briefcase,
  Database,
  BookOpen,
  Stethoscope,
  Microscope,
} from "lucide-react";
import { motion } from "framer-motion";

type Category = {
  id: string;
  name: string;
  icon: JSX.Element;
  booksCount: number;
};

const POPULAR_CATEGORIES: Category[] = [
  { id: "fiction", name: "Fiction", icon: <BookOpen />, booksCount: 24 },
  { id: "science", name: "Science", icon: <Microscope />, booksCount: 18 },
  { id: "programming", name: "Programming", icon: <Database />, booksCount: 32 },
  { id: "financial", name: "Financial", icon: <Briefcase />, booksCount: 15 },
  { id: "history", name: "History", icon: <Palette />, booksCount: 20 },
  { id: "biography", name: "Biography", icon: <Stethoscope />, booksCount: 10 },
];

const CategoriesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 bg-gradient-to-r from-[#121a16] via-[#2d3b34] to-[#a6b8a8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <p className="text-sm uppercase tracking-wide text-yellow-300 mb-2">
              For Categories
            </p>
            <h2 className="text-4xl font-extrabold text-white">
              Explore Categories
            </h2>
          </div>
          <button
            onClick={() => navigate("/categories")}
            className="text-yellow-300 hover:text-yellow-400 font-semibold transition-colors"
          >
            View All →
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {POPULAR_CATEGORIES.map((category, index) => (
            <motion.button
              key={category.id}
              type="button"
              onClick={() => navigate(`/category/${category.id}`)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#9bb5a1] rounded-2xl px-6 py-6 shadow-xl flex items-center gap-5 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-300 text-gray-900 shadow-md">
                {category.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col text-left">
                <h3 className="text-lg font-semibold text-white">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-200">
                  {category.booksCount} Books
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Decorative block (matches hero style) */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#9bb5a1] rounded-tr-[100px] opacity-20"></div>
    </section>
  );
};

export default CategoriesSection;
