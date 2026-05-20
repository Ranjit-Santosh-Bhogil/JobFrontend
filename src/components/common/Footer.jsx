export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Smart Job Portal. All rights reserved.
      </div>
    </footer>
  )
}
