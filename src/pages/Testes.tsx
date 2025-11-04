import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Laptop, Brain, Music, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { quizzes } from '@/data/quizzes';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Laptop,
  Brain,
  Music,
};

const Testes = () => {
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
              return (
                <Card
                  key={quiz.id}
                  className="gradient-card border-none shadow-soft hover:shadow-medium transition-smooth animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{quiz.title}</CardTitle>
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
                      <Link to={`/quiz/${quiz.id}`}>
                        <Button variant="quiz" size="default">
                          Iniciar Teste
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
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
