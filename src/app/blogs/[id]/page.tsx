"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

interface Blog {
  title: string;
  para1: string;
  para2: string;
  para3: string;
  author: string;
  publishedDate: string;
}

interface BlogDetailProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetail({ params }: BlogDetailProps) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [id, setId] = useState<string>("");

  // Get the id from params
  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    getId();
  }, [params]);

  // Fetch blog data when id is available
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }/api/blogs/${id}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const blogData = await res.json();
        setBlog(blogData);
      } catch (error) {
        console.error("Failed to load blog:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 bg-red-500 rounded-full border-4 border-white shadow-lg">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-gray-800"></div>
            </div>
          </div>
          <p className="text-white text-xl font-bold">
            Loading Pokemon Blog...
          </p>
        </div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">😵</div>
          <h1 className="text-2xl font-bold mb-4">Blog Not Found!</h1>
          <p className="mb-6">This Pokemon seems to have escaped...</p>
          <button
            onClick={() => router.push("/blogs")}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
          >
            ← Back to Pokedex
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Pokeball Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-30 animate-bounce delay-300"></div>
      <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-green-500 rounded-full opacity-25 animate-pulse delay-500"></div>

      {/* Floating Stars */}
      <div className="absolute top-1/4 left-1/3 text-yellow-300 text-2xl animate-pulse">
        ✨
      </div>
      <div className="absolute top-1/2 right-1/4 text-yellow-300 text-xl animate-pulse delay-700">
        ⭐
      </div>
      <div className="absolute bottom-1/3 left-1/5 text-yellow-300 text-lg animate-pulse delay-1000">
        ✨
      </div>

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Pokeball Header Design */}
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-500 rounded-full border-4 border-white shadow-lg">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-800"></div>
            </div>
            <h1 className="text-5xl font-black text-white drop-shadow-2xl bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent pl-12 leading-tight">
              {blog.title}
            </h1>
          </div>

          {/* Main Content Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-yellow-400 overflow-hidden">
            {/* Card Header with Pokemon-style design */}
            <div className="bg-gradient-to-r from-red-500 via-white to-red-500 p-1">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
                <div className="absolute top-2 right-2 flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-400"></div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold">Trainer: {blog.author}</p>
                    <p className="text-blue-200 text-sm">
                      Caught on:{" "}
                      {new Date(blog.publishedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 space-y-6">
              {/* Paragraph 1 with Lightning styling */}
              <div className="relative">
                <div className="absolute -left-2 top-0 text-yellow-500 text-2xl">
                  ⚡
                </div>
                <p className="text-lg leading-relaxed text-gray-800 pl-8 bg-gradient-to-r from-yellow-50 to-transparent p-4 rounded-lg border-l-4 border-yellow-400">
                  {blog.para1}
                </p>
              </div>

              {/* Paragraph 2 with Fire styling */}
              <div className="relative">
                <div className="absolute -left-2 top-0 text-red-500 text-2xl">
                  🔥
                </div>
                <p className="text-lg leading-relaxed text-gray-800 pl-8 bg-gradient-to-r from-red-50 to-transparent p-4 rounded-lg border-l-4 border-red-400">
                  {blog.para2}
                </p>
              </div>

              {/* Paragraph 3 with Water styling */}
              <div className="relative">
                <div className="absolute -left-2 top-0 text-blue-500 text-2xl">
                  💧
                </div>
                <p className="text-lg leading-relaxed text-gray-800 pl-8 bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-lg border-l-4 border-blue-400">
                  {blog.para3}
                </p>
              </div>
            </div>

            {/* Footer with Pokeball design */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 border-t-4 border-yellow-400">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md relative"
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border border-gray-600"></div>
                    </div>
                  ))}
                </div>
                <span className="text-gray-600 font-semibold">
                  Gotta Read 'Em All!
                </span>
              </div>
            </div>
          </div>

          {/* Back Button styled as Pokemon button */}
          <div className="mt-8 text-center">
            <button
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 hover:shadow-xl"
              onClick={() => router.push("/blogs")}
            >
              ← Back to Pokedex
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
