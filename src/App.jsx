import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppDataProvider from './context/AppDataContext.jsx'
import { createDefaults } from './data/defaults.js'
import FirstRunDialog from './components/FirstRunDialog.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import StampPlanningPage from './pages/StampPlanningPage.jsx'
import OfficialMaterialsPage from './pages/OfficialMaterialsPage.jsx'
import PendingMaterialsPage from './pages/PendingMaterialsPage.jsx'
import PrincipalActorPage from './pages/PrincipalActorPage.jsx'

const defaults = createDefaults()

export default function App() {
  return (
    <AppDataProvider defaults={defaults}>
      <FirstRunDialog />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="stamps" element={<StampPlanningPage />} />
            <Route path="materials" element={<OfficialMaterialsPage />} />
            <Route path="pending" element={<PendingMaterialsPage />} />
            <Route path="principal" element={<PrincipalActorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppDataProvider>
  )
}
