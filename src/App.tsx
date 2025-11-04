import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Testes from "./pages/Testes";
import Quiz from "./pages/Quiz";
import Resultados from "./pages/Resultados";
import Praticas from "./pages/Praticas";
import Sobre from "./pages/Sobre";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/testes" element={<Testes />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/resultados/:quizId" element={<Resultados />} />
            <Route path="/praticas" element={<Praticas />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
