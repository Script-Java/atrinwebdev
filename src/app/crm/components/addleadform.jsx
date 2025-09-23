"use client";
import { useState } from "react";

export default function AddLeadForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        email: form.email?.trim().toLowerCase() || "",
      };

      const res = await fetch("/api/crm/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setForm({ name: "", email: "", phone: "", source: "", notes: "" });
      onCreated?.(data.lead);
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="card bg-base-100 shadow-xl border border-base-200"
    >
      <div className="card-body space-y-3">
        <h3 className="card-title text-lg">Add New Lead</h3>

        {err && (
          <div className="alert alert-error py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
            <span>{err}</span>
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="input input-bordered w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="input input-bordered w-full"
        />

        <input
          type="tel"
          placeholder="Phone (+1... or digits)"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="input input-bordered w-full"
        />

        <input
          type="text"
          placeholder="Source (e.g. Website, Referral)"
          value={form.source}
          onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
          className="input input-bordered w-full"
        />

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          className="textarea textarea-bordered w-full"
          rows={3}
        />

        <div className="card-actions justify-end">
          <button
            type="submit"
            disabled={saving}
            className={`btn btn-primary w-full ${saving ? "loading" : ""}`}
          >
            {saving ? "Saving..." : "Create Lead"}
          </button>
        </div>
      </div>
    </form>
  );
}

