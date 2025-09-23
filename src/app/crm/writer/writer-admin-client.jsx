"use client";

import { useEffect, useRef, useState } from "react";

export default function WriterAdminClient() {
  const [runs, setRuns] = useState([]);
  const [currentRun, setCurrentRun] = useState(null); // runId
  const [logs, setLogs] = useState([]);
  const [loadingRuns, setLoadingRuns] = useState(true);
  const [running, setRunning] = useState(false);
  const pollRef = useRef(null);

  async function loadRuns() {
    setLoadingRuns(true);
    try {
      const res = await fetch(`/api/admin/writer/runs?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load runs");
      setRuns(data.runs || []);
      return data.runs || [];
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      setLoadingRuns(false);
    }
  }

  async function loadLogs(runId) {
    try {
      const res = await fetch(`/api/admin/writer/logs/${runId}?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load logs");
      setLogs(data.logs || []);
    } catch (e) {
      console.error(e);
    }
  }

  function startPolling(runId) {
    stopPolling();
    pollRef.current = setInterval(async () => {
      await loadLogs(runId);
      const latest = await loadRuns(); // use fresh array, not possibly stale state
      const status = (latest.find((r) => r.id === runId) || {}).status;
      if (status && status !== "running") {
        stopPolling();
      }
    }, 1000);
  }

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  useEffect(() => {
    loadRuns();
    return () => stopPolling(); // cleanup on unmount
  }, []);

  async function runNow() {
    if (!confirm("Run the AI blog writer now?")) return;
    setRunning(true);
    try {
      const res = await fetch("/api/admin/writer/run", { method: "POST", cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Run failed");
      setCurrentRun(data.runId);
      setLogs(data.logs || []);
      await loadRuns();
      startPolling(data.runId);
    } catch (e) {
      alert(e.message);
    } finally {
      setRunning(false);
    }
  }

  return (
    <main className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">AI Blog Writer</h1>
        <div className="join">
          <button className="btn btn-outline join-item" onClick={loadRuns}>
            Refresh
          </button>
          <button
            className={`btn btn-primary join-item ${running ? "loading" : ""}`}
            onClick={runNow}
            disabled={running}
          >
            {running ? "Running…" : "Run now"}
          </button>
        </div>
      </div>

      {/* Recent runs */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <h2 className="card-title">Recent runs</h2>
          {loadingRuns ? (
            <div className="space-y-2">
              <div className="skeleton h-4 w-72" />
              <div className="skeleton h-4 w-96" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Started</th>
                    <th>Status</th>
                    <th>Slug</th>
                    <th>Error</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((r) => (
                    <tr key={r.id}>
                      <td className="whitespace-nowrap">
                        {r.startedAt ? new Date(r.startedAt).toLocaleString() : "-"}
                      </td>
                      <td>
                        <span className={`badge ${badgeFor(r.status)}`}>{r.status}</span>
                      </td>
                      <td className="max-w-[20rem] truncate" title={r.slug || ""}>
                        {r.slug || "-"}
                      </td>
                      <td className="max-w-[24rem] truncate text-error" title={r.error || ""}>
                        {r.error || ""}
                      </td>
                      <td className="text-right">
                        <div className="join">
                          <button
                            className="btn btn-sm join-item"
                            onClick={() => {
                              setCurrentRun(r.id);
                              setLogs([]);
                              loadLogs(r.id);
                              startPolling(r.id);
                            }}
                          >
                            View logs
                          </button>
                          {r.slug && (
                            <a className="btn btn-sm join-item" href={`/blog/${r.slug}`} target="_blank">
                              Open post
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {runs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-base-content/60">
                        No runs yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Live / selected logs */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <h2 className="card-title">Logs {currentRun ? `· Run ${currentRun}` : ""}</h2>
            {currentRun && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  stopPolling();
                  setCurrentRun(null);
                  setLogs([]);
                }}
              >
                Clear
              </button>
            )}
          </div>
          <div className="mt-2 border rounded bg-base-200 p-3 max-h-[480px] overflow-auto text-sm font-mono">
            {logs.length === 0 ? (
              <div className="text-base-content/60">No logs yet.</div>
            ) : (
              logs.map((l, i) => (
                <div key={i} className="mb-1">
                  <span className={`mr-2 ${colorFor(l.level)}`}>{l.level.toUpperCase()}</span>
                  <span className="mr-2 text-base-content/70">{new Date(l.ts).toLocaleTimeString()}</span>
                  {l.step && <span className="mr-2">[{l.step}]</span>}
                  <span>{l.message}</span>
                  {l.meta && (
                    <pre className="mt-1 whitespace-pre-wrap text-xs opacity-80">
                      {JSON.stringify(l.meta, null, 2)}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function badgeFor(status) {
  if (status === "ok") return "badge-success";
  if (status === "error") return "badge-error";
  if (status === "skipped") return "badge-ghost";
  return "badge-info"; // running
}
function colorFor(level) {
  if (level === "error") return "text-error";
  if (level === "warn") return "text-warning";
  return "text-success";
}
