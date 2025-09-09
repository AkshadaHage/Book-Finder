import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResult';
import CategoriesSection from './components/Categories';
import CategoriesScreen from './pages/CategoriesScreen';
function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic for searching
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            <Route path="/search" element={<SearchResults />} />
           <Route path="/categories" element={<CategoriesScreen />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes> 
      </Layout>
    </Router>
  );
}

export default App;
