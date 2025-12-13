import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookConsultation from "./pages/BookConsultation";
import ScheduleCall from "./pages/ScheduleCall";
import BookingConfirmed from "./pages/BookingConfirmed";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/book-consultation" element={<BookConsultation />} />
        <Route path="/schedule-call" element={<ScheduleCall />} />
        <Route path="/schedule-call/confirmed" element={<BookingConfirmed />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element with id 'root' not found");
}

const globalWithRoot = globalThis as typeof globalThis & { __appRoot?: Root };

if (!globalWithRoot.__appRoot) {
  globalWithRoot.__appRoot = createRoot(container);
}

globalWithRoot.__appRoot.render(<App />);
