export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-[#0f0f0f] p-8">

      <h1 className="mb-10 text-4xl font-bold text-[#1DB954]">
        VISTA
      </h1>

      <nav className="space-y-3">

        <button className="w-full rounded-xl bg-[#1DB954] py-3 font-semibold text-black">
          Analyze
        </button>

        <button className="w-full rounded-xl bg-[#181818] py-3 hover:bg-[#222]">
          History
        </button>

        <button className="w-full rounded-xl bg-[#181818] py-3 hover:bg-[#222]">
          Reports
        </button>

      </nav>
    </aside>
  );
}