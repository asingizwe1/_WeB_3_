
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import PropertyDetail from "./pages/PropertyDetail";
import Occupancy from "./pages/Occupancy";
import Registry from "./pages/Registry";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Initial landing/auth page */}
          <Route path="/" element={<WelcomePage />} />
          
          {/* Dashboard and authenticated routes */}
          <Route path="/dashboard" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/occupancy" element={<Occupancy />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/marketplace" element={<Marketplace />} />
          
          {/* Redirect root to welcome page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
