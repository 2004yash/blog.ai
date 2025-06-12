"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Loader2,
  BookOpen,
  Zap,
  Flame,
  Droplet,
  Eye,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [author, setAuthor] = useState("");
  const [response, setResponse] = useState<null | {
    title: string;
    para1: string;
    para2: string;
    para3: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const res = await axios.get(`/api/generate?prompt=${prompt}`);
      setResponse(res.data);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!response) {
      alert("No blog content to publish.");
      return;
    }

    setLoading(true);
    try {
      const data = {
        title: response.title,
        para1: response.para1,
        para2: response.para2,
        para3: response.para3,
        publishedDate: new Date().toISOString(),
        author,
      };

      const res = await axios.post("/api/blogs", data);

      if (res.status === 200 || res.status === 201) {
        setResponse(null);
        setPrompt("");
        setAuthor("");
        router.push("/blogs");
      } else {
        alert("Failed to publish blog. Please try again.");
      }
    } catch (err) {
      console.error("Error publishing blog:", err);
      alert("An error occurred while publishing the blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewBlogs = () => {
    router.push("/blogs");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-16 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-32 right-24 w-20 h-20 bg-yellow-300/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-red-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-24 right-1/3 w-28 h-28 bg-blue-400/20 rounded-full animate-float"></div>

        {/* Floating Pokemon Elements */}
        <div className="absolute top-1/6 left-1/12 text-5xl animate-float opacity-30">
          ⚡
        </div>
        <div className="absolute top-1/3 right-1/6 text-4xl animate-float-delayed opacity-30">
          🔥
        </div>
        <div className="absolute bottom-1/4 left-1/5 text-3xl animate-bounce opacity-30">
          💧
        </div>
        <div className="absolute top-2/3 right-1/2 text-4xl animate-float opacity-30">
          ✨
        </div>
        <div className="absolute top-1/2 left-1/2 text-6xl animate-pulse opacity-20">
          🧠
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 min-h-screen">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <h1 className="text-5xl sm:text-6xl font-black text-white drop-shadow-2xl mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 bg-clip-text text-transparent">
              ⚡ PokéBlog Generator
            </h1>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border border-gray-800"></div>
            </div>
          </div>
          <p className="text-white/90 text-lg font-semibold mt-2">
            Create legendary content with AI power! ✨
          </p>
        </div>

        {/* Navigation Button */}
        <div className="mb-6">
          <button
            onClick={handleViewBlogs}
            className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold px-6 py-3 rounded-full border border-white/30 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <Eye className="h-5 w-5" />
            View All Blogs
          </button>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-yellow-400 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-1">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white relative">
              <div className="absolute top-2 right-2 flex space-x-1">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-bold opacity-90">
                  CONTENT GENERATOR
                </span>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 space-y-4">
            {/* Trainer Name Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                Trainer Name
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-blue-50 text-gray-900 placeholder-gray-500"
                placeholder="Enter your trainer name..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            {/* Topic Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center">
                  <Flame className="h-3 w-3 text-white" />
                </div>
                Blog Topic
              </label>
              <textarea
                className="w-full p-3 rounded-lg border-2 border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-red-50 resize-none text-gray-900 placeholder-gray-500"
                rows={3}
                placeholder="What topic should Pikachu write about? ⚡"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !prompt.trim() || !author.trim()}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Blog ⚡
                </>
              )}
            </button>

            {/* Generated Content Preview */}
            {response && (
              <div className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-400 rounded-xl overflow-hidden shadow-inner">
                {/* Preview Header */}
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-1">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-3 text-white">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <BookOpen className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs font-bold opacity-90">
                        BLOG PREVIEW
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-extrabold text-blue-700 underline decoration-red-400 underline-offset-4">
                    {response.title}
                  </h2>

                  <div className="space-y-3 text-gray-800">
                    <p className="text-base leading-relaxed bg-white/60 p-3 rounded-lg border-l-4 border-blue-400">
                      {response.para1}
                    </p>
                    <p className="text-base leading-relaxed bg-white/60 p-3 rounded-lg border-l-4 border-red-400">
                      {response.para2}
                    </p>
                    <p className="text-base leading-relaxed bg-white/60 p-3 rounded-lg border-l-4 border-green-400">
                      {response.para3}
                    </p>
                  </div>

                  {/* Power Level Indicator */}
                  <div className="flex items-center justify-between pt-4 border-t border-yellow-300">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-600">
                      QUALITY: LEGENDARY
                    </span>
                  </div>

                  <button
                    onClick={handlePublish}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        Publishing...
                      </>
                    ) : (
                      <>🎉 Publish Blog</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-full px-6 py-2 border border-white/30">
            <p className="text-white/90 text-sm font-semibold">
              Made with ❤️ and ⚡ by your favorite Pokémon trainer
            </p>
          </div>
        </footer>
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
