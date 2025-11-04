import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Target, Clock, BookHeart, Save } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Praticas = () => {
  const [reflection, setReflection] = useState(() => {
    return localStorage.getItem('digitalReflection') || '';
  });

  const practices = [
    {
      icon: Target,
      title: 'Desafio das 24 Horas',
      description: 'Experimente ficar 24 horas sem redes sociais. Observe como você se sente e o que faz com o tempo livre.',
      color: 'text-primary',
    },
    {
      icon: Clock,
      title: 'Técnica Pomodoro Digital',
      description: 'Trabalhe focado por 25 minutos sem distrações digitais, depois faça uma pausa de 5 minutos. Repita 4 vezes.',
      color: 'text-secondary',
    },
    {
      icon: BookHeart,
      title: 'Ritual Matinal Offline',
      description: 'Não use o celular na primeira hora após acordar. Use esse tempo para meditar, exercitar-se ou ler.',
      color: 'text-accent',
    },
  ];

  const handleSaveReflection = () => {
    localStorage.setItem('digitalReflection', reflection);
    toast.success('Reflexão salva com sucesso!', {
      description: 'Seu diário foi atualizado.',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Práticas de Bem-estar Digital
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore exercícios e técnicas para desenvolver hábitos digitais mais conscientes
              e equilibrados.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {practices.map((practice, index) => (
              <Card
                key={index}
                className="gradient-card border-none shadow-soft hover:shadow-medium transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 gradient-hero rounded-lg flex items-center justify-center`}>
                    <practice.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{practice.title}</h3>
                  <p className="text-muted-foreground">{practice.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="gradient-feature border-none shadow-medium animate-scale-in">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 gradient-hero rounded-lg flex items-center justify-center">
                  <BookHeart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Diário de Reflexões</CardTitle>
                  <CardDescription className="text-base">
                    Registre seus pensamentos sobre seus hábitos digitais
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Como você se sente em relação ao seu uso de tecnologia hoje? Quais mudanças você gostaria de fazer?&#10;&#10;Escreva livremente sobre seus desafios, progressos e reflexões..."
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <Button
                onClick={handleSaveReflection}
                variant="default"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Reflexão
              </Button>
              <p className="text-sm text-muted-foreground">
                Suas reflexões são salvas localmente no seu dispositivo e permanecem privadas.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-8 bg-muted/30 border-none">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">Dicas Adicionais</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Configure horários específicos para checar emails e mensagens</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Desative notificações não essenciais em seus dispositivos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Crie "zonas livres de tecnologia" em casa, como o quarto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Pratique mindfulness ao usar tecnologia - esteja presente</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Substitua o tempo de tela por atividades que nutrem corpo e mente</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Praticas;
