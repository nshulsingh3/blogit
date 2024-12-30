// components/Navbar.js
"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null); // Ref to detect outside clicks

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  console.log(session);
  return (
    // <nav className="bg-gradient-to-b from-black-400/[0.8] to-rose-300/[0] flex justify-between px-10 items-center gap-4">
    <nav className="bg-black/[0.2] flex justify-between px-2 md:px-10 items-center gap-4 shadow-md">
      <h1 className="text-white text-3xl font-bold my-4 cursor-default">
        BlogIt
      </h1>
      {session ? (
        <div className="relative" ref={menuRef}>
          <Image
            src={session.user.image}
            className="border-solid border-2 border-orange-200 rounded-full shadow-md cursor-pointer"
            alt="User Avatar"
            width={38}
            height={38}
            onClick={toggleMenu}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
              <ul className="py-1">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
          {/* <button onClick={() => signOut()}>Sign Out</button> */}
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold p-2 px-3 rounded-md hover:bg-orange-600"
          onClick={() => signIn("github")}
        >
          Login with GitHub
        </button>
      )}
    </nav>
  );
};

export default Navbar;
