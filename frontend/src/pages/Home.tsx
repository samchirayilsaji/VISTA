export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="max-w-3xl text-center px-6">
        <h1 className="text-6xl font-bold text-slate-900">
          VISTA
        </h1>

        <p className="mt-4 text-xl text-slate-600">
          Variant Intelligence System for
          <br />
          Translational Analysis
        </p>

        <p className="mt-8 text-slate-500">
          Automated variant interpretation using ACMG guidelines,
          ClinVar, gnomAD, and PubMed.
        </p>

        <button
          className="mt-10 rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition"
        >
          Analyze Variant
        </button>
      </div>
    </main>
  );
}