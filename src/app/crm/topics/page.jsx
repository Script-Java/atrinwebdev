// src/app/crm/topics/page.jsx
export const dynamic = "force-dynamic";     // never pre-render
export const fetchCache = "force-no-store"; // no fetch caching
export const revalidate = 0;                // disable ISR

import TopicsAdminClient from "./topics-admin-client";

export default function TopicsPage() {
  return <TopicsAdminClient />;
}
