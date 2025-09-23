import Sidebar from "./components/sidebar";
import Header from "./components/header";

export default function CRMLayout({ children }) {
  return (
    <div style={{ minHeight:"100dvh", display:"grid", gridTemplateRows:"auto 1fr" }}>
      <Header />
      <div style={{ display:"grid", gridTemplateColumns:"auto 1fr" }}>
        <Sidebar />
        <main style={{ padding:16 }}>{children}</main>
      </div>
    </div>
  );
}
