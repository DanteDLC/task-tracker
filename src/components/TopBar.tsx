// components/Topbar.tsx
import Link from "next/link";
import { Bell, UserPlus } from "lucide-react";
import { logout } from "@/actions/auth";

export default async function TopBar() {
  return (
    <header className="flex w-full items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
      {/* Logo / Title */}
      <Link href="/" className="text-xl font-bold text-gray-800">
        Dashboard
      </Link>
      {/* ROUTES */}
      <div className="flex items-center justify-start gap-4">
        <Link
          href="/tools/time-record"
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
        >
          Time Record
        </Link>
        <Link
          href="/onboarding/new-position"
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
        >
          New Position
        </Link>
        <Link
          href="/onboarding/new-service"
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-800 transition hover:bg-gray-100"
        >
          New Service
        </Link>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-800 transition hover:cursor-pointer hover:bg-gray-100"
          onClick={logout}
        >
          <UserPlus className="h-4 w-4" />
          Log out
        </button>
        <button
          type="button"
          className="relative rounded-full p-2 transition hover:bg-gray-100"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          {/* You could add a notification dot here */}
          {/* <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" /> */}
        </button>
      </div>
    </header>
  );
}
