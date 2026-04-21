
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const March8Page = lazy(() => import("./pages/March8Page"));
const March8ohPage = lazy(() => import("./pages/March8ohPage"));
const NadezdaEfirPage = lazy(() => import("./pages/NadezdaEfirPage"));
const TrendsA2026Page = lazy(() => import("./pages/TrendsA2026Page"));
const TrendsB2026Page = lazy(() => import("./pages/TrendsB2026Page"));
const TrendsC2026Page = lazy(() => import("./pages/TrendsC2026Page"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hed_online" element={<Index />} />
            <Route path="/8march" element={<March8Page />} />
            <Route path="/8maroh" element={<March8ohPage />} />
            <Route path="/nadezda_efir" element={<NadezdaEfirPage />} />
            <Route path="/trendsa2026" element={<TrendsA2026Page />} />
            <Route path="/trendsb2026" element={<TrendsB2026Page />} />
            <Route path="/trendsc2026" element={<TrendsC2026Page />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;