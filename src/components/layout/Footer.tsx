import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} AllBooks. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
