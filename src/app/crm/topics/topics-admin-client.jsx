// src/app/crm/topics/topics-admin-client.jsx
"use client";
import { useEffect, useState, useCallback } from "react";

const API = "/api/admin/topics";

// Small helper to fetch -> text -> safe JSON -> throw helpful error
async function api(method, path = "", body) {
  const url = `${API}${path}${path.includes("?") ? "&" : "?"}t=${Date.now()}`;
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    // If server returned HTML (e.g. 405/500 page), keep raw for debugging
    data = { raw: text };
  }

  if (!res.ok) {
    const msg =
      data?.error ||
      `${method} ${url} → ${res.status} ${res.statusText}${text ? ` – ${text.slice(0, 200)}` : ""}`;
    throw new Error(msg);
  }
  return data;
}

export default function TopicsAdminClient() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setErr("");
    setLoading(true);
    try {
      const data = await api("GET");
      setTopics(data.topics || []);
    } catch (e) {
      setErr(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function add() {
    if (!newTopic.trim()) return;
    setBusy("add");
    try {
      const data = await api("POST", "", { topic: newTopic.trim() });
      setTopics(data.topics || []);
      setNewTopic("");
    } catch (e) {
      alert(e.message || String(e));
    } finally {
      setBusy("");
    }
  }

  async function remove(i) {
    if (!confirm(`Delete topic #${i + 1}?`)) return;
    setBusy(`del-${i}`);
    try {
      const data = await api("DELETE", `/${i}`);
      setTopics(data.topics || []);
    } catch (e) {
      alert(e.message || String(e));
    } finally {
      setBusy("");
    }
  }

  async function move(i, dir) {
    const to = dir === "up" ? i - 1 : i + 1;
    if (to < 0 || to >= topics.length) return;
    setBusy(`move-${i}`);
    try {
      const data = await api("PUT", `/${i}`, { toIndex: to });
      setTopics(data.topics || []);
    } catch (e) {
      alert(e.message || String(e));
    } finally {
      setBusy("");
    }
  }

  return (
    <main className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Topics</h1>
        <button className={`btn btn-outline btn-sm ${loading ? "btn-disabled" : ""}`} onClick={load} disabled={loading}>
          {loading ? "Loading…" : "Refresh"}
        </button>
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
            <button
              className={`btn join-item ${busy === "add" ? "loading" : ""}`}
              onClick={add}
              disabled={busy === "add"}
              aria-disabled={busy === "add"}
            >
              {busy === "add" ? "Adding…" : "Add"}
            </button>
          </div>

          {err && (
            <div className="alert alert-error mt-3 break-all">
              <span>{err}</span>
            </div>
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
                      <td><div className="skeleton h-4 w-8" /></td>
                      <td><div className="skeleton h-4 w-96" /></td>
                      <td className="text-right"><div className="skeleton h-8 w-32 ml-auto" /></td>
                    </tr>
                  ))
                ) : (
                  topics.map((t, i) => {
                    const deleting = busy === `del-${i}`;
                    const moving = busy.startsWith("move-");
                    return (
                      <tr key={`${i}-${String(t).slice(0, 20)}`}>
                        <td>{i + 1}</td>
                        <td className="max-w-[48rem] truncate" title={t}>{t}</td>
                        <td className="text-right">
                          <div className="join">
                            <button
                              className="btn btn-sm join-item"
                              onClick={() => move(i, "up")}
                              disabled={i === 0 || moving}
                              aria-disabled={i === 0 || moving}
                              title="Move up"
                            >
                              ↑
                            </button>
                            <button
                              className="btn btn-sm join-item"
                              onClick={() => move(i, "down")}
                              disabled={i === topics.length - 1 || moving}
                              aria-disabled={i === topics.length - 1 || moving}
                              title="Move down"
                            >
                              ↓
                            </button>
                            <button
                              className={`btn btn-sm btn-error join-item ${deleting ? "btn-disabled" : ""}`}
                              onClick={() => remove(i)}
                              disabled={deleting}
                              aria-disabled={deleting}
                              title="Delete"
                            >
                              {deleting ? <span className="loading loading-spinner loading-sm" /> : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
                {!loading && topics.length === 0 && !err && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-base-content/60">
                      No topics yet. Add one above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
