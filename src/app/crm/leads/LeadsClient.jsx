// src/app/crm/leads/LeadsListClient.jsx
"use client";
import LeadListEditable from "../components/leadlisteditable";

export default function LeadsListClient() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Leads</h1>
      <LeadListEditable />
    </main>
  );
}
