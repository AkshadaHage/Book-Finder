import { useState, useEffect } from "react";
import { Menu, Search, User, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 

  // Helper to check active route
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/10 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="text-sm text-yellow-300 font-semibold cursor-pointer"
              onClick={() => navigate("/")}
            >
              #Readify
            </span>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              className={`transition ${isActive("/") ? "text-yellow-300 font-medium" : "text-white"
                }`}
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <span className="opacity-60">·</span>
            <button
              className={`transition ${isActive("/search") ? "text-yellow-300 font-medium" : "text-white"
                }`}
              onClick={() => navigate("/search")}
            >
              Search
            </button>
            <span className="opacity-60">·</span>
            <button
              className={`transition ${isActive("/categories") ? "text-yellow-300 font-medium" : "text-white"
                }`}
              onClick={() => navigate("/categories")}
            >
              Categories
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-5 text-white">
            <Search
              className={`w-5 h-5 cursor-pointer transition ${isActive("/search") ? "text-yellow-300" : "hover:text-yellow-300"
                }`}
              onClick={() => navigate("/search")}
            />
            <div className="relative group">
              <User
                className={`w-5 h-5 cursor-pointer transition ${isActive("/profile") ? "text-yellow-300" : "hover:text-yellow-300"
                  }`}
              // onClick={() => navigate("/profile")}
              />

              {/* Tooltip / Comment Box below the icon */}
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-yellow-300 text-black rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all min-w-[120px] duration-300 shadow-lg">
                Hello there! 😊
              </div>
            </div>



            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-yellow-300" />
              ) : (
                <Menu className="w-6 h-6 hover:text-yellow-300 transition" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-md text-white px-6 py-4 space-y-4 transition-all duration-300">
          <button
            className={`block w-full text-left transition ${isActive("/") ? "text-yellow-300 font-medium" : "hover:text-yellow-300"
              }`}
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            Home
          </button>
          <button
            className={`block w-full text-left transition ${isActive("/search")
                ? "text-yellow-300 font-medium"
                : "hover:text-yellow-300"
              }`}
            onClick={() => {
              navigate("/search");
              setIsOpen(false);
            }}
          >
            Search
          </button>
          <button
            className={`block w-full text-left hover:text-yellow-300 transition ${isActive("/categories")
                ? "text-yellow-300 font-medium"
                : "hover:text-yellow-300"
              }`}
            onClick={() => navigate("/categories")}
          >
            Categories
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
