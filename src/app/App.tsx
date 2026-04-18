import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/app/router'
import { AuthProvider } from '@/features/auth/model/authContext'
import { BookingProvider } from '@/features/booking/model/bookingContext'
import { FleetOpsProvider } from '@/features/aircraft/model/fleetOpsContext'

export function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <FleetOpsProvider>
          <RouterProvider router={appRouter} />
        </FleetOpsProvider>
      </BookingProvider>
    </AuthProvider>
  )
}
