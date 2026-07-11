import { useEffect, useState } from "react";

export default function LoadingCard() {
  const steps = [
    "Validating HGVS notation",
    "Normalizing variant",
    "Searching ClinVar",
    "Searching PubMed",
    "Applying ACMG criteria",
    "Generating clinical report",
  ];

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center py-16">

      {/* Logo */}

      <img
        src="/logo.png"
        alt="VISTA"
        className="mb-6 h-16 w-16 object-contain"
      />

      <h2 className="text-4xl font-bold tracking-tight">
        VISTA
      </h2>

      <p className="mt-3 text-zinc-400">
        Analyzing Variant
      </p>

      <p className="mt-2 text-sm text-zinc-500">
        This usually takes 10–20 seconds
      </p>

      {/* Neural Network */}

      <div className="relative mt-14 h-56 w-72">

        {/* Lines */}

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 300 220"
        >
          <line x1="150" y1="20" x2="70" y2="70" stroke="#3f3f46" strokeWidth="2"/>
          <line x1="150" y1="20" x2="230" y2="70" stroke="#3f3f46" strokeWidth="2"/>

          <line x1="70" y1="70" x2="70" y2="150" stroke="#3f3f46" strokeWidth="2"/>
          <line x1="230" y1="70" x2="230" y2="150" stroke="#3f3f46" strokeWidth="2"/>

          <line x1="70" y1="150" x2="150" y2="200" stroke="#3f3f46" strokeWidth="2"/>
          <line x1="230" y1="150" x2="150" y2="200" stroke="#3f3f46" strokeWidth="2"/>

          <line x1="70" y1="70" x2="230" y2="70" stroke="#3f3f46" strokeWidth="2"/>
          <line x1="70" y1="150" x2="230" y2="150" stroke="#3f3f46" strokeWidth="2"/>
        </svg>

        {[
          { x: "50%", y: "5%" },
          { x: "20%", y: "28%" },
          { x: "80%", y: "28%" },
          { x: "20%", y: "68%" },
          { x: "80%", y: "68%" },
          { x: "50%", y: "92%" },
        ].map((node, index) => (

          <div
            key={index}
            className={`absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 ${
              index === activeStep
                ? "scale-125 border-green-400 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]"
                : "border-zinc-600 bg-zinc-700"
            }`}
            style={{
              left: node.x,
              top: node.y,
            }}
          />

        ))}

      </div>

      {/* Current Step */}

      <div className="mt-10 rounded-full border border-green-500/20 bg-green-500/10 px-6 py-3">

        <p className="text-lg font-medium text-green-400">
          {steps[activeStep]}
        </p>

      </div>

    </div>
  );
}