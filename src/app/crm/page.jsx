// server component (no "use client")
import LeadsClient from "./leadsClient";

export default async function CRMHome() {
  // If you really need server-side data first, you can do it here:
  // const dbResult = await getData(); // <- safe here (server)

  return <LeadsClient /* initialData={dbResult} */ />;
}
