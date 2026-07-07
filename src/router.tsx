import { createBrowserRouter } from 'react-router-dom'
import Landing from '@/pages/Landing'
import AuthLayout from '@/layouts/AuthLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ForgotPassword from '@/pages/ForgotPassword'
import RoleSelect from '@/pages/RoleSelect'
import AppLayout from '@/layouts/AppLayout'

// Patient pages
import PatientDashboard from '@/pages/patient/Dashboard'
import DoctorsPage from '@/pages/patient/Doctors'
import HospitalsPage from '@/pages/patient/Hospitals'
import AppointmentsPage from '@/pages/patient/Appointments'
import QueuePage from '@/pages/patient/Queue'
import RecordsPage from '@/pages/patient/Records'
import NotificationsPage from '@/pages/patient/Notifications'
import ProfilePage from '@/pages/patient/Profile'

const ComingSoon = ({ label }: { label: string }) => (
  <div className="p-10 flex flex-col items-center justify-center h-64 text-slate-400">
    <div className="text-5xl mb-4">🚧</div>
    <p className="font-semibold text-lg text-slate-600">{label}</p>
    <p className="text-sm mt-1">This section is under active development.</p>
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/role-select', element: <RoleSelect /> },
    ],
  },
  {
    path: '/dashboard',
    element: <AppLayout />,
    children: [
      { index: true, element: <PatientDashboard /> },
      { path: 'doctors', element: <DoctorsPage /> },
      { path: 'hospitals', element: <HospitalsPage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'queue', element: <QueuePage /> },
      { path: 'diagnostics', element: <ComingSoon label="Diagnostics Booking" /> },
      { path: 'records', element: <RecordsPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <ComingSoon label="Settings" /> },
      // Doctor role routes
      { path: 'patients', element: <ComingSoon label="Today's Patients" /> },
      { path: 'calendar', element: <ComingSoon label="Doctor Calendar" /> },
      { path: 'prescriptions', element: <ComingSoon label="Prescriptions" /> },
      { path: 'reports', element: <ComingSoon label="Reports" /> },
      { path: 'analytics', element: <ComingSoon label="Analytics" /> },
      { path: 'messages', element: <ComingSoon label="Messages" /> },
      // Hospital routes
      { path: 'departments', element: <ComingSoon label="Departments" /> },
      // Diagnostic routes
      { path: 'bookings', element: <ComingSoon label="Test Bookings" /> },
      { path: 'tests', element: <ComingSoon label="Test Catalog" /> },
    ],
  },
])
