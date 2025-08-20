import { useState } from "react";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full py-4 px-5 bg-black text-gray-300">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <img
          src={appleImg}
          alt="Apple logo"
          width={20}
          height={18}
          className="cursor-pointer"
        />

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6">
          {navLists.map((item) => (
            <div
              key={item}
              className="hover:text-white cursor-pointer transition-colors"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Right Icons + Hamburger */}
        <div className="flex gap-4 items-center">
          <img
            src={searchImg}
            alt="Search icon"
            width={18}
            height={18}
            className="cursor-pointer"
          />
          <img
            src={bagImg}
            alt="Bag icon"
            width={18}
            height={18}
            className="cursor-pointer"
          />

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`w-6 h-0.5 bg-gray-300 transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-300 transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-gray-300 transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown (pushes content down, retains transitions) */}
      <div
        className={`md:hidden flex flex-col gap-4 px-2 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {navLists.map((item) => (
          <div
            key={item}
            className="hover:text-white cursor-pointer transition-colors text-center"
          >
            {item}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
