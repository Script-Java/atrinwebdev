"use client";
import { useEffect, useState } from "react";

export default function PostsAdminClient(){
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [err,setErr]=useState("");
  const [busy,setBusy]=useState("");

  async function load(){
    setLoading(true); setErr("");
    try{
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if(!res.ok) throw new Error(data.error||"Failed");
      setPosts(data.posts||[]);
    }catch(e){ setErr(e.message); } finally { setLoading(false); }
  }
  useEffect(()=>{ load(); },[]);

  async function del(slug){
    if(!confirm(`Delete ${slug}?`)) return;
    setBusy(slug);
    try{
      const res = await fetch(`/api/admin/posts/${slug}`,{ method:"DELETE" });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error||"Delete failed");
      setPosts(p=>p.filter(x=>x.slug!==slug));
    }catch(e){ alert(e.message); } finally { setBusy(""); }
  }

  return (
    <main className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Posts</h1>
        <button className="btn btn-outline btn-sm" onClick={load}>Refresh</button>
      </div>

      {err && <div className="alert alert-error mt-3"><span>{err}</span></div>}

      <div className="card bg-base-100 shadow-xl border border-base-200 mt-3">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? Array.from({length:6}).map((_,i)=>(
                  <tr key={i}>
                    <td><div className="skeleton h-4 w-72"/></td>
                    <td><div className="skeleton h-4 w-48"/></td>
                    <td><div className="skeleton h-4 w-32"/></td>
                    <td className="text-right"><div className="skeleton h-8 w-24 ml-auto"/></td>
                  </tr>
                )) : posts.map(p=>(
                  <tr key={p.slug}>
                    <td className="max-w-[24rem] truncate" title={p.title}>{p.title}</td>
                    <td>{p.slug}</td>
                    <td>{p.date ? new Date(p.date).toLocaleDateString() : "-"}</td>
                    <td className="text-right">
                      <div className="join">
                        <a className="btn btn-sm join-item" href={`/blog/${p.slug}`} target="_blank">View</a>
                        <button className={`btn btn-sm btn-error join-item ${busy===p.slug?"btn-disabled":""}`} onClick={()=>del(p.slug)}>
                          {busy===p.slug ? <span className="loading loading-spinner loading-sm"/> : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && posts.length===0 && !err && (
                  <tr><td colSpan={4} className="py-8 text-center text-base-content/60">No posts found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
