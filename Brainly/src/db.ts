import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  // 👇 IMPORTANT: No 'unique: true' here!
 userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  type: String
});

const LinkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

export const UserModel = model("User", UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Links", LinkSchema);