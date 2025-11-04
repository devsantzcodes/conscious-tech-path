export interface QuizQuestion {
  id: number;
  question: string;
}

export interface QuizAnswer {
  questionId: number;
  value: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  quizId: string;
  score: number;
  maxScore: number;
  timestamp: number;
}

export interface ResultLevel {
  level: 'healthy' | 'light' | 'moderate' | 'severe';
  title: string;
  description: string;
  color: string;
}
