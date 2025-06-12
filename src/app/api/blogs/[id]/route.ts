import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/app/db";
import { blogModel } from "@/app/db";
import { Types } from "mongoose";

// @ts-ignore
export async function GET(
  req: NextRequest,
  context: any
) {
  try {
    await connectToDB();

    const blogId = context.params.id;

    if (!Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
