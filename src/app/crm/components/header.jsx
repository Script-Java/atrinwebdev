"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import logo from "../../assets/logo/logo-white.png"

export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-sm px-4">
      {/* Left: logo + brand */}
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          alt="AtrinWebDev"
          width={32}
          height={32}
          className="rounded-md"
        />
        <span className="text-lg font-bold">AtrinWebDev CRM</span>
      </div>

      {/* Right: user menu */}
      <div className="ml-auto z-10">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary/20 ring-offset-base-100">
              <Image
                src="/avatar.png" // fallback avatar (or dynamic user profile image later)
                alt="User Avatar"
                width={40}
                height={40}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-48"
          >
            <li>
              <a onClick={() => signOut({ callbackUrl: "/signin" })}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
