import { useState } from 'react';

export default function Contact({ contact }) {
  const [sent, setSent] = useState(false);

  return (
    <>
      <div className="mx-6">
        <div className="bg-ink text-paper rounded-[20px] px-10 py-14 text-center max-w-[1160px] mx-auto">
          <h2 className="font-disp text-[24px] sm:text-[34px] mb-3.5">Ready to grow your business online?</h2>
          <p className="text-[#B9C2D6] mb-6">Let's start a conversation about your growth strategy.</p>
          <a
            href={contact.whatsappLink}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] border-2 border-mango bg-mango text-ink"
          >
            Start Your Free Consultation
          </a>
        </div>
      </div>

      <section id="contact" className="py-24">
        <div className="max-w-[1160px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="font-mono text-xs tracking-[0.14em] uppercase text-tealdeep mb-4">Get In Touch</div>
            <h2 className="font-disp font-bold text-[28px]">Talk to us</h2>
            <div className="flex flex-col gap-4 mt-5">
              <div className="flex gap-3 items-start text-[14.5px]">
                <span>💬</span>
                <div>
                  <b className="font-mono text-xs text-mangodeep block uppercase tracking-wider">WhatsApp</b>
                  <a href={contact.whatsappLink}>{contact.whatsappDisplay}</a>
                </div>
              </div>
              <div className="flex gap-3 items-start text-[14.5px]">
                <span>✉️</span>
                <div>
                  <b className="font-mono text-xs text-mangodeep block uppercase tracking-wider">Email</b>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </div>
              <div className="flex gap-3 items-start text-[14.5px]">
                <span>📍</span>
                <div>
                  <b className="font-mono text-xs text-mangodeep block uppercase tracking-wider">Location</b>
                  {contact.location}
                </div>
              </div>
            </div>
          </div>
          <form
            className="flex flex-col gap-3.5 bg-papercard border border-line rounded-2xl p-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div>
              <label className="text-xs font-mono text-inksoft uppercase tracking-wide">Name</label>
              <input required type="text" className="w-full mt-1 px-3.5 py-3 border border-line rounded-lg bg-paper text-sm" />
            </div>
            <div>
              <label className="text-xs font-mono text-inksoft uppercase tracking-wide">Email</label>
              <input required type="email" className="w-full mt-1 px-3.5 py-3 border border-line rounded-lg bg-paper text-sm" />
            </div>
            <div>
              <label className="text-xs font-mono text-inksoft uppercase tracking-wide">Message</label>
              <textarea required className="w-full mt-1 px-3.5 py-3 border border-line rounded-lg bg-paper text-sm min-h-[100px]" />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[15px] border-2 border-ink bg-ink text-paper"
            >
              Send message
            </button>
            {sent && (
              <p className="text-[13px] text-tealdeep">Thanks! This is a demo form, no message was actually sent.</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
