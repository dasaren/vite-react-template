import React from "react";
import { encode } from "html-entities";
import { decode } from "html-entities";

const DsNavbar = () => {
  //   const initApp = () => {
  const hamburgerBtn = document.getElementById("hamburger-button");
  const mobileMenu = document.getElementById("mobile-menu");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
    // hamburgerBtn.classList.toggle("toggle-btn ");
    // hamburgerBtn.classList.toggle("toggle-btn ");
  };

  //   hamburgerBtn.addEventListener("onClick", toggleMenu);
  //   mobileMenu.addEventListener("onClick", toggleMenu);
  //   };

  //   document.addEventListener("DOMContentLoaded", initApp);

  return (
    <div>
      <header class="sticky top-0 z-10 bg-teal-700 text-white">
        <section class="mx-auto flex max-w-4xl items-center justify-between p-4">
          <h1 class="text-3xl font-medium">
            <a href="#social">
              DS SOCIAL ROOM
              <span className="text-teal-100 ">❤</span>
            </a>
          </h1>
          <div>
            <button
              id="hamburger-button"
              class="relative h-8 w-8 animate-open-menu cursor-pointer text-3xl md:hidden "
              onClick={toggleMenu}
            >
              &#9776;
              {/* symbol */}
              <div class="absolute top-4 -mt-0.5 h-1 w-8 rounded bg-white transition-all duration-500 before:absolute before:h-1 before:w-8 before:-translate-x-4 before:-translate-y-3 before:rounded before:bg-white before:transition-all before:duration-500 before:content-[''] after:absolute after:h-1 after:w-8 after:-translate-x-4 after:translate-y-3 after:rounded after:bg-white after:transition-all after:duration-500 after:content-['']"></div>
            </button>
            <nav class="hidden space-x-8 text-xl md:block" aria-label="main">
              <a href="#topic" class="hover:opacity-90">
                Topic
              </a>
              <a href="#feeds" class="hover:opacity-90">
                FEEDS
              </a>
              <a href="#contact" class="hover:opacity-90">
                Contact Us
              </a>
            </nav>
          </div>
        </section>
        <section
          id="mobile-menu"
          class="top-68 justify-content-center absolute  hidden  w-full  origin-top animate-open-menu flex-col bg-black text-5xl"
          onClick={toggleMenu}
        >
          <button class="self-end px-6 text-8xl">
            &times;
            {/* symbol? */}
          </button>
          <nav
            class="flex min-h-screen flex-col items-center py-8"
            aria-label="mobile"
          >
            <a href="#social" class="w-full py-6 text-center hover:opacity-90">
              Home
            </a>
            <a href="#rockets" class="w-full py-6 text-center hover:opacity-90">
              Our Rockets
            </a>
            <a
              href="#testimonials"
              class="w-full py-6 text-center hover:opacity-90"
            >
              Testimonials
            </a>
            <a href="#contact" class="w-full py-6 text-center hover:opacity-90">
              Contact Us
            </a>
            <a href="#footer" class="w-full py-6 text-center hover:opacity-90">
              Legal
            </a>
          </nav>
        </section>
      </header>
    </div>
  );
};

export default DsNavbar;
