export function Badge({ children }) {
  return <span className="badge badge-outline">{children}</span>;
}

export function Pill({ ok }) {
  return <span className={`badge ${ok ? "badge-success" : "badge-error"} badge-sm`}>{ok ? "pass" : "fail"}</span>;
}
