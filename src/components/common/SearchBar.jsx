export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
  )
}