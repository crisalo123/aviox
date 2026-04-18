import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardPage } from '@/pages/DashboardPage'
import { FinancesPage } from '@/pages/tutor/FinancesPage'
import { ProgressPage } from '@/pages/tutor/ProgressPage'
import { LoginPage } from '@/pages/LoginPage'
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
          { path: 'pista', element: <RunwayPage /> },
          { path: 'tutor/progreso', element: <ProgressPage /> },
          { path: 'tutor/finanzas', element: <FinancesPage /> },
          { path: '*', element: <Navigate to="/inicio" replace /> },
        ],
      },
    ],
  },
])
