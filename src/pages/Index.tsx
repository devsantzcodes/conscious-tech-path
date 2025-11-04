import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Brain, Activity, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Testes Interativos',
      description: 'Avalie seu nível de dependência tecnológica através de questionários científicos.',
    },
    {
      icon: Brain,
      title: 'Análise Personalizada',
      description: 'Receba recomendações baseadas nos seus resultados e padrões de uso.',
    },
    {
      icon: Activity,
      title: 'Práticas de Bem-estar',
      description: 'Descubra exercícios e técnicas para equilibrar sua vida digital.',
    },
    {
      icon: BookOpen,
      title: 'Reflexões Guiadas',
      description: 'Mantenha um diário de reflexões sobre seus hábitos digitais.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-hero bg-clip-text text-transparent">
                Escalas Delete
              </span>
              <br />
              <span className="text-foreground">Detox Digital</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Promova o uso consciente de tecnologias e equilibre sua vida digital com
              ferramentas interativas de avaliação e práticas de bem-estar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/testes">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Começar Avaliação
                </Button>
              </Link>
              <Link to="/sobre">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recursos para seu Bem-estar Digital
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ferramentas baseadas em pesquisas científicas para ajudá-lo a desenvolver
              uma relação mais saudável com a tecnologia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="gradient-card border-none shadow-soft hover:shadow-medium transition-smooth animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 gradient-hero rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="gradient-feature border-none shadow-medium">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Pronto para Transformar sua Relação com a Tecnologia?
              </h2>
              <p className="text-lg text-muted-foreground">
                Comece agora sua jornada rumo a uma vida digital mais equilibrada e saudável.
              </p>
              <Link to="/testes">
                <Button variant="hero" size="xl">
                  Iniciar Teste Gratuito
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
