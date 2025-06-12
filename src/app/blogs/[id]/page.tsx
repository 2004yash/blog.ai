import { notFound } from "next/navigation";

interface Blog {
  title: string;
  para1: string;
  para2: string;
  para3: string;
  author: string;
  publishedDate: string;
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>; // Changed to Promise
}) {
  // Await params before using
  const { id } = await params;

  let blog: Blog | null = null;

  try {
    // Use fetch instead of axios for better Next.js compatibility
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/blogs/${id}`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    blog = await res.json();
  } catch (error) {
    console.error("Failed to load blog:", error);
    notFound(); // show 404
  }

  if (!blog) return notFound();

  return (
    <main className="min-h-screen py-12 px-6 bg-pink-50 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md border-2 border-yellow-400">
        <h1 className="text-3xl font-extrabold text-blue-700 dark:text-yellow-200 mb-4">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          By {blog.author} — {new Date(blog.publishedDate).toLocaleDateString()}
        </p>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>{blog.para1}</p>
          <p>{blog.para2}</p>
          <p>{blog.para3}</p>
        </div>
      </div>
    </main>
  );
}
