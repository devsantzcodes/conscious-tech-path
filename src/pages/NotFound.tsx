import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full gradient-hero shadow-glow mb-4">
          <span className="text-6xl font-bold text-white">404</span>
        </div>
        <h1 className="text-4xl font-bold">Página não encontrada</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          A página que você procura não existe ou foi removida.
        </p>
        <Link to="/">
          <Button variant="hero" size="lg">
            <Home className="mr-2 h-5 w-5" />
            Voltar para o Início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
