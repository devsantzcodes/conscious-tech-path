import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, TrendingUp, ArrowLeft, RotateCcw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { quizzes } from '@/data/quizzes';
import { useEffect, useState } from 'react';
import { QuizResult, ResultLevel } from '@/types/quiz';

const Resultados = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const quiz = quizzes.find(q => q.id === quizId);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (!quiz) {
      navigate('/testes');
      return;
    }

    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const latestResult = savedResults
      .filter((r: QuizResult) => r.quizId === quizId)
      .sort((a: QuizResult, b: QuizResult) => b.timestamp - a.timestamp)[0];

    if (latestResult) {
      setResult(latestResult);
    } else {
      navigate(`/quiz/${quizId}`);
    }
  }, [quiz, quizId, navigate]);

  if (!quiz || !result) return null;

  const percentage = (result.score / result.maxScore) * 100;

  const getResultLevel = (): ResultLevel => {
    if (percentage <= 25) {
      return {
        level: 'healthy',
        title: 'Uso Saudável',
        description: 'Parabéns! Você mantém uma relação equilibrada e consciente com a tecnologia. Continue cultivando esses hábitos saudáveis.',
        color: 'text-green-600 dark:text-green-400',
      };
    } else if (percentage <= 50) {
      return {
        level: 'light',
        title: 'Atenção Leve',
        description: 'Alguns sinais de dependência foram identificados. Considere implementar práticas de uso consciente e estabelecer limites.',
        color: 'text-yellow-600 dark:text-yellow-400',
      };
    } else if (percentage <= 75) {
      return {
        level: 'moderate',
        title: 'Atenção Moderada',
        description: 'Há indícios significativos de dependência. É importante buscar estratégias para reduzir o uso e recuperar o equilíbrio.',
        color: 'text-orange-600 dark:text-orange-400',
      };
    } else {
      return {
        level: 'severe',
        title: 'Atenção Grave',
        description: 'Os resultados indicam um nível preocupante de dependência. Recomendamos buscar apoio profissional e implementar mudanças significativas.',
        color: 'text-red-600 dark:text-red-400',
      };
    }
  };

  const resultLevel = getResultLevel();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/testes')}
            className="mb-8 animate-fade-in"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Testes
          </Button>

          <div className="space-y-6 animate-slide-up">
            <Card className="gradient-card border-none shadow-medium">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl md:text-4xl">
                  {quiz.title}
                </CardTitle>
                <CardDescription className="text-base">
                  Resultado da sua avaliação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full gradient-hero shadow-glow mb-4">
                    <span className="text-5xl font-bold text-white">
                      {result.score}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    de {result.maxScore} pontos possíveis
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Pontuação</span>
                    <span className="font-semibold">{Math.round(percentage)}%</span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                </div>

                <Card className="border-2 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {resultLevel.level === 'healthy' ? (
                        <CheckCircle className={`h-8 w-8 flex-shrink-0 ${resultLevel.color}`} />
                      ) : (
                        <AlertCircle className={`h-8 w-8 flex-shrink-0 ${resultLevel.color}`} />
                      )}
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-2 ${resultLevel.color}`}>
                          {resultLevel.title}
                        </h3>
                        <p className="text-foreground">
                          {resultLevel.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-feature border-none">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">Próximos Passos</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Explore nossas práticas de bem-estar digital</li>
                          <li>• Mantenha um diário de reflexões sobre seus hábitos</li>
                          <li>• Defina metas realistas para reduzir o tempo de tela</li>
                          <li>• Busque atividades offline que tragam satisfação</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/praticas" className="flex-1">
                    <Button variant="default" size="lg" className="w-full">
                      Ver Práticas
                    </Button>
                  </Link>
                  <Link to={`/quiz/${quizId}`} className="flex-1">
                    <Button variant="outline" size="lg" className="w-full">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Refazer Teste
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resultados;
