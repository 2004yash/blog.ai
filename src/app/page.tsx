"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

      if (res.status === 201 || res.status === 200) {
        // alert("Blog published successfully!");
        setResponse(null);
        setPrompt("");
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
    <main className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">AI Blog Generator</h1>

      <div className="w-full max-w-xl space-y-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 bg-white text-black dark:bg-zinc-900 dark:text-white"
          placeholder="Enter your name..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 bg-white text-black dark:bg-zinc-900 dark:text-white"
          rows={3}
          placeholder="Enter your blog topic..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Blog"}
        </button>

        {response && (
          <div>
            <div className="mt-6 bg-white dark:bg-zinc-900 shadow-md rounded-md p-4 space-y-4">
              <h2 className="text-xl font-semibold">{response.title}</h2>
              <p>{response.para1}</p>
              <p>{response.para2}</p>
              <p>{response.para3}</p>
            </div>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              onClick={handlePublish}
              disabled={loading}
            >
              Publish
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
