import React from 'react';

export default function ScrollingBar() {
  const content = (
    <>
      <span>Websites That Convert</span>
      <span>■</span>
      <span>Rank Higher On Google</span>
      <span>■</span>
      <span>Generate More Leads</span>
      <span>■</span>
      <span>Your Digital Growth Partner</span>
      <span>■</span>
      <span>Launch Your Online Store</span>
      <span>■</span>
      <span>Build A Stronger Brand</span>
      <span>■</span>
      <span>Automate Your Bookings</span>
      <span>■</span>
      <span>Simple Monthly Plans</span>
      <span>■</span>
      <span>Get Found By Local Customers</span>
      <span>■</span>
      <span>From Startup To Success</span>
    </>
  );

  return (
    <div className="overflow-hidden border-t border-b border-gray-700 py-3 bg-black text-white">
      <div className="marquee whitespace-nowrap flex gap-10 text-sm uppercase font-mono tracking-widest">
        {/* We map the content twice to ensure a seamless loop for the marquee animation */}
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-10">{content}</div>
        ))}
      </div>
    </div>
  );
}