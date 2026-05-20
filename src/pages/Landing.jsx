import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'

export default function Landing() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Find your next role with Smart Job Portal
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
        Connect candidates, recruiters, and admins on one platform with secure JWT authentication.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to={ROUTES.REGISTER}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Get started
        </Link>
        <Link
          to={ROUTES.LOGIN}
          className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Sign in
        </Link>
      </div>
    </section>
  )
}
