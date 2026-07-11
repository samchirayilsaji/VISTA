import { useState } from "react";
import VariantForm from "../components/VariantForm";
import LoadingCard from "../components/LoadingCard";
import ResultCard from "../components/ResultCard";
import { api } from "../services/api";

export default function Analyze() {
  const [screen, setScreen] = useState<"form" | "loading" | "result">("form");
  const [result, setResult] = useState<any>(null);

  async function handleAnalyze(form: any) {
    try {
      setScreen("loading");
      const response = await api.post("/analyze", form);
      setResult(response.data);

      setTimeout(() => {
        setScreen("result");
      }, 500);

    } catch (err) {
      console.error(err);
      alert("Analysis failed.");
      setScreen("form");
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">

      {/* Header */}

      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-10">

          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="VISTA Logo"
              className="h-10 w-10 object-contain"
            />

            <h1 className="text-2xl font-black tracking-tight">
              VISTA
            </h1>
          </div>

          <span className="rounded-full border border-zinc-700 px-3 py-1.5 text-sm text-zinc-400">
            Clinical AI
          </span>

        </div>
      </header>
      {/* Hero */}

    <section className="mx-auto flex max-w-6xl flex-col items-center px-8 pt-6">

        <div className="mb-6 text-center">

          <p className="mb-3 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-medium text-green-400">
            AI Powered Variant Interpretation
          </p>

          <h2 className="text-4xl font-black tracking-tight">
            Evidence-Based
            <br />
            Clinical Variant Analysis
          </h2>

          <p className="mt-4 w-full max-w-3xl mx-auto text-center text-base leading-7 text-zinc-400">
            Search ClinVar, PubMed, population databases and ACMG evidence
            automatically to generate a comprehensive interpretation report.
          </p>

        </div>

      </section>

      {/* Main */}

      <section className="mx-auto max-w-6xl px-8 pb-8">

        {screen === "form" && (
          <VariantForm onAnalyze={handleAnalyze} />
        )}

        {screen === "loading" && (
          <LoadingCard />
        )}

        {screen === "result" && (
          <ResultCard result={result} />
        )}

      </section>

    </main>
  );
}