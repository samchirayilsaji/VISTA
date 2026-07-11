import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";

type VariantFormProps = {
  onAnalyze: (form: {
    gene: string;
    transcript: string;
    hgvs: string;
    phenotype: string;
    inheritance: string;
    zygosity: string;
  }) => void;
};

export default function VariantForm({ onAnalyze }: VariantFormProps) {
  const [form, setForm] = useState({
    gene: "LDLR",
    transcript: "NM_000527.5",
    hgvs: "c.1055G>T",
    phenotype: "hypercholesterolemia",
    inheritance: "Autosomal recessive",
    zygosity: "Heterozygous",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAnalyze(form);
  }

  return (
    <div className="mx-auto w-full max-w-6xl rounded-3xl border border-zinc-800 bg-[#111111] p-8 text-left">

      {/* Heading */}

      <div className="mb-6 flex flex-col items-center text-center">
        <h3 className="text-3xl font-bold text-white">
          Variant Information
        </h3>

        <p className="mt-2 max-w-3xl leading-7 text-zinc-400">
          Enter the variant details below
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* 3 Column Layout */}

        <div className="grid grid-cols-3 gap-x-6 gap-y-6">

          <InputField
            label="Gene"
            name="gene"
            placeholder="PLIN4"
            value={form.gene}
            onChange={handleChange}
          />

          <InputField
            label="Transcript"
            name="transcript"
            placeholder="NM_001289127.2"
            value={form.transcript}
            onChange={handleChange}
          />

          <InputField
            label="HGVS Variant"
            name="hgvs"
            placeholder="c.3702+5G>A"
            value={form.hgvs}
            onChange={handleChange}
          />

          <InputField
            label="Phenotype"
            name="phenotype"
            placeholder="Distal Myopathy"
            value={form.phenotype}
            onChange={handleChange}
          />

          <SelectField
            label="Inheritance"
            name="inheritance"
            value={form.inheritance}
            onChange={handleChange}
            options={[
              "Autosomal Dominant",
              "Autosomal Recessive",
              "X-linked Dominant",
              "X-linked Recessive",
              "Mitochondrial",
              "Unknown",
            ]}
          />

          <SelectField
            label="Zygosity"
            name="zygosity"
            value={form.zygosity}
            onChange={handleChange}
            options={[
              "Heterozygous",
              "Homozygous",
              "Hemizygous",
              "Compound Heterozygous",
              "Unknown",
            ]}
          />

        </div>

        {/* Button */}

        <div className="mt-8 flex justify-center">

          <button
            type="submit"
            className="
              h-12
              w-96
              rounded-2xl
              bg-[#22C55E]
              text-lg
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:brightness-110
              active:scale-[0.98]
            "
          >
            Analyze Variant
          </button>

        </div>

      </form>

    </div>
  );
}