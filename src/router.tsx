import { createBrowserRouter } from 'react-router-dom'
import Landing from '@/pages/Landing'
import AuthLayout from '@/layouts/AuthLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ForgotPassword from '@/pages/ForgotPassword'
import RoleSelect from '@/pages/RoleSelect'
import AppLayout from '@/layouts/AppLayout'
import PatientDashboard from '@/pages/patient/Dashboard'

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
      {
        index: true,
        element: <PatientDashboard />,
      },
      // Placeholder routes for navigation links
      { path: 'doctors', element: <div className="p-8">Doctors Directory (Coming Soon)</div> },
      { path: 'hospitals', element: <div className="p-8">Hospitals (Coming Soon)</div> },
      { path: 'appointments', element: <div className="p-8">Appointments History (Coming Soon)</div> },
      { path: 'queue', element: <div className="p-8">Live Queue Tracking (Coming Soon)</div> },
      { path: 'diagnostics', element: <div className="p-8">Diagnostics Labs (Coming Soon)</div> },
      { path: 'records', element: <div className="p-8">Medical Records (Coming Soon)</div> },
      { path: 'notifications', element: <div className="p-8">Notifications (Coming Soon)</div> },
      { path: 'profile', element: <div className="p-8">User Profile (Coming Soon)</div> },
      { path: 'settings', element: <div className="p-8">Settings (Coming Soon)</div> },
    ],
  },
])
