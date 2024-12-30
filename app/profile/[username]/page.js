"use client";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage({ params: asyncParams }) {
  // const session = await getServerSession(authOptions);
  const [username, setUsername] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const data = [
    { name: "Blogs", value: 0 },
    { name: "Followers", value: 0 },
    { name: "Following", value: 0 },
  ];

  useEffect(() => {
    const fetchParams = async () => {
      const params = await asyncParams;
      setUsername(params.username);
    };

    fetchParams();
  }, [asyncParams]);

  useEffect(() => {
    if (!username) return;

    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        const { user, blogs } = data;
        setUser(user);
        setBlogs(blogs);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchBlogs();
  }, [username]);

  if (error) {
    return (
      <div className="m-4 rounded-md p-2 flex-col gap-8 content-center items-top md:w-[60vw] md:mx-auto ">
        <div className="text-lg text-white font-bold flex items-center content-center w-full bg-gray-200/[0.2] p-5 rounded m-auto">
          <p>User not found.</p>
        </div>
      </div>
    );
  }

  return isLoading ? (
    <div className="m-4 rounded-md p-2 flex-col gap-8 content-center items-top md:w-[60vw] md:mx-auto ">
      <div className="h-16 w-full bg-gray-200/[0.5] animate-pulse rounded"></div>
      <div className="h-[60vh] w-full bg-gray-200/[0.5] animate-pulse rounded mt-4"></div>
    </div>
  ) : (
    <>
      <div className="m-4 rounded-md p-2 flex gap-2 content-center items-top md:w-[60vw] md:mx-auto ">
        <Image
          src={user?.image}
          alt="Profile Picture"
          className="rounded-md  border-2 border-black/[0.33] border-solid radius-md"
          width={68}
          height={68}
        />
        <div className="flex-col gap-2 flex-1">
          <h1 className=" font-bold text-pink-800 ">@{username}</h1>
          <div className="flex gap-2 content-center md:content-left">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex-1 bg-white/[0.4] rounded-sm flex-col text-center content-center p-1 md:flex-none md:px-8"
              >
                <h2 className="text-xs text-yellow-700 font-bold">
                  {item.name}
                </h2>
                <p className="text-xs text-orange-700 font-bold">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="m-4 flex md:w-[60vw] md:mx-auto content-center">
        {blogs.length == 0 ? (
          <div className="p-4 bg-white/[0.2]  rounded-md text-white font-bold flex-1">
            No blog posts from this user
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
