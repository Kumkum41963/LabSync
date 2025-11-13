const TicketSection = ({ title, children }) => (
  <section className="border border-slate-800 rounded-xl bg-[#101827]/50 shadow-inner shadow-cyan-900/10 p-5">
    <h3 className="text-lg font-semibold text-cyan-300 mb-2">{title}</h3>
    <div>{children}</div>
  </section>
);

export default TicketSection;
