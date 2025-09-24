// src/app/signin/page.jsx
import { Suspense } from "react";
import SignInClient from "./SignInClient";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <SignInClient />
    </Suspense>
  );
}
