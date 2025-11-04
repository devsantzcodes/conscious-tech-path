import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { quizzes } from '@/data/quizzes';
import { QuizAnswer } from '@/types/quiz';
import { toast } from 'sonner';

const Quiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const quiz = quizzes.find(q => q.id === quizId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    if (!quiz) {
      navigate('/testes');
      return;
    }

    const savedProgress = localStorage.getItem(`quiz_progress_${quiz.id}`);
    if (savedProgress) {
      const { currentQuestion: savedQuestion, answers: savedAnswers } = JSON.parse(savedProgress);
      setCurrentQuestion(savedQuestion);
      setAnswers(savedAnswers);
      toast.info('Progresso restaurado! Continue de onde parou.');
    }
  }, [quiz, navigate]);

  // Auto-save progress
  useEffect(() => {
    if (!quiz || answers.length === 0) return;
    
    const progressData = {
      currentQuestion,
      answers,
      timestamp: Date.now()
    };
    localStorage.setItem(`quiz_progress_${quiz.id}`, JSON.stringify(progressData));
  }, [currentQuestion, answers, quiz]);

  if (!quiz) return null;

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswer = useCallback((value: number) => {
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
    setShowFeedback(true);

    // Auto-advance after feedback
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < quiz.questions.length - 1) {
        handleNext();
      }
    }, 1500);
  }, [answers, quiz, currentQuestion]);

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === quiz.questions[currentQuestion].id)?.value;
  };

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
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
        
        // Clear saved progress
        localStorage.removeItem(`quiz_progress_${quiz.id}`);
        
        toast.success('Quiz completado!');
        navigate(`/resultados/${quiz.id}`);
      }
    }, 300);
  }, [currentQuestion, quiz, answers, navigate]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setShowFeedback(false);
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentQuestion]);

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

          <Card className={`gradient-card border-none shadow-medium transition-smooth ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-scale-in'
          }`}>
            <CardContent className="p-8 md:p-12">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Pergunta {currentQuestion + 1}/{quiz.questions.length}
                </span>
              </div>

              <h2 className="text-2xl font-semibold mb-8 animate-fade-in">
                {quiz.questions[currentQuestion].question}
              </h2>

              {showFeedback && currentAnswer !== undefined && (
                <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 animate-fade-in ${
                  currentAnswer === 0 ? 'bg-green-500/10 border border-green-500/30' :
                  currentAnswer === 1 ? 'bg-yellow-500/10 border border-yellow-500/30' :
                  'bg-red-500/10 border border-red-500/30'
                }`}>
                  {currentAnswer === 0 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="text-sm">
                    <p className="font-medium mb-1">
                      {currentAnswer === 0 ? 'Ótimo!' : currentAnswer === 1 ? 'Atenção!' : 'Cuidado!'}
                    </p>
                    <p className="text-muted-foreground">
                      {currentAnswer === 0 
                        ? 'Este é um comportamento saudável. Continue assim!' 
                        : currentAnswer === 1
                        ? 'Considere reduzir a frequência deste comportamento.'
                        : 'Este comportamento pode estar afetando seu bem-estar.'}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {[
                  { value: 0, label: 'Nunca / Raramente', emoji: '😊' },
                  { value: 1, label: 'Frequentemente', emoji: '😐' },
                  { value: 2, label: 'Sempre', emoji: '😰' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    disabled={showFeedback}
                    className={`w-full p-5 rounded-lg border-2 transition-smooth text-left group hover:scale-[1.02] active:scale-[0.98] ${
                      currentAnswer === option.value
                        ? 'border-primary bg-primary/10 shadow-soft'
                        : 'border-border hover:border-primary/50 bg-card hover:shadow-soft'
                    } ${showFeedback ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth ${
                          currentAnswer === option.value
                            ? 'border-primary bg-primary scale-110'
                            : 'border-border group-hover:border-primary/50'
                        }`}
                      >
                        {currentAnswer === option.value && (
                          <div className="w-3 h-3 rounded-full bg-white animate-scale-in" />
                        )}
                      </div>
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="font-medium flex-1">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8 pt-8 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0 || showFeedback}
                  className="hover:scale-105 active:scale-95 transition-smooth"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  variant="default"
                  onClick={handleNext}
                  disabled={!canProceed || showFeedback}
                  className="hover:scale-105 active:scale-95 transition-smooth shadow-medium hover:shadow-glow"
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
