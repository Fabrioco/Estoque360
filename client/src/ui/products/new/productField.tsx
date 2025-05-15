type ProductFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: string;
  nameId: string;
  placeholder: string;
  disabled?: boolean;
};

export function ProductField({
  label,
  value,
  onChange,
  type = "text",
  nameId,
  placeholder,
  disabled = false,
}: ProductFieldProps) {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name={nameId}
        id={nameId}
        placeholder={placeholder}
        className="border border-gray-300 rounded-full bg-slate-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        disabled={disabled}
      />
    </div>
  );
}
