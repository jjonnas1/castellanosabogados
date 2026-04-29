export default function ClientesLoading() {
  return (
    <div className="p-6">
      <div className="h-7 w-32 rounded-lg bg-[#1e3a6e]/40 mb-6 animate-pulse" />

      {/* Barra de acciones skeleton */}
      <div className="flex gap-3 mb-5">
        <div className="h-9 w-48 rounded-lg bg-[#1e3a6e]/30 animate-pulse" />
        <div className="h-9 w-28 rounded-lg bg-[#1e3a6e]/30 animate-pulse" />
      </div>

      {/* Filas de tabla skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3 rounded-xl bg-[#111f35] border border-[#1e3a6e]/30 animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="h-8 w-8 rounded-full bg-[#1e3a6e]/50 flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-40 rounded bg-[#1e3a6e]/40" />
              <div className="h-2.5 w-56 rounded bg-[#1e3a6e]/25" />
            </div>
            <div className="h-5 w-20 rounded-full bg-[#1e3a6e]/30" />
            <div className="h-5 w-16 rounded-full bg-[#1e3a6e]/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
