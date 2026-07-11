type ResultCardProps = {
  result: any;
};
import { useState } from "react";

export default function ResultCard({ result }: ResultCardProps) {
  const variant = result.variant;
  const classification = result.classification;
  const coordinates = result.coordinates;
  const population = result.population;
  const clinvar = result.clinical.clinvar;
  const pubmed = result.clinical.pubmed;
  const phenotypes = result.clinical.phenotypes;
  const acmg = result.acmg;
  const [selectedRule, setSelectedRule] = useState(
  Object.values(acmg)[0] as any
  );

  return (
    <div className="mx-auto w-full max-w-7xl">

      {/* Top */}

      <div className="mb-16">

        <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
          Analysis Complete
        </p>

        <h1 className="mt-3 text-5xl font-black">
          {variant.gene}
        </h1>

        <p className="mt-3 text-2xl text-zinc-400">
          {variant.hgvs}
        </p>

        <div className="mt-8 inline-flex rounded-full bg-green-500/15 px-5 py-2 text-lg font-semibold text-green-400">
          {classification.label}
        </div>

      </div>

      {/* Grid */}

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Variant */}

        <section className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

          <h2 className="mb-8 text-2xl font-bold">
            Variant
          </h2>

          <div className="space-y-5">

            <Row title="Gene" value={variant.gene} />

            <Row title="Transcript" value={variant.transcript} />

            <Row title="HGVS" value={variant.hgvs} />

            <Row title="Zygosity" value={variant.zygosity} />

            <Row title="Inheritance" value={variant.inheritance} />

          </div>

        </section>

        {/* Coordinates */}

        <section className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

          <h2 className="mb-8 text-2xl font-bold">
            Coordinates
          </h2>

          <div className="space-y-5">

            <Row title="Chromosome" value={coordinates.chromosome} />

            <Row title="Position" value={coordinates.position} />

            <Row title="Reference" value={coordinates.ref} />

            <Row title="Alternate" value={coordinates.alt} />

            <Row title="Genome" value={coordinates.genome_build} />

          </div>

        </section>

        {/* Population */}

        <section className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

          <h2 className="mb-8 text-2xl font-bold">
            Population Frequency
          </h2>

          <div className="space-y-4">

            <Row
              title="Overall"
              value={
                population.gnomad?.gnomade?.toExponential(2) ?? "N/A"
              }
            />

            <Row
              title="European (NFE)"
              value={
                population.gnomad?.gnomade_nfe?.toExponential(2) ?? "0"
              }
            />

            <Row
              title="African"
              value={
                population.gnomad?.gnomade_afr?.toExponential?.(2) ?? "0"
              }
            />

            <Row
              title="South Asian"
              value={
                population.gnomad?.gnomade_sas?.toExponential?.(2) ?? "0"
              }
            />

            <Row
              title="East Asian"
              value={
                population.gnomad?.gnomade_eas?.toExponential?.(2) ?? "0"
              }
            />

            <Row
              title="Latino"
              value={
                population.gnomad?.gnomade_amr?.toExponential?.(2) ?? "0"
              }
            />

          </div>

          <div className="mt-6 rounded-xl bg-zinc-950 p-4">
            <p className="text-sm text-green-400 font-semibold">
              Interpretation
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Variant is extremely rare in the general population,
              supporting ACMG PM2 evidence.
            </p>
          </div>

        </section>

        {/* ACMG */}

        <section className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

          <h2 className="mb-8 text-2xl font-bold">
            ACMG Evidence
          </h2>

          <div className="flex flex-wrap gap-3">

            {Object.values(acmg).map((rule: any) => (

              <button
                key={rule.code}
                onClick={() => setSelectedRule(rule)}
                className={`rounded-full px-5 py-3 font-semibold transition-all duration-200 ${
                  selectedRule.code === rule.code
                    ? "ring-2 ring-green-500"
                    : ""
                } ${
                  rule.triggered
                    ? "bg-green-500/20 text-green-400"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {rule.code}
              </button>

            ))}

          </div>

          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

            <h3 className="text-xl font-bold">
              {selectedRule.code}
            </h3>

            <div className="mt-6 space-y-5">

              <Row
                title="Strength"
                value={selectedRule.strength}
              />

              <Row
                title="Status"
                value={selectedRule.triggered ? "Triggered ✓" : "Not Triggered"}
              />

              <div>
                <p className="mb-2 text-zinc-500">
                  Reason
                </p>

                <p className="leading-7 text-zinc-200">
                  {selectedRule.reason}
                </p>
              </div>

            </div>

          </div>

        </section>
      </div>

      {/* ClinVar */}

      <section className="mt-8 rounded-3xl border border-zinc-800 bg-[#111111] p-8">

        <h2 className="mb-8 text-2xl font-bold">
          ClinVar
        </h2>

        {clinvar.records.length === 0 ? (

          <div>

            <p className="text-zinc-500">
              No ClinVar records were found.
            </p>

            <a
              href={`https://www.ncbi.nlm.nih.gov/clinvar/?term=${encodeURIComponent(
                `${variant.gene} ${variant.hgvs}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-medium text-green-400 hover:underline"
            >
              🔗 Search this variant on ClinVar
            </a>

          </div>

        ) : (

          clinvar.records.map((record: any) => (

            <div
              key={record.accession}
              className="mb-4 rounded-2xl border border-zinc-800 p-5"
            >

              <a
                href={`https://www.ncbi.nlm.nih.gov/clinvar/?term=${encodeURIComponent(
                  record.accession
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-green-400 hover:underline"
              >
                {record.title}
              </a>

              <p className="mt-2 text-zinc-400">
                {record.classification}
              </p>

            </div>

          ))

        )}

      </section>

      {/* PubMed */}

      <section className="mt-8 rounded-3xl border border-zinc-800 bg-[#111111] p-8">

        <h2 className="mb-8 text-2xl font-bold">
          PubMed ({pubmed.count})
        </h2>

        <div className="space-y-4">

          {pubmed.papers.slice(0,5).map((paper: any) => (

            <div
              key={paper.pmid}
              className="rounded-2xl border border-zinc-800 p-5"
            >
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold leading-7 text-white transition-colors hover:text-green-400 hover:underline"
              >
                {paper.title}
              </a>

              <p className="mt-2 text-zinc-500">
                {paper.journal} • {paper.year}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Reported Clinical Phenotypes */}

      <section className="mt-8 rounded-3xl border border-zinc-800 bg-[#111111] p-8">

        <h2 className="mb-8 text-2xl font-bold">
          Reported Clinical Phenotypes
        </h2>

        {phenotypes.length === 0 ? (

          <p className="text-zinc-500">
            No reported clinical phenotypes were identified.
          </p>

        ) : (

          <div className="space-y-6">

            {phenotypes.map((phenotype: any) => {

              const percentage = Math.round(
                (phenotype.count / pubmed.count) * 100
              );

              return (

                <div key={phenotype.name}>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="font-medium">
                      {phenotype.name}
                    </span>

                    <span className="text-zinc-400">
                      {phenotype.count}/{pubmed.count} papers
                    </span>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

                    <div
                      className="h-full rounded-full bg-green-500 transition-all"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>

              );

            })}

          </div>

        )}

        <p className="mt-8 text-sm text-zinc-500">
          Summarized automatically from the retrieved PubMed literature.
        </p>

      </section>

    </div>
  );
}

function Row({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">

      <span className="text-zinc-500">
        {title}
      </span>

      <span className="font-medium text-right">
        {value}
      </span>

    </div>
  );
}