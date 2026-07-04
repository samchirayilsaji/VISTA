type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function SelectField({
  label,
  name,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="space-y-3">

      <label
        htmlFor={name}
        className="block text-sm font-medium tracking-wide text-zinc-400"
      >
        {label}
      </label>

      <div className="relative">

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="
            h-14
            w-full
            appearance-none
            rounded-2xl
            border
            border-zinc-700
            bg-[#181818]
            px-5
            pr-12
            text-base
            text-white
            outline-none
            transition-all
            duration-200

            hover:border-zinc-500

            focus:border-[#1DB954]
            focus:bg-[#1B1B1B]
            focus:ring-4
            focus:ring-[#1DB954]/15
          "
        >
          <option value="">Select...</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Custom Arrow */}

        <svg
          className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>

      </div>

    </div>
  );
}