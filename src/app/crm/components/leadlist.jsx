"use client";
import { useEffect, useMemo, useState } from "react";

export default function LeadList({ refreshKey }) {
  const [leads, setLeads] = useState([]);
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounce search term to avoid spamming the API
  const debouncedQ = useDebounce(q, 350);

  const load = async (query) => {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`/api/crm/leads${query ? `?q=${encodeURIComponent(query)}` : ""}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load leads");
      setLeads(data.leads || []);
    } catch (e) {
      setErr(e.message || "Failed to load leads");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(debouncedQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey, debouncedQ]);

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="card-title text-lg">Leads</h3>
          <div className="join w-full sm:w-auto">
            <input
              className="input input-bordered join-item w-full sm:w-72"
              placeholder="Search name, email, phone…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button onClick={() => load(q)} className="btn join-item">
              Search
            </button>
          </div>
        </div>

        {/* Error */}
        {err && (
          <div className="alert alert-error mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"/>
            </svg>
            <span>{err}</span>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto mt-2">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Phone</th>
                <th className="text-left">Source</th>
                <th className="text-left">Status</th>
                <th className="text-left">Created</th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={`skeleton-${i}`}>
                      <td><div className="skeleton h-4 w-40" /></td>
                      <td><div className="skeleton h-4 w-48" /></td>
                      <td><div className="skeleton h-4 w-28" /></td>
                      <td><div className="skeleton h-4 w-24" /></td>
                      <td><div className="skeleton h-6 w-20 rounded-full" /></td>
                      <td><div className="skeleton h-4 w-36" /></td>
                    </tr>
                  ))
                : leads.map((l) => (
                    <tr key={l.id}>
                      <td className="whitespace-nowrap">{l.name || "-"}</td>
                      <td className="whitespace-nowrap">{l.email || "-"}</td>
                      <td className="whitespace-nowrap">{l.phone || "-"}</td>
                      <td className="whitespace-nowrap">{l.source || "-"}</td>
                      <td>
                        <span className={`badge ${statusBadgeClass(l.status)}`}>
                          {prettyStatus(l.status)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap">
                        {l.createdAt ? new Date(l.createdAt).toLocaleString() : "-"}
                      </td>
                    </tr>
                  ))}

              {!loading && !err && leads.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="flex items-center justify-center py-10 text-base-content/60">
                      No leads yet. Try adding one!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function statusBadgeClass(status) {
  const s = String(status || "").toLowerCase();
  if (s === "won") return "badge-success";
  if (s === "qualified") return "badge-info";
  if (s === "contacted") return "badge-primary";
  if (s === "lost") return "badge-error";
  return "badge-ghost"; // 'new' or unknown
}

function prettyStatus(status) {
  return String(status || "new")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Small debounce hook
function useDebounce(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}