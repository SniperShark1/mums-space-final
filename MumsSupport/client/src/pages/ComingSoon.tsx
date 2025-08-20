import React from "react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7c9c7]/70 backdrop-blur-sm">
      <div className="max-w-xl w-full mx-6 bg-white/10 border-2 border-white rounded-3xl p-10 shadow-2xl text-center text-white">
        <div style={{ fontSize: 48, lineHeight: 1 }}>💗</div>
        <h1 className="text-3xl md:text-4xl font-semibold mt-2" style={{ fontFamily: '"Bodoni Moda", serif' }}>
          Coming Soon
        </h1>
        <p className="mt-3 text-white/90">
          The Mum’s Space download page isn’t live yet. We’re putting on the finishing touches.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:hello@mums-space.app"
            className="inline-block rounded-2xl border-2 border-white px-6 py-3 hover:bg-white/20 transition"
          >
            Contact us
          </a>
          <span
            className="inline-block rounded-2xl border-2 border-white px-6 py-3 opacity-70 cursor-not-allowed"
            title="Notify me (coming soon)"
          >
            Notify me
          </span>
        </div>

        <p className="mt-6 text-xs text-white/70">© {new Date().getFullYear()} Mum’s Space</p>
      </div>
    </div>
  );
}
