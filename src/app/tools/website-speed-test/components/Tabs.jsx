export default function Tabs({ active, setActive, items }) {
  return (
    <div role="tablist" className="tabs tabs-boxed">
      {items.map(([id, label]) => (
        <a
          key={id}
          role="tab"
          className={`tab ${active === id ? "tab-active" : ""}`}
          onClick={() => setActive(id)}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
