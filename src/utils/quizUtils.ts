import { RawQuestion, masterQuestions } from '../data/questions';
import { CandidateInfo, ProcessedQuestion, AssessmentResult, CategorySummary } from '../types';

export const STORAGE_KEY = 'firstAid11thAssessmentSession_v2';
export const TOTAL_TIME_SECONDS = 35 * 60; // 35 Minutes = 2100 seconds
export const PASSING_PERCENTAGE = 80; // 80% passing standard

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function extractCitation(text: string): { cleanText: string; citation?: string } {
  const match = text.match(/\[cite:\s*([^\]]+)\]/);
  if (match) {
    return {
      cleanText: text.replace(/\[cite:\s*[^\]]+\]/g, '').trim(),
      citation: match[1].trim()
    };
  }
  return { cleanText: text };
}

export function prepareQuestions(rawList: RawQuestion[] = masterQuestions): ProcessedQuestion[] {
  return rawList.map((item) => {
    const shuffledOptions = shuffleArray(item.options);
    const newCorrectIndex = shuffledOptions.indexOf(item.correctText);
    const { citation } = extractCitation(item.correctText);

    return {
      id: item.id,
      q: item.q,
      options: shuffledOptions,
      correctIndex: newCorrectIndex,
      correctText: item.correctText,
      category: item.category,
      citation: citation ? `Page/Ref ${citation}` : undefined
    };
  });
}

export function formatMinutesSeconds(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function formatDurationHuman(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} sec`;
  if (secs === 0) return `${mins} min`;
  return `${mins}m ${secs}s`;
}

export function generateCandidateId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `FA-2026-${randomNum}`;
}

export function generateCertificateId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CERT-FA11-${code.slice(0, 4)}-${code.slice(4)}`;
}

export function calculateResults(
  candidate: CandidateInfo,
  questions: ProcessedQuestion[],
  userAnswers: Record<number, number>,
  timeSpentSeconds: number
): AssessmentResult {
  let score = 0;
  const categoriesMap: Record<string, { total: number; correct: number }> = {};

  questions.forEach((q, idx) => {
    if (!categoriesMap[q.category]) {
      categoriesMap[q.category] = { total: 0, correct: 0 };
    }
    categoriesMap[q.category].total += 1;

    const userAns = userAnswers[idx];
    if (userAns !== undefined && userAns === q.correctIndex) {
      score += 1;
      categoriesMap[q.category].correct += 1;
    }
  });

  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= PASSING_PERCENTAGE;

  const categoryBreakdown: CategorySummary[] = Object.entries(categoriesMap).map(
    ([category, data]) => ({
      category,
      total: data.total,
      correct: data.correct,
      percentage: Math.round((data.correct / data.total) * 100)
    })
  );

  return {
    candidate,
    score,
    totalQuestions: questions.length,
    percentage,
    passed,
    passingScore: PASSING_PERCENTAGE,
    timeSpentSeconds,
    completedAt: new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    certificateId: generateCertificateId(),
    categoryBreakdown
  };
}
