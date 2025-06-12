"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BookText, User, Calendar, Zap, Flame, Droplet } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  para1: string;
  para2: string;
  para3: string;
  author: string;
  publishedDate: string;
}

const pokemonTypes = [
  {
    icon: Zap,
    color: "from-yellow-400 to-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-400",
  },
  {
    icon: Flame,
    color: "from-red-400 to-red-600",
    bg: "bg-red-50",
    border: "border-red-400",
  },
  {
    icon: Droplet,
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-400",
  },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
            <div className="relative w-20 h-20 bg-red-500 rounded-full border-4 border-white shadow-lg">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-gray-800"></div>
            </div>
          </div>
          <p className="text-white text-xl font-bold">Loading Pokédex...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-300/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-red-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-400/20 rounded-full animate-float"></div>

        {/* Floating Pokemon Elements */}
        <div className="absolute top-1/4 left-1/6 text-6xl animate-float opacity-20">
          ⚡
        </div>
        <div className="absolute top-1/2 right-1/5 text-5xl animate-float-delayed opacity-20">
          🔥
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce opacity-20">
          💧
        </div>
        <div className="absolute top-3/4 right-1/2 text-5xl animate-float opacity-20">
          ✨
        </div>
      </div>

      <div className="relative z-10 py-12 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className="text-6xl font-black text-white drop-shadow-2xl mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 bg-clip-text text-transparent">
              🧠 PokéBlogs Archive
            </h1>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-800"></div>
            </div>
          </div>
          <p className="text-white/90 text-xl font-semibold mt-4">
            Discover legendary knowledge from master trainers
          </p>
        </div>

        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
            <div className="flex items-center justify-center space-x-8 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">{blogs.length}</div>
                <div className="text-sm opacity-80">Articles Caught</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">⭐⭐⭐⭐⭐</div>
                <div className="text-sm opacity-80">Master Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">∞</div>
                <div className="text-sm opacity-80">Knowledge Power</div>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-8xl mb-4">😴</div>
              <p className="text-white text-xl font-semibold">
                No blogs found. Pikachu's still thinking...
              </p>
            </div>
          ) : (
            blogs.map((blog, index) => {
              const typeData = pokemonTypes[index % pokemonTypes.length];
              const TypeIcon = typeData.icon;

              return (
                <Link href={`/blogs/${blog._id}`} key={blog._id}>
                  <div className="group relative">
                    {/* Card */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-yellow-400 overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-3xl cursor-pointer h-full">
                      {/* Card Header */}
                      <div className={`bg-gradient-to-r ${typeData.color} p-1`}>
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white relative">
                          <div className="absolute top-2 right-2 flex space-x-1">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-8 h-8 bg-gradient-to-r ${typeData.color} rounded-full flex items-center justify-center shadow-lg`}
                            >
                              <TypeIcon className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-sm font-bold opacity-90">
                              BLOG CARD
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <h2 className="text-xl font-bold text-gray-800 line-clamp-2 flex-1 group-hover:text-blue-600 transition-colors">
                            {blog.title}
                          </h2>
                          <BookText className="h-6 w-6 text-red-500 ml-2 flex-shrink-0" />
                        </div>

                        {/* Trainer Info */}
                        <div
                          className={`${typeData.bg} ${typeData.border} border-l-4 p-3 rounded-r-lg`}
                        >
                          <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                            <User className="h-4 w-4" />
                            <span className="font-semibold">
                              Trainer: {blog.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Calendar className="h-3 w-3" />
                            <span>
                              Caught:{" "}
                              {new Date(
                                blog.publishedDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Preview Text */}
                        <div className="relative">
                          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                            {blog.para1}
                          </p>
                          <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white to-transparent w-8 h-6"></div>
                        </div>

                        {/* Power Level Indicator */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm"
                              ></div>
                            ))}
                          </div>
                          <span className="text-xs font-bold text-gray-500">
                            LV. MAX
                          </span>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-8 py-4 border border-white/30">
            <p className="text-white font-bold text-lg">
              🎯 Gotta Read 'Em All! 🎯
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }
      `}</style>
    </main>
  );
}
