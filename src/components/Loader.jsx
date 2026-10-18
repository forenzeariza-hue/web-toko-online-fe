export default function Loader({ text = 'Memuat data...' }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-2 px-4 py-12 text-center text-slate-500"
    >
      <span
        className="h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-blue-600"
        aria-hidden="true"
      />
      <p>{text}</p>
    </div>
  );
}
