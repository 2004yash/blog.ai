import mongoose from "mongoose";
import { json } from "stream/consumers";
const { Schema } = mongoose;

if (!process.env.MONGODB_URL) throw new Error("Missing GOOGLE_API_KEY");
const uri: string = process.env.MONGODB_URL;

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
    default: ""
  },
  para2: {
    type: String,
    default: ""
  },
  para3: {
    type: String,
    default: ""
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  author: {
    type: String,
  },
});

export const blogModel = mongoose.model("blog", blogSchema);
