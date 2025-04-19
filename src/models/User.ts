import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: String,
  hashedPassword: String,
  role: { type: String, enum: ["manager", "admin", "user"] },
});

export const User = models.User || model("User", UserSchema, "Users");
