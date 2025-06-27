
export default function ScrollingBar() {
  const content = (
<>
  <span>Web Design</span>
  <span>■</span>
  <span>SEO Optimization</span>
  <span>■</span>
  <span>App Development</span>
  <span>■</span>
  <span>Google Ads</span>
  <span>■</span>
  <span>Conversion Funnels</span>
  <span>■</span>
  <span>Custom Websites</span>
  <span>■</span>
  <span>Brand Strategy</span>
  <span>■</span>
  <span>UI/UX Design</span>
  <span>■</span>
  <span>Mobile Optimization</span>
  <span>■</span>
  <span>CRM Setup</span>
  <span>■</span>
  <span>Startup Growth</span>
  <span>■</span>
  <span>Booking Systems</span>
</>

  );

  return (
    <div className="overflow-hidden border-t border-white py-2 bg-black text-white">
      <div className="marquee whitespace-nowrap flex gap-10 text-sm uppercase font-mono tracking-widest">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-10">{content}</div>
        ))}
      </div>
    </div>
  );
}
