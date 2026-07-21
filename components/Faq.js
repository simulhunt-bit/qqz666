import { useState } from 'react';

export default function Faq({ faq }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24">
      <div className="max-w-[760px] mx-auto px-6">
        <div className="max-w-[600px] mb-12">
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep mb-4">Good to Know</div>
          <h2 className="font-disp font-bold text-[26px] sm:text-[38px]">Frequently asked questions</h2>
        </div>
        <div>
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-line">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left bg-transparent py-5 font-disp text-[16.5px] font-semibold flex justify-between items-center"
                >
                  {item.q}
                  <span className={`font-mono text-lg text-mangodeep transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? '240px' : '0px' }}
                >
                  <p className="pb-5 text-[14.5px] text-inksoft">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
