"use client";
import { useState } from "react";
import AddLeadForm from "./components/addleadform";
import LeadList from "./components/leadlist";

export default function LeadsClient(/* { initialData } */) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="p-4 grid gap-4">
      <AddLeadForm onCreated={() => setRefreshKey(k => k + 1)} />
      <LeadList refreshKey={refreshKey} />
    </main>
  );
}
