import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectToDatabase } from "@/lib/mongoose";
import { saltAndHashPassword } from "@/utils/helper";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.json();
    const email = formData.email.toLowerCase() as string;
    const password = formData.password as string;

    const secret = request.headers.get("Authorization");
    if (secret !== "dikonatanda") {
      return NextResponse.json(
        {
          message: "Invalid secret",
        },
        { status: 401 },
      );
    }
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Incomplete Data",
        },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        {
          message: "User already exists",
        },
        { status: 409 },
      );

    const hashedPassword = saltAndHashPassword(password);

    const user = new User({
      email: email,
      hashedPassword: hashedPassword,
    });
    await user.save();

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      { status: 201 },
    );
  } catch (e) {
    console.log("Error Registering User:", e);
    return NextResponse.json(
      { message: e || "Internal Server Error" },
      { status: 500 },
    );
  }
}
