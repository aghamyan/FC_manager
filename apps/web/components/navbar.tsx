"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const { status, data } = useSession();

  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-indigo-400">
            FC Manager
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${
                  pathname === item.href
                    ? "text-indigo-400"
                    : "text-slate-300 hover:text-indigo-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {status === "authenticated" && (
            <span className="hidden text-sm text-slate-200 sm:inline">
              {data?.user?.name}
            </span>
          )}
          {status === "authenticated" ? (
            <button
              type="button"
              className="button-secondary text-sm"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Link className="button-secondary text-sm" href="/login">
                Login
              </Link>
              <Link className="button-primary text-sm" href="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
