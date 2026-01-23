import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import DestinationDetail from "./pages/DestinationDetail";
import Learn from "./pages/Learn";
import Guide from "./pages/Guide";
import Community from "./pages/Community";
import Safety from "./pages/Safety";
import Premium from "./pages/Premium";
import Passport from "./pages/Passport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/community" element={<Community />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/passport" element={<Passport />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
