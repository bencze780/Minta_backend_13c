import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import AllServicesPage from './pages/AllServicesPage'
import AvailableServicesPage from './pages/AvailableServicesPage'
import SearchServicesPage from './pages/SearchServicesPage'
import CategoryStatsPage from './pages/CategoryStatsPage'
import ExpensiveServicesPage from './pages/ExpensiveServicesPage'
import ServiceByIdPage from './pages/ServiceByIdPage'
import CreateServicePage from './pages/CreateServicePage'
import UpdateServicePage from './pages/UpdateServicePage'
import DeleteServicePage from './pages/DeleteServicePage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/szolgaltatasok" replace />} />
        <Route path="/szolgaltatasok" element={<AllServicesPage />} />
        <Route path="/elerheto" element={<AvailableServicesPage />} />
        <Route path="/kereses" element={<SearchServicesPage />} />
        <Route path="/statisztika" element={<CategoryStatsPage />} />
        <Route path="/dragak" element={<ExpensiveServicesPage />} />
        <Route path="/reszletek" element={<ServiceByIdPage />} />
        <Route path="/letrehozas" element={<CreateServicePage />} />
        <Route path="/modositas" element={<UpdateServicePage />} />
        <Route path="/torles" element={<DeleteServicePage />} />
        <Route path="*" element={<Navigate to="/szolgaltatasok" replace />} />
      </Route>
    </Routes>
  )
}
