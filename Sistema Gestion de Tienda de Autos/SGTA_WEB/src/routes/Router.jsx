import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

import ProtectedRoute from "../components/ProtectedRoute";

import { Home } from "../pages/everyone/LandingPage";
import { Unauthorized } from "../pages/everyone/Unauthorized";
import { NotFoundPage } from "../pages/everyone/NotFound";
import { SelectedBrandPage } from "../pages/everyone/SelectedBrand";
import { SelectedCarPage } from "../pages/everyone/SelectedCar";
import { CatalogPage } from "../pages/everyone/Catalog";
import  { BrandsList } from "../components/ui/BrandsList";

import { ProfilePage } from "../pages/client/Profile";

import { HomeOptionsPage } from "../pages/agents/HomeOptions";
import { SalesPanel } from "../pages/agents/SalesPanel";
import { ClientsPanel } from "../pages/agents/ClientsPanel";
import { CarsPanel } from "../pages/agents/CarsPanel";

import { AgentsPanel } from "../pages/admin/AgentsPanel";
import { MainLayout } from "../components/layout/MainLayout";
import { ListLayout } from "../components/layout/ListLayout";
import { BrandsPage } from "../pages/everyone/BrandsPage";
import { PopularPage } from "../pages/everyone/PopularPage";
import { ModelsPage } from "../pages/everyone/ModelsPage";

export const AppRouter = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/catalog" element={<CatalogPage/>} />
            <Route path="/popular" element={<PopularPage />} />
            <Route path="/brands/" element={<BrandsPage/>} />
            <Route path="/brands/models/:brand" element={<ModelsPage/>} />
            <Route path="/brands/:brand" element={<SelectedBrandPage/>} />
            <Route path="/cars/:carId" element={<SelectedCarPage/>} />
            <Route path="/brandscatalog" element={<BrandsList />} />
            <Route element={<ProtectedRoute roles={["admin", "agent", "client"]} />}>
              <Route path="/profile" element={<ProfilePage/>} />
            </Route>
          </Route>
          
          {/* Página de inicio para agent y admin */}
            <Route element={<ProtectedRoute roles={["admin", "agent"]} />}>
              <Route path="/home" element={<HomeOptionsPage />} />
            </Route>
          
          {/* Paneles para agent y admin */}
          <Route element={<ListLayout />} >
            <Route element={<ProtectedRoute roles={["admin", "agent"]} />}>
              <Route path="/sales" element={<SalesPanel/>} />
              <Route path="/clients" element={<ClientsPanel/>} />
              <Route path="/cars" element={<CarsPanel/>} />
            </Route>
          </Route>

          {/* Rutas solo para el rol de admin */}
          <Route element={<ListLayout />} >
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="/agents" element={<AgentsPanel />} />
            </Route>
          </Route>

          {/* Página 404 -> Not found */}
          <Route element={<MainLayout />}>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
}