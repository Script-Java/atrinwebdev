"use client";

import { useEffect, useState } from "react";

export default function SettingsClient() {
  const [profile, setProfile] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [theme, setTheme] = useState("light");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [err, setErr] = useState("");

  async function loadAll() {
    setErr("");
    try {
      const [meRes, appRes] = await Promise.all([
        fetch("/api/settings/me"),
        fetch("/api/settings/app"),
      ]);
      const me = await meRes.json();
      const app = await appRes.json();
      if (!meRes.ok) throw new Error(me.error || "Failed to load profile");
      if (!appRes.ok) throw new Error(app.error || "Failed to load app settings");
      setProfile(me.user);
      setCompanyName(app.settings.company_name || "");
      setTheme(app.settings.theme || "light");
      // apply theme instantly
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", app.settings.theme || "light");
      }
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function saveProfile(e) {
    e.preventDefault();
    setSavingProfile(true);
    setErr("");
    try {
      const res = await fetch("/api/settings/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profile?.name || "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save profile");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    setPwLoading(true);
    setErr("");
    const fd = new FormData(e.currentTarget);
    const currentPassword = fd.get("currentPassword");
    const newPassword = fd.get("newPassword");
    try {
      const res = await fetch("/api/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to change password");
      e.currentTarget.reset();
      // optional toast
      alert("Password updated.");
    } catch (e) {
      setErr(e.message);
    } finally {
      setPwLoading(false);
    }
  }

  async function savePreferences(e) {
    e.preventDefault();
    setSavingPrefs(true);
    setErr("");
    try {
      const res = await fetch("/api/settings/app", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company_name: companyName, theme }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save preferences");
      // apply theme after save
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);
      }
    } catch (e) {
      setErr(e.message);
    } finally {
      setSavingPrefs(false);
    }
  }

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Settings</h1>

      {err && (
        <div className="alert alert-error">
          <span>{err}</span>
        </div>
      )}

      {/* Profile */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title">Profile</h2>
          {!profile ? (
            <div className="space-y-2">
              <div className="skeleton h-4 w-64" />
              <div className="skeleton h-4 w-40" />
            </div>
          ) : (
            <form onSubmit={saveProfile} className="grid gap-3 max-w-lg">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input className="input input-bordered" value={profile.email} readOnly />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Display name</span>
                </div>
                <input
                  className="input input-bordered"
                  value={profile.name || ""}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Enter your name"
                />
              </label>

              <div className="card-actions mt-2">
                <button className={`btn btn-primary ${savingProfile ? "loading" : ""}`} disabled={savingProfile}>
                  {savingProfile ? "Saving…" : "Save Profile"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Password */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title">Password</h2>
          <form onSubmit={changePassword} className="grid gap-3 max-w-lg">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Current password</span>
              </div>
              <input name="currentPassword" type="password" className="input input-bordered" required />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">New password</span>
              </div>
              <input name="newPassword" type="password" className="input input-bordered" required />
            </label>

            <div className="card-actions mt-2">
              <button className={`btn btn-primary ${pwLoading ? "loading" : ""}`} disabled={pwLoading}>
                {pwLoading ? "Updating…" : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* App Preferences */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title">App Preferences</h2>
          <form onSubmit={savePreferences} className="grid gap-3 max-w-xl">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Company name</span>
              </div>
              <input
                className="input input-bordered"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="AtrinWebDev"
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Theme</span>
              </div>
              <select
                className="select select-bordered"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                {/* common daisyUI themes — customize as you like */}
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="cupcake">cupcake</option>
                <option value="corporate">corporate</option>
                <option value="synthwave">synthwave</option>
                <option value="valentine">valentine</option>
                <option value="retro">retro</option>
                <option value="aqua">aqua</option>
                <option value="lofi">lofi</option>
                <option value="pastel">pastel</option>
              </select>
            </label>

            <div className="card-actions mt-2">
              <button className={`btn btn-primary ${savingPrefs ? "loading" : ""}`} disabled={savingPrefs}>
                {savingPrefs ? "Saving…" : "Save Preferences"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
