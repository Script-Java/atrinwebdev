// src/app/crm/topics/topics-admin-client.jsx
"use client";
import { useEffect, useState } from "react";

export default function TopicsAdminClient() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [busy, setBusy] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/topics", { cache: "no-store" });
      const text = await res.text();
      if (!res.ok) throw new Error(`GET /api/admin/topics ${res.status} ${res.statusText} – ${text}`);
      const data = text ? JSON.parse(text) : { topics: [] };
      setTopics(data.topics || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function add() {
    if (!newTopic.trim()) return;
    setBusy("add");
    try {
      const res = await fetch("/api/admin/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: newTopic }),
        cache: "no-store",
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`POST /api/admin/topics ${res.status} ${res.statusText} – ${text}`);
      const data = text ? JSON.parse(text) : {};
      setTopics(data.topics || []);
      setNewTopic("");
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy("");
    }
  }

  async function remove(i) {
    if (!confirm(`Delete topic #${i + 1}?`)) return;
    setBusy(`del-${i}`);
    try {
      const res = await fetch(`/api/admin/topics/${i}`, { method: "DELETE", cache: "no-store" });
      const text = await res.text();
      if (!res.ok) throw new Error(`DELETE /api/admin/topics/${i} ${res.status} ${res.statusText} – ${text}`);
      const data = text ? JSON.parse(text) : {};
      setTopics(data.topics || []);
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy("");
    }
  }

  async function move(i, dir) {
    const to = dir === "up" ? i - 1 : i + 1;
    if (to < 0 || to >= topics.length) return;
    setBusy(`move-${i}`);
    try {
      const res = await fetch(`/api/admin/topics/${i}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toIndex: to }),
        cache: "no-store",
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`PUT /api/admin/topics/${i} ${res.status} ${res.statusText} – ${text}`);
      const data = text ? JSON.parse(text) : {};
      setTopics(data.topics || []);
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy("");
    }
  }

  return (
    <main className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Topics</h1>
        <button className="btn btn-outline btn-sm" onClick={load}>Refresh</button>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <div className="join w-full sm:w-auto">
            <input
              className="input input-bordered join-item w-full sm:w-96"
              placeholder="Add a new topic…"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
            />
            <button className={`btn join-item ${busy === "add" ? "loading" : ""}`} onClick={add} disabled={busy === "add"}>
              {busy === "add" ? "Adding…" : "Add"}
            </button>
          </div>

          {err && (
            <div className="alert alert-error mt-3"><span>{err}</span></div>
          )}

          <div className="overflow-x-auto mt-3">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="w-20">#</th>
                  <th>Topic</th>
                  <th className="text-right w-56">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i}>
                      <td><div className="skeleton h-4 w-8"/></td>
                      <td><div className="skeleton h-4 w-96"/></td>
                      <td className="text-right"><div className="skeleton h-8 w-32 ml-auto"/></td>
                    </tr>
                  ))
                ) : (
                  topics.map((t, i) => (
                    <tr key={`${i}-${String(t).slice(0,20)}`}>
                      <td>{i + 1}</td>
                      <td className="max-w-[48rem] truncate" title={t}>{t}</td>
                      <td className="text-right">
                        <div className="join">
                          <button className="btn btn-sm join-item" onClick={() => move(i, "up")} disabled={i === 0 || busy.startsWith("move-")}>↑</button>
                          <button className="btn btn-sm join-item" onClick={() => move(i, "down")} disabled={i === topics.length - 1 || busy.startsWith("move-")}>↓</button>
                          <button className={`btn btn-sm btn-error join-item ${busy === `del-${i}` ? "btn-disabled" : ""}`} onClick={() => remove(i)}>
                            {busy === `del-${i}` ? <span className="loading loading-spinner loading-sm"/> : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
                {!loading && topics.length === 0 && !err && (
                  <tr><td colSpan={3} className="py-8 text-center text-base-content/60">No topics yet. Add one above.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}