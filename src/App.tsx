import { useState } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResult';
import CategoriesScreen from './pages/CategoriesScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            <Route path="/search" element={<SearchResults />} />
           <Route path="/categories" element={<CategoriesScreen />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Routes> 
      </Layout>
    </BrowserRouter>
  );
}

export default App;
