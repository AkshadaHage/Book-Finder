import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1d2622] text-white py-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} AllBooks. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
