import { RouterProvider } from 'react-router-dom'
import { appRouter } from '@/app/router'
import { AuthProvider } from '@/features/auth/model/authContext'
import { BookingProvider } from '@/features/booking/model/bookingContext'
import { FleetOpsProvider } from '@/features/aircraft/model/fleetOpsContext'
import { DocumentsProvider } from '@/features/documents/model/documentsContext'
import { LanguageProvider } from '@/shared/i18n/languageContext'

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BookingProvider>
          <DocumentsProvider>
            <FleetOpsProvider>
              <RouterProvider router={appRouter} />
            </FleetOpsProvider>
          </DocumentsProvider>
        </BookingProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}
