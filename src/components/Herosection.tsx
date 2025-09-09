import React from "react";
import { Search, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      {/* 🌟 Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-r from-[#121a16] via-[#2d3b34] to-[#a6b8a8]">
        <div className="mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-white pl-5 lg:pl-20">
            <span className="uppercase tracking-wider text-sm text-yellow-300">
              Read Book Collection
            </span>
            <h1 className="text-5xl font-extrabold leading-tight">
              Find <br /> Books here
            </h1>
            <p className="text-lg opacity-90 max-w-md">
              Discover the most captivating reads adorned in crimson hues—books that
              intrigue you before you even open their pages.
              <br />
              <span className="block mt-2 text-sm opacity-70">
                (Explore stories that stand out)
              </span>
            </p>

            {/* 🔍 Search Form */}
            <form onSubmit={handleSearch} className="mt-8">
              <div className="flex w-full max-w-md relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for books..."
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
          </div>

          {/* Right Side Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Rounded background block behind books */}
            <div className="absolute top-[-20px] right-0 w-[380px] h-[400px] lg:w-[530px] lg:h-[550px] bg-[#9bb5a1] rounded-tl-[90px] shadow-xl"></div>

            {/* Book Image */}
            <img
              src="src/assets/Book.png"
              alt="Books Illustration"
              className="relative w-[420px] lg:w-[720px] drop-shadow-2xl top-[70px]"
            />

          </div>
        </div>
        {/* 📚 Block Below Books */}
        <div className="absolute bottom-0 right-0 translate-y-1/4 bg-[#9bb5a1] rounded-tl-[80px] pl-[90px] px-6 py-5 shadow-xl w-[500px] h-[150px] md:w-[700px] lg:w-[1020px] flex items-start gap-4">
          <div className="bg-yellow-400 p-3 rounded-xl flex-shrink-0">
            <BookOpen className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Featured Book</h3>
            <p className="text-sm text-gray-700">“So many books, so little time.”</p>
            <button
              className="mt-3 text-sm font-medium text-yellow-700 hover:text-yellow-800"
              onClick={() => navigate("/search")}
            >
              Start Reading →
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
