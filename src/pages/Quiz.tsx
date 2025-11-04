import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { quizzes } from '@/data/quizzes';
import { QuizAnswer } from '@/types/quiz';

const Quiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const quiz = quizzes.find(q => q.id === quizId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  useEffect(() => {
    if (!quiz) {
      navigate('/testes');
    }
  }, [quiz, navigate]);

  if (!quiz) return null;

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(
      a => a.questionId === quiz.questions[currentQuestion].id
    );

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex].value = value;
    } else {
      newAnswers.push({
        questionId: quiz.questions[currentQuestion].id,
        value,
      });
    }

    setAnswers(newAnswers);
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === quiz.questions[currentQuestion].id)?.value;
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate total score and save to localStorage
      const totalScore = answers.reduce((sum, answer) => sum + answer.value, 0);
      const result = {
        quizId: quiz.id,
        score: totalScore,
        maxScore: quiz.questions.length * 2,
        timestamp: Date.now(),
      };
      
      const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      savedResults.push(result);
      localStorage.setItem('quizResults', JSON.stringify(savedResults));
      
      navigate(`/resultados/${quiz.id}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentAnswer = getCurrentAnswer();
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8 animate-fade-in">
            <Button
              variant="ghost"
              onClick={() => navigate('/testes')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar aos Testes
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{quiz.title}</h1>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Pergunta {currentQuestion + 1} de {quiz.questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <Card className="gradient-card border-none shadow-medium animate-scale-in">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-semibold mb-8">
                {quiz.questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {[
                  { value: 0, label: 'Nunca / Raramente' },
                  { value: 1, label: 'Frequentemente' },
                  { value: 2, label: 'Sempre' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-smooth text-left ${
                      currentAnswer === option.value
                        ? 'border-primary bg-primary/10 shadow-soft'
                        : 'border-border hover:border-primary/50 bg-card'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-smooth ${
                          currentAnswer === option.value
                            ? 'border-primary bg-primary'
                            : 'border-border'
                        }`}
                      >
                        {currentAnswer === option.value && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8 pt-8 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  variant="default"
                  onClick={handleNext}
                  disabled={!canProceed}
                >
                  {currentQuestion === quiz.questions.length - 1 ? 'Finalizar' : 'Próxima'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
