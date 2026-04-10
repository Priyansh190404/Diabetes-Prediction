function PreventiveCard({ item, riskGradient }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 cursor-pointer">

      {/* Image */}
      <div className="overflow-hidden h-48">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className={`text-base font-bold bg-gradient-to-r ${riskGradient} bg-clip-text text-transparent mb-2`}
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {item.title}
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed mb-3">
          {item.description}
        </p>

        {item.extra && (
          <div className="flex items-start gap-2.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
            <span className="text-teal-500 mt-0.5 shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="7" fill="currentColor" fillOpacity="0.15" />
                <path
                  d="M4 7l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">{item.extra}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PreventiveCard;
