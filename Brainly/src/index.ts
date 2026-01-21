import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { UserModel, ContentModel, LinkModel } from "./db.js";
import { JWT_PASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js"; 
import { random } from "./utils.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || "mongodb+srv://Username:ZYuIYHirOd6cYdm4@cluster0.mux57z4.mongodb.net/Brainly")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Failed to connect:", err));

const app = express();
app.use(express.json());
app.use(cors());

// --- 🛠️ MAGIC ROUTE TO FIX DATABASE ERRORS 🛠️ ---
app.get("/api/v1/delete-indexes", async (req, res) => {
    try {
        await mongoose.connection.collection("contents").dropIndexes();
        res.json({ message: "✅ Success! Indexes deleted. You can now add content." });
    } catch(e) {
        console.error("Index Delete Error:", e);
        res.status(500).json({ message: "Error deleting indexes (Maybe they don't exist, which is fine)" });
    }
});

app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(403).json({ message: "User already exists" });
        }
        await UserModel.create({ username, password });
        res.json({ message: "User signed up" });
    } catch (e) {
        res.status(500).json({ message: "Error signing up" });
    }
});

app.post("/api/v1/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ username, password });
        if (existingUser) {
            const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);
            res.json({ token });
        } else {
            res.status(403).json({ message: "Incorrect credentials" });
        }
    } catch (e) {
        res.status(500).json({ message: "Server Error" });
    }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { link, type, title, tags } = req.body;

    // Validate required fields
    if (!link || !type || !title) {
      return res.status(400).json({ message: "Link, type, and title are required" });
    }

    // @ts-ignore read from middleware
    const userId = (req as any).userId;
    console.debug("Create content request headers:", req.headers);
    console.debug("Create content - resolved userId:", userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing. Please sign in." });
    }

    const content = await ContentModel.create({
      link,
      type,
      title,
      // @ts-ignore
      userId,
      tags: tags || []
    });

    return res.json({ message: "Content added", content });
  } catch (error: any) {
    console.error("Error adding content:", error);

    // Handle duplicate-key caused by an accidental unique index on userId
    if (error && error.code === 11000) {
      try {
        if (!mongoose.connection.db) {
          throw new Error("Database connection not available");
        }
        const coll = mongoose.connection.db.collection("contents");
        const indexes = await coll.indexes();
        // find a unique index that targets userId (case-insensitive)
        const badIndex = indexes.find((i: any) => {
          if (!i.key || !i.unique) return false;
          return Object.keys(i.key).some((k: string) => k.toLowerCase() === "userid");
        });

        if (badIndex && typeof badIndex.name === "string") {
          console.warn(`Dropping bad unique index on contents: ${badIndex.name}`);
          await coll.dropIndex(badIndex.name);

          // retry insert once
          // @ts-ignore
          const userId = (req as any).userId;
          const retryContent = await ContentModel.create({
            link: req.body.link,
            type: req.body.type,
            title: req.body.title,
            // @ts-ignore
            userId,
            tags: req.body.tags || []
          });

          return res.json({
            message: "Content added (after dropping bad index)",
            content: retryContent
          });
        }
      } catch (dropErr: any) {
        console.error("Failed to drop bad index or retry insert:", dropErr);
        return res.status(500).json({
          message: "Database index problem. Could not drop bad index automatically.",
          error: dropErr.message || dropErr
        });
      }

      return res.status(400).json({
        message: "Duplicate key error while adding content. Possible unique index on userId.",
        error: error.keyValue || error.errmsg
      });
    }

    res.status(500).json({ message: "Error adding content", error: error?.message });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        // FIX: Added 'as string'
        const userId = (req as any).userId as string;
        const content = await ContentModel.find({ userId }).populate("userId", "username");
        res.json({ content });
    } catch(e) {
        res.status(500).json({ message: "Error fetching content" });
    }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    // FIX: Added 'as string'
    const userId = (req as any).userId as string;
    try {
        await ContentModel.deleteMany({ _id: contentId, userId });
        res.json({ message: "Deleted" });
    } catch(e) {
        res.status(500).json({ message: "Error deleting" });
    }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    // FIX: Added 'as string' - This fixes the specific error you just saw
    const userId = (req as any).userId as string;

    try {
        if (share) {
            const existing = await LinkModel.findOne({ userId });
            if (existing) return res.json({ hash: existing.hash });
            const hash = random(10);
            await LinkModel.create({ userId, hash });
            res.json({ hash });
        } else {
            await LinkModel.deleteOne({ userId });
            res.json({ message: "Removed" });
        }
    } catch(e) {
        res.status(500).json({ message: "Error sharing" });
    }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    try {
        const link = await LinkModel.findOne({ hash });
        if (!link) return res.status(411).json({ message: "Incorrect link" });
        
        const content = await ContentModel.find({ userId: link.userId });
        const user = await UserModel.findOne({ _id: link.userId });
        
        if (!user) return res.status(411).json({ message: "User not found" });
        res.json({ username: user.username, content });
    } catch(e) {
        res.status(500).json({ message: "Error fetching brain" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));