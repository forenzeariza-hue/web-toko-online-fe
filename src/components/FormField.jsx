export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`rounded-lg border px-3 py-2 outline-none transition-colors focus:border-blue-500 ${
          error ? 'border-red-400' : 'border-slate-200'
        }`}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
