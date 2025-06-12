import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/app/db";
import { blogModel } from "@/app/db";

export async function GET() {
  try {
    await connectToDB();

    const blogs = await blogModel.find().sort({ publishedDate: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, para1, para2, para3, author, publishedDate } = body;

    if (!title || !para1 || !para2 || !para3) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    const newBlog = await blogModel.create({
      title,
      para1,
      para2,
      para3,
      author,
      publishedDate
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
