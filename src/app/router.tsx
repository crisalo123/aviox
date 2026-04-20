import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardPage } from '@/pages/DashboardPage'
import { FinancesPage } from '@/pages/tutor/FinancesPage'
import { ProgressPage } from '@/pages/tutor/ProgressPage'
import { LoginPage } from '@/pages/LoginPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ReservationsPage } from '@/pages/ReservationsPage'

const SchedulePage = lazy(() =>
  import('@/pages/SchedulePage').then((m) => ({ default: m.SchedulePage })),
)
const RunwayPage = lazy(() =>
  import('@/pages/RunwayPage').then((m) => ({ default: m.RunwayPage })),
)
const FleetPage = lazy(() =>
  import('@/pages/FleetPage').then((m) => ({ default: m.FleetPage })),
)
const DocumentsPage = lazy(() =>
  import('@/pages/DocumentsPage').then((m) => ({ default: m.DocumentsPage })),
)
const FlightTrackingPage = lazy(() =>
  import('@/pages/FlightTrackingPage').then((m) => ({
    default: m.FlightTrackingPage,
  })),
)
import { RequireAuth } from '@/processes/auth-guard/RequireAuth'
import { AppShell } from '@/widgets/app-shell/AppShell'

export const appRouter = createBrowserRouter([
  { path: '/iniciar-sesion', element: <LoginPage /> },
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        element: <AppShell />,
        children: [
          { index: true, element: <Navigate to="/inicio" replace /> },
          { path: 'inicio', element: <DashboardPage /> },
          { path: 'flota', element: <FleetPage /> },
          { path: 'horario', element: <SchedulePage /> },
          { path: 'reservas', element: <ReservationsPage /> },
          { path: 'documentos', element: <DocumentsPage /> },
          { path: 'perfil', element: <ProfilePage /> },
          { path: 'seguimiento', element: <FlightTrackingPage /> },
          { path: 'pista', element: <RunwayPage /> },
          { path: 'tutor/progreso', element: <ProgressPage /> },
          { path: 'tutor/finanzas', element: <FinancesPage /> },
          { path: '*', element: <Navigate to="/inicio" replace /> },
        ],
      },
    ],
  },
])
