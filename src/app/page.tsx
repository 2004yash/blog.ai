"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2 } from "lucide-react";

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 text-zinc-900 dark:text-white flex flex-col items-center justify-center px-4 py-12 font-sans">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-red-500 drop-shadow-md">
        ⚡ PokéBlog Generator
      </h1>

      <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl border border-yellow-300">
        <input
          type="text"
          className="w-full mb-4 p-3 rounded-lg border border-red-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-zinc-900 dark:text-white"
          placeholder="Your Trainer Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <textarea
          className="w-full mb-4 p-3 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-zinc-900 dark:text-white"
          rows={3}
          placeholder="What topic should Pikachu write about?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Blog
            </>
          )}
        </button>

        {response && (
          <div className="mt-6 bg-yellow-50 dark:bg-zinc-900 border border-yellow-400 p-6 rounded-xl space-y-4">
            <h2 className="text-2xl font-extrabold text-blue-700 dark:text-yellow-300 underline decoration-red-400 underline-offset-4">
              {response.title}
            </h2>
            <p className="text-base">{response.para1}</p>
            <p className="text-base">{response.para2}</p>
            <p className="text-base">{response.para3}</p>

            <button
              onClick={handlePublish}
              disabled={loading}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
            >
              {loading ? "Publishing..." : "🎉 Publish Blog"}
            </button>
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500">
        Made with ❤️ and ⚡ by your favorite Pokémon trainer
      </footer>
    </main>
  );
}
