export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1626]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-9 h-9 border-[3px] border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Castellanos Abogados
        </p>
      </div>
    </div>
  );
}
