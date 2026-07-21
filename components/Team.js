export default function Team({ team }) {
  return (
    <section id="team" className="py-24">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="max-w-[600px] mb-12">
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep mb-4">Meet the Team</div>
          <h2 className="font-disp font-bold text-[26px] sm:text-[38px]">The people behind your growth</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
          {team.map((m, i) => (
            <div key={i}>
              <div
                className="w-[84px] h-[84px] rounded-full mx-auto mb-3.5"
                style={{ background: 'linear-gradient(135deg,#F2A93B,#1F9E89)' }}
              ></div>
              <h3 className="text-[16px] font-disp">{m.role}</h3>
              <span className="text-[13px] text-inksoft font-mono">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
