
import mongoose, { Schema, models, model } from "mongoose";

const uri = process.env.MONGODB_URL || "";

if (!uri) throw new Error("Missing MONGODB_URL in environment variables");

let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

const blogSchema = new Schema({
  title: {
    type: String,
    default: "Untitled",
  },
  para1: {
    type: String,
    default: "",
  },
  para2: {
    type: String,
    default: "",
  },
  para3: {
    type: String,
    default: "",
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  author: {
    type: String,
    default: "Anonymous",
  },
});

export const blogModel = models.Blog || model("Blog", blogSchema);
