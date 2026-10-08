export interface CandidateInfo {
  name: string;
  candidateId: string;
  email?: string;
  accessCode?: string;
}

export interface ProcessedQuestion {
  id: number;
  q: string;
  options: string[];
  correctIndex: number;
  correctText: string;
  category: 'General Principles' | 'Fractures' | 'Dislocations' | 'Sprains & Strains' | 'Medical Emergencies';
  citation?: string;
}

export interface CategorySummary {
  category: string;
  total: number;
  correct: number;
  percentage: number;
}

export interface AssessmentResult {
  candidate: CandidateInfo;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  passingScore: number;
  timeSpentSeconds: number;
  completedAt: string;
  certificateId: string;
  categoryBreakdown: CategorySummary[];
}

export interface SavedAssessmentState {
  candidate: CandidateInfo;
  currentQuestion: number;
  userAnswers: Record<number, number>;
  flaggedQuestions: number[];
  timeLeft: number;
  totalTime: number;
  questions: ProcessedQuestion[];
  isSubmitted: boolean;
  sessionStartedAt: number;
  lastSavedAt: number;
}
