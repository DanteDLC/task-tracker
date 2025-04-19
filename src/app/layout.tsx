import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterProvider from "@/provider/toast";
// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "boilerplate",
  description: "dlcrz? hehe",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();

  return (
    // <SessionProvider session={session}>
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <main className="grow">{children}</main>
          <ToasterProvider />
        </div>
      </body>
    </html>
    // </SessionProvider>
  );
}
