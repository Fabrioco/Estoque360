type ProductFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: string;
  nameId: string;
  placeholder: string;
};

export function ProductField({
  label,
  value,
  onChange,
  type = "text",
  nameId,
  placeholder,
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
        className="border border-gray-300 rounded-full bg-slate-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
}
