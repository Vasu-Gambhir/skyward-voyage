// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import { Auth } from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return null; // or a spinner
  return user ? children : <Navigate to="/auth" replace />;
}

function AuthRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return null; // or a spinner
  return user ? <Navigate to="/" replace /> : children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth"
              element={
                <AuthRoute>
                  <Auth />
                </AuthRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
