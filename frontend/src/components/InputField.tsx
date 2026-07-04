type InputFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  label,
  name,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-3">

      <label
        htmlFor={name}
        className="block text-sm font-medium tracking-wide text-zinc-400"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-zinc-700
          bg-[#181818]
          px-5
          text-base
          text-white
          placeholder:text-zinc-600
          outline-none
          transition-all
          duration-200

          hover:border-zinc-500

          focus:border-[#1DB954]
          focus:bg-[#1B1B1B]
          focus:ring-4
          focus:ring-[#1DB954]/15
        "
      />

    </div>
  );
}