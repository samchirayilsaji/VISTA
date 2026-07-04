export default function LoadingCard() {
  const steps = [
    "Validating HGVS notation",
    "Normalizing variant",
    "Searching ClinVar",
    "Searching PubMed",
    "Applying ACMG criteria",
    "Generating clinical report",
  ];

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-white">
        🧬 Analyzing Variant
      </h2>

      <p className="mt-2 text-slate-400">
        Please wait while VISTA analyzes your variant.
      </p>

      <div className="mt-8 space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-xl bg-slate-950 p-4"
          >
            <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500" />

            <p className="text-slate-200">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}