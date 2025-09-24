export default function KeyVal({ k, v }) {
  return (
    <div className="flex items-center justify-between text-sm py-1">
      <div className="opacity-70">{k}</div>
      <div className="font-mono">{v ?? "—"}</div>
    </div>
  );
}
