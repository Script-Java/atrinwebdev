export default function StatRow({ label, value, hint, monospace }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-base-200 last:border-none">
      <div className="text-sm opacity-70">{label}</div>
      <div className={`sm:col-span-2 font-medium ${monospace ? "font-mono" : ""}`}>
        {value ?? "—"} {hint ? <span className="opacity-60 text-xs ml-1">{hint}</span> : null}
      </div>
    </div>
  );
}
