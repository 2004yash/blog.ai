"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BookText, User } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  para1: string;
  para2: string;
  para3: string;
  author: string;
  publishedDate: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 text-zinc-900 dark:text-white py-10 px-4 font-sans">
      <h1 className="text-4xl text-center font-extrabold text-red-500 drop-shadow mb-10">
        🧠 PokéBlogs Archive
      </h1>

      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No blogs found. Pikachu’s still thinking...
          </p>
        ) : (
          blogs.map((blog) => (
            <Link href={`/blogs/${blog._id}`} key={blog._id}>
              <div className="bg-white dark:bg-zinc-800 border-2 border-yellow-300 shadow-lg rounded-xl p-4 hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-blue-700 dark:text-yellow-200 line-clamp-2">
                    {blog.title}
                  </h2>
                  <BookText className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {blog.author} —{" "}
                  {new Date(blog.publishedDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-100 line-clamp-3">
                  {blog.para1}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
