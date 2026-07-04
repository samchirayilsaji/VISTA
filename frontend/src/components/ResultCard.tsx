type ResultCardProps = {
  result: any;
};

export default function ResultCard({ result }: ResultCardProps) {
  const variant = result.variant;
  const classification = result.classification;
  const coordinates = result.coordinates;
  const population = result.population;
  const clinvar = result.clinical.clinvar;
  const pubmed = result.clinical.pubmed;
  const acmg = result.acmg;

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

          <div className="text-5xl font-black text-green-400">
            {population.gnomad.gnomade}
          </div>

          <p className="mt-3 text-zinc-500">
            gnomAD Overall Frequency
          </p>

        </section>

        {/* ACMG */}

        <section className="rounded-3xl border border-zinc-800 bg-[#111111] p-8">

          <h2 className="mb-8 text-2xl font-bold">
            ACMG Evidence
          </h2>

          <div className="flex flex-wrap gap-3">

            {Object.values(acmg).map((rule: any) => (

              <div
                key={rule.code}
                className={`rounded-full px-5 py-3 font-semibold ${
                  rule.triggered
                    ? "bg-green-500/20 text-green-400"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {rule.code}
              </div>

            ))}

          </div>

        </section>

      </div>

      {/* ClinVar */}

      <section className="mt-8 rounded-3xl border border-zinc-800 bg-[#111111] p-8">

        <h2 className="mb-8 text-2xl font-bold">
          ClinVar
        </h2>

        {clinvar.records.length === 0 ? (

          <p className="text-zinc-500">
            No ClinVar records were found.
          </p>

        ) : (

          clinvar.records.map((record: any) => (

            <div
              key={record.accession}
              className="mb-4 rounded-2xl border border-zinc-800 p-5"
            >
              <h3 className="font-semibold">
                {record.title}
              </h3>

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
              <h3 className="font-semibold leading-7">
                {paper.title}
              </h3>

              <p className="mt-2 text-zinc-500">
                {paper.journal} • {paper.year}
              </p>

            </div>

          ))}

        </div>

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