"use client";

import { useEffect, useState } from "react";

export default function UsersAdminPage() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load users");
      setUsers(data.users || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function changeRole(id, newRole) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update role");
      setUsers((list) => list.map(u => (u.id === id ? { ...u, role: newRole } : u)));
    } catch (e) {
      alert(e.message);
    } finally {
      setUpdatingId(null);
    }
  }

  async function deleteUser(id, email) {
    if (!confirm(`Delete user ${email}? This cannot be undone.`)) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete user");
      setUsers((list) => list.filter(u => u.id !== id));
    } catch (e) {
      alert(e.message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-lg">Users</h2>
          <button className="btn btn-outline btn-sm" onClick={load}>Refresh</button>
        </div>

        {err && (
          <div className="alert alert-error mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
            <span>{err}</span>
          </div>
        )}

        <div className="overflow-x-auto mt-3">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={`skeleton-${i}`}>
                      <td><div className="skeleton h-4 w-48" /></td>
                      <td><div className="skeleton h-4 w-20" /></td>
                      <td><div className="skeleton h-4 w-32" /></td>
                      <td className="text-right"><div className="skeleton h-8 w-24 ml-auto" /></td>
                    </tr>
                  ))
                : users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.email}</td>
                      <td>
                        <select
                          className="select select-bordered select-sm"
                          value={u.role}
                          onChange={(e) => changeRole(u.id, e.target.value)}
                          disabled={updatingId === u.id}
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td>{new Date(u.createdAt).toLocaleString()}</td>
                      <td className="text-right">
                        <button
                          className={`btn btn-error btn-sm ${updatingId === u.id ? "btn-disabled" : ""}`}
                          onClick={() => deleteUser(u.id, u.email)}
                        >
                          {updatingId === u.id ? <span className="loading loading-spinner loading-sm" /> : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}

              {!loading && users.length === 0 && !err && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-base-content/60">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-2 text-xs text-base-content/60">
          Tip: keep at least one admin; you can’t delete or demote your own account from here.
        </p>
      </div>
    </div>
  );
}
