import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-secondary fill-secondary" />
            <span>pela equipe Escalas Delete</span>
          </div>
          <div className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Escalas Delete. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
