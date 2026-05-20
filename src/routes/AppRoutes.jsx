import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/components/common/ProtectedRoute'
import { ROLES } from '@/config/roles'
import { ROUTES } from '@/config/routes'
import AuthLayout from '@/layouts/AuthLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import MainLayout from '@/layouts/MainLayout'
import Loader from '@/components/common/Loader'

const Landing = lazy(() => import('@/pages/Landing'))
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const Unauthorized = lazy(() => import('@/pages/Unauthorized'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const CandidateHome = lazy(() => import('@/pages/candidate/Home'))
const Jobs = lazy(() => import('@/pages/candidate/Jobs'))
const JobDetailsPage = lazy(() => import('@/pages/candidate/JobDetailsPage'))
const AppliedJobs = lazy(() => import('@/pages/candidate/AppliedJobs'))
const CandidateProfile = lazy(() => import('@/pages/candidate/Profile'))
const Notifications = lazy(() => import('@/pages/candidate/Notifications'))

const RecruiterDashboard = lazy(() => import('@/pages/recruiter/RecruiterDashboard'))
const CreateJob = lazy(() => import('@/pages/recruiter/CreateJob'))
const ManageJobs = lazy(() => import('@/pages/recruiter/ManageJobs'))
const Applicants = lazy(() => import('@/pages/recruiter/Applicants'))
const RecruiterProfile = lazy(() => import('@/pages/recruiter/RecruiterProfile'))

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const ManageUsers = lazy(() => import('@/pages/admin/ManageUsers'))
const AdminManageJobs = lazy(() => import('@/pages/admin/ManageJobs'))
const Reports = lazy(() => import('@/pages/admin/Reports'))

function LazyPage({ children }) {
  return <Suspense fallback={<Loader fullScreen />}>{children}</Suspense>
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <LazyPage>
              <Landing />
            </LazyPage>
          }
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route
          path={ROUTES.LOGIN}
          element={
            <LazyPage>
              <Login />
            </LazyPage>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <LazyPage>
              <Register />
            </LazyPage>
          }
        />
      </Route>

      <Route
        path={ROUTES.UNAUTHORIZED}
        element={
          <LazyPage>
            <Unauthorized />
          </LazyPage>
        }
      />

      <Route element={<ProtectedRoute allowedRoles={[ROLES.CANDIDATE]} />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.CANDIDATE.HOME} element={<LazyPage><CandidateHome /></LazyPage>} />
          <Route path={ROUTES.CANDIDATE.JOBS} element={<LazyPage><Jobs /></LazyPage>} />
          <Route path={ROUTES.CANDIDATE.JOB_DETAILS()} element={<LazyPage><JobDetailsPage /></LazyPage>} />
          <Route path={ROUTES.CANDIDATE.APPLIED} element={<LazyPage><AppliedJobs /></LazyPage>} />
          <Route path={ROUTES.CANDIDATE.PROFILE} element={<LazyPage><CandidateProfile /></LazyPage>} />
          <Route path={ROUTES.CANDIDATE.NOTIFICATIONS} element={<LazyPage><Notifications /></LazyPage>} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.RECRUITER]} />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.RECRUITER.DASHBOARD} element={<LazyPage><RecruiterDashboard /></LazyPage>} />
          <Route path={ROUTES.RECRUITER.CREATE_JOB} element={<LazyPage><CreateJob /></LazyPage>} />
          <Route path={ROUTES.RECRUITER.MANAGE_JOBS} element={<LazyPage><ManageJobs /></LazyPage>} />
          <Route path={ROUTES.RECRUITER.APPLICANTS} element={<LazyPage><Applicants /></LazyPage>} />
          <Route path={ROUTES.RECRUITER.PROFILE} element={<LazyPage><RecruiterProfile /></LazyPage>} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<LazyPage><AdminDashboard /></LazyPage>} />
          <Route path={ROUTES.ADMIN.USERS} element={<LazyPage><ManageUsers /></LazyPage>} />
          <Route path={ROUTES.ADMIN.JOBS} element={<LazyPage><AdminManageJobs /></LazyPage>} />
          <Route path={ROUTES.ADMIN.REPORTS} element={<LazyPage><Reports /></LazyPage>} />
        </Route>
      </Route>

      <Route path="*" element={<LazyPage><NotFound /></LazyPage>} />
    </Routes>
  )
}
