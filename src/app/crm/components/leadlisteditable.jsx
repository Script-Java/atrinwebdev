// src/app/crm/components/LeadListEditable.jsx
"use client";

import { useEffect, useState } from "react";

export default function LeadListEditable() {
  const [leads, setLeads] = useState([]);
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const load = async (query) => {
    setErr(""); setLoading(true);
    try {
      const res = await fetch(`/api/crm/leads${query ? `?q=${encodeURIComponent(query)}` : ""}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load leads");
      setLeads(data.leads || []);
    } catch (e) {
      setErr(e.message || "Failed to load leads");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(""); }, []);

  const startEdit = (lead) => {
    setEditingId(lead.id);
    setEditForm({
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      source: lead.source || "",
      status: lead.status || "new",
      notes: lead.notes || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`/api/crm/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setLeads((list) => list.map((l) => (l.id === id ? data.lead : l)));
      cancelEdit();
    } catch (e) {
      alert(e.message);
    }
  };

  const remove = async (id, nameOrEmail) => {
    if (!confirm(`Delete lead ${nameOrEmail || id}? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/crm/leads/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setLeads((list) => list.filter((l) => l.id !== id));
    } catch (e) {
      alert(e.message);
    }
  };

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

        {err && (
          <div className="alert alert-error mt-2">
            <span>{err}</span>
          </div>
        )}

        <div className="overflow-x-auto mt-2">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Phone</th>
                <th className="text-left">Source</th>
                <th className="text-left">Status</th>
                <th className="text-left">Notes</th>
                <th className="text-left">Created</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={`skeleton-${i}`}>
                      {Array.from({ length: 7 }).map((__, j) => (
                        <td key={j}><div className="skeleton h-4 w-40" /></td>
                      ))}
                      <td className="text-right">
                        <div className="skeleton h-8 w-24 ml-auto" />
                      </td>
                    </tr>
                  ))
                : leads.map((l) => {
                    const isEditing = editingId === l.id;
                    return (
                      <tr key={l.id}>
                        <td>
                          {isEditing ? (
                            <input
                              className="input input-bordered input-xs w-40"
                              value={editForm.name}
                              onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                            />
                          ) : (
                            l.name || "-"
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input
                              className="input input-bordered input-xs w-56"
                              type="email"
                              value={editForm.email}
                              onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                            />
                          ) : (
                            l.email || "-"
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input
                              className="input input-bordered input-xs w-36"
                              value={editForm.phone}
                              onChange={(e) => setEditForm((f) => ({ ...f, phone: e.target.value }))}
                            />
                          ) : (
                            l.phone || "-"
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input
                              className="input input-bordered input-xs w-36"
                              value={editForm.source}
                              onChange={(e) => setEditForm((f) => ({ ...f, source: e.target.value }))}
                            />
                          ) : (
                            l.source || "-"
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <select
                              className="select select-bordered select-xs"
                              value={editForm.status}
                              onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                            >
                              <option value="new">new</option>
                              <option value="contacted">contacted</option>
                              <option value="qualified">qualified</option>
                              <option value="won">won</option>
                              <option value="lost">lost</option>
                            </select>
                          ) : (
                            <span className={`badge ${statusBadgeClass(l.status)}`}>
                              {prettyStatus(l.status)}
                            </span>
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input
                              className="input input-bordered input-xs w-64"
                              value={editForm.notes}
                              onChange={(e) => setEditForm((f) => ({ ...f, notes: e.target.value }))}
                            />
                          ) : (
                            l.notes ? <span className="truncate inline-block max-w-[16rem]" title={l.notes}>{l.notes}</span> : "-"
                          )}
                        </td>
                        <td className="whitespace-nowrap">
                          {l.createdAt ? new Date(l.createdAt).toLocaleString() : "-"}
                        </td>
                        <td className="text-right">
                          {isEditing ? (
                            <div className="join">
                              <button className="btn btn-sm btn-ghost join-item" onClick={cancelEdit}>
                                Cancel
                              </button>
                              <button className="btn btn-sm btn-primary join-item" onClick={() => saveEdit(l.id)}>
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="join">
                              <button className="btn btn-sm join-item" onClick={() => startEdit(l)}>
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-error join-item"
                                onClick={() => remove(l.id, l.name || l.email)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}

              {!loading && leads.length === 0 && !err && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-base-content/60">
                    No leads found.
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

/* helpers */
function statusBadgeClass(status) {
  const s = String(status || "").toLowerCase();
  if (s === "won") return "badge-success";
  if (s === "qualified") return "badge-info";
  if (s === "contacted") return "badge-primary";
  if (s === "lost") return "badge-error";
  return "badge-ghost";
}
function prettyStatus(status) {
  return String(status || "new").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}
