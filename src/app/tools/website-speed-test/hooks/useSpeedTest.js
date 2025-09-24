// tools/website-speed-test/hooks/useSpeedTest.js
"use client";
import { useState } from "react";
import { normalizeResult } from "@/lib/psi/normalize";

export function useSpeedTest() {
  const [vm, setVm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function run(urlOrPath, meta) {
    setLoading(true);
    setErr("");
    setVm(null);

    try {
      const r = await fetch(urlOrPath);
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || "Failed");

      // API returns { normalized, psi } — fall back to raw PSI if needed
      const rawPsi = j?.psi || j;
      const nextVm = normalizeResult(rawPsi);
      setVm(nextVm);

      // keep the URL shareable
      if (meta?.url && meta?.strategy) {
        const u = new URL(window.location.href);
        u.searchParams.set("url", meta.url);
        u.searchParams.set("strategy", meta.strategy);
        window.history.replaceState({}, "", u.toString());
      }
    } catch (e) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return { vm, loading, err, run };
}
