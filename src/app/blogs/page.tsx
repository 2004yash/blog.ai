"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Blog {
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
    <main className="min-h-screen p-6 bg-background text-foreground font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center">All Blogs</h1>
      <div className="space-y-6 max-w-3xl mx-auto">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-900 p-4 rounded-md shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-1">
                By {blog.author} —{" "}
                {new Date(blog.publishedDate).toLocaleDateString()}
              </p>
              <p className="mb-2">{blog.para1}</p>
              <p className="mb-2">{blog.para2}</p>
              <p>{blog.para3}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
