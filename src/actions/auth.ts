"use server";

import { signIn, signOut } from "@/auth";
import { saltAndHashPassword } from "@/utils/helper";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";

const getUserByEmail = async (email: string) => {
  await connectToDatabase();
  try {
    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    console.log(user);
    return user;
  } catch (e) {
    console.log("Error getUserByEmail", e);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/tools/landing-page" });
  revalidatePath("/tools/landing-page");
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const registerWithCreds = async (formData: FormData) => {
  await connectToDatabase();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { success: false, message: "User already exists" };

  try {
    const hashedPassword = saltAndHashPassword(password);

    const user = await User.create({
      data: { email, hashedPassword },
    });
    console.log("registerWithCreds:", user);
    return { success: true, message: "User created successfully" };
  } catch (e: unknown) {
    console.error("Error in registerWithCreds:", e);

    if (e instanceof Error) {
      return { success: false, message: e.message };
    }
    throw e;
  }
};

export const loginWithCreds = async (formData: FormData) => {
  await connectToDatabase();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  const existingUser = await getUserByEmail(email);
  if (!existingUser)
    return {
      success: false,
      message: "User not found. Please register first.",
    };

  const isMatch = bcrypt.compareSync(
    password as string,
    existingUser.hashedPassword as string,
  );

  if (!isMatch) return { success: false, message: "Invalid password" };
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true, message: "Login successful" };
  } catch (e) {
    console.error("Error in loginWithCreds:", e);

    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid email or password." };
        default:
          return {
            success: false,
            message: "Something went wrong. Please try again.",
          };
      }
    }

    throw e;
  }

  revalidatePath("/");
};

export const getManagers = async () => {
  try {
    connectToDatabase();
    const managers = await User.find({ role: "manager" }).select("email _id");
    return managers;
  } catch (e) {
    console.log("Error getting managers:", e);
    return [];
  }
};
