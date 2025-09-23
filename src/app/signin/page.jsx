// src/app/signin/page.jsx
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import logo from "../assets/logo/logo-white.png"

export default function SignIn() {
  const sp = useSearchParams();
  const err = sp.get("error");
  const callbackUrl = sp.get("callbackUrl") || "/crm";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      callbackUrl,
      redirect: true,
    });
    // next-auth handles redirects; loading state will clear on nav
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="flex flex-col items-center mb-6">
            <div className="mask mask-squircle bg-base-100/60 backdrop-blur p-3 shadow">
              <Image
                src={logo}
                alt="AtrinWebDev"
                width={72}
                height={72}
                className="object-contain"
                priority
              />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">
              AtrinWebDev CRM
            </h1>
            <p className="text-base-content/60 mt-1">Sign in to continue</p>
          </div>

          {/* Card */}
          <div className="card w-full shadow-xl bg-base-100/90 backdrop-blur">
            <div className="card-body">
              {err && (
                <div className="alert alert-error mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"
                    />
                  </svg>
                  <span>
                    {err === "CredentialsSignin"
                      ? "Invalid email or password."
                      : decodeURIComponent(err)}
                  </span>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-3">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="name@atrinwebdev.com"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <div className="join w-full">
                    <input
                      type={showPwd ? "text" : "password"}
                      className="input input-bordered join-item w-full"
                      placeholder="••••••••••"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-ghost join-item"
                      onClick={() => setShowPwd((s) => !s)}
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      {showPwd ? (
                        // eye-off
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3.11-11-8 1-2.73 2.86-4.99 5.06-6.44M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8a11.65 11.65 0 0 1-2.27 3.19M1 1l22 22"/>
                          <path d="M9.9 4.24l10.86 10.86"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      ) : (
                        // eye
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </label>

                {/* Actions */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className={`btn btn-primary w-full ${loading ? "btn-disabled" : ""}`}
                  >
                    {loading && <span className="loading loading-spinner loading-sm mr-2" />}
                    {loading ? "Signing in…" : "Sign in"}
                  </button>
                </div>
              </form>

              {/* Subtle footer */}
              <div className="mt-4 text-center text-xs text-base-content/60">
                Protected access • No public registration
              </div>
            </div>
          </div>

          {/* Tiny footer */}
          <p className="mt-6 text-center text-xs text-base-content/50">
            © {new Date().getFullYear()} AtrinWebDev. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
