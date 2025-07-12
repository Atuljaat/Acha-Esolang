import React from 'react'
import { FaGithub } from "react-icons/fa";

function Navbar() {
  return (
    <div className="bg-secondary-foreground text-white flex justify-around items-center px-6 py-4">
      <p className="text-lg font-semibold">Achaji Esolang</p>
      <a
        href="https://github.com/Atuljaat/Achaji-Esolang"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-400 transition-colors"
      >
        <FaGithub className="h-5 w-5" />
      </a>
    </div>
  );
}

export default Navbar
