import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Laptop, Brain, Music, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { quizzes } from '@/data/quizzes';
import { useEffect, useState } from 'react';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Laptop,
  Brain,
  Music,
};

const Testes = () => {
  const navigate = useNavigate();
  const [savedProgress, setSavedProgress] = useState<Record<string, any>>({});

  useEffect(() => {
    const progress: Record<string, any> = {};
    quizzes.forEach(quiz => {
      const saved = localStorage.getItem(`quiz_progress_${quiz.id}`);
      if (saved) {
        progress[quiz.id] = JSON.parse(saved);
      }
    });
    setSavedProgress(progress);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Avalie seus Hábitos Digitais
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha um questionário para avaliar diferentes aspectos da sua relação com
              tecnologias digitais. Cada teste leva cerca de 5 minutos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {quizzes.map((quiz, index) => {
              const Icon = iconMap[quiz.icon];
              const hasProgress = savedProgress[quiz.id];
              const progressPercent = hasProgress 
                ? Math.round(((hasProgress.currentQuestion + 1) / quiz.questions.length) * 100)
                : 0;

              return (
                <Card
                  key={quiz.id}
                  className="gradient-card border-none shadow-soft hover:shadow-medium hover-lift cursor-pointer animate-slide-up group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                >
                  {hasProgress && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-xs font-medium flex items-center gap-1 animate-pulse-slow">
                      <Clock className="h-3 w-3" />
                      {progressPercent}% completo
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 gradient-hero rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-spring shadow-soft">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-smooth">{quiz.title}</CardTitle>
                        <CardDescription className="text-base">
                          {quiz.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {quiz.questions.length} perguntas
                      </span>
                      <Button variant="quiz" size="default" className="pointer-events-none">
                        {hasProgress ? 'Continuar Teste' : 'Iniciar Teste'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testes;
