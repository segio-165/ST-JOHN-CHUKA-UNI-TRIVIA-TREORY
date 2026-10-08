/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { CandidateLogin } from './components/CandidateLogin';
import { QuizInterface } from './components/QuizInterface';
import { ResultsReview } from './components/ResultsReview';
import {
  CandidateInfo,
  ProcessedQuestion,
  SavedAssessmentState,
  AssessmentResult
} from './types';
import {
  prepareQuestions,
  calculateResults,
  TOTAL_TIME_SECONDS,
  STORAGE_KEY
} from './utils/quizUtils';

export default function App() {
  const [screen, setScreen] = useState<'login' | 'quiz' | 'results'>('login');
  const [candidate, setCandidate] = useState<CandidateInfo | null>(null);
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME_SECONDS);
  const [sessionStartedAt, setSessionStartedAt] = useState<number>(Date.now());
  const [savedState, setSavedState] = useState<SavedAssessmentState | null>(null);
  const [finalResult, setFinalResult] = useState<AssessmentResult | null>(null);

  // Check for saved state on initial mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: SavedAssessmentState = JSON.parse(stored);
        if (parsed && !parsed.isSubmitted && parsed.candidate) {
          setSavedState(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved assessment state:', e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save state whenever progress changes during quiz screen
  const saveCurrentSession = useCallback(
    (
      cand: CandidateInfo,
      qs: ProcessedQuestion[],
      currQ: number,
      answers: Record<number, number>,
      flagged: number[],
      time: number,
      startAt: number
    ) => {
      const stateToSave: SavedAssessmentState = {
        candidate: cand,
        questions: qs,
        currentQuestion: currQ,
        userAnswers: answers,
        flaggedQuestions: flagged,
        timeLeft: time,
        totalTime: TOTAL_TIME_SECONDS,
        isSubmitted: false,
        sessionStartedAt: startAt,
        lastSavedAt: Date.now()
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      } catch (err) {
        console.warn('Unable to persist assessment to localStorage', err);
      }
    },
    []
  );

  // Start new assessment session
  const handleStart = (candidateInfo: CandidateInfo) => {
    const initializedQuestions = prepareQuestions();
    setCandidate(candidateInfo);
    setQuestions(initializedQuestions);
    setCurrentQuestion(0);
    setUserAnswers({});
    setFlaggedQuestions([]);
    setTimeLeft(TOTAL_TIME_SECONDS);
    const now = Date.now();
    setSessionStartedAt(now);
    setSavedState(null);
    setFinalResult(null);
    setScreen('quiz');

    saveCurrentSession(
      candidateInfo,
      initializedQuestions,
      0,
      {},
      [],
      TOTAL_TIME_SECONDS,
      now
    );
  };

  // Resume active session
  const handleResume = () => {
    if (!savedState) return;
    setCandidate(savedState.candidate);
    setQuestions(savedState.questions);
    setCurrentQuestion(savedState.currentQuestion || 0);
    setUserAnswers(savedState.userAnswers || {});
    setFlaggedQuestions(savedState.flaggedQuestions || []);
    setTimeLeft(
      typeof savedState.timeLeft === 'number' && savedState.timeLeft > 0
        ? savedState.timeLeft
        : TOTAL_TIME_SECONDS
    );
    setSessionStartedAt(savedState.sessionStartedAt || Date.now());
    setScreen('quiz');
  };

  // Discard saved session
  const handleClearSaved = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedState(null);
  };

  // Option select handler
  const handleSelectOption = (qIndex: number, optionIndex: number) => {
    setUserAnswers((prev) => {
      const updated = { ...prev, [qIndex]: optionIndex };
      if (candidate && questions.length > 0) {
        saveCurrentSession(
          candidate,
          questions,
          currentQuestion,
          updated,
          flaggedQuestions,
          timeLeft,
          sessionStartedAt
        );
      }
      return updated;
    });
  };

  // Clear chosen option
  const handleClearOption = (qIndex: number) => {
    setUserAnswers((prev) => {
      const updated = { ...prev };
      delete updated[qIndex];
      if (candidate && questions.length > 0) {
        saveCurrentSession(
          candidate,
          questions,
          currentQuestion,
          updated,
          flaggedQuestions,
          timeLeft,
          sessionStartedAt
        );
      }
      return updated;
    });
  };

  // Toggle flag
  const handleToggleFlag = (qIndex: number) => {
    setFlaggedQuestions((prev) => {
      const updated = prev.includes(qIndex)
        ? prev.filter((idx) => idx !== qIndex)
        : [...prev, qIndex];

      if (candidate && questions.length > 0) {
        saveCurrentSession(
          candidate,
          questions,
          currentQuestion,
          userAnswers,
          updated,
          timeLeft,
          sessionStartedAt
        );
      }
      return updated;
    });
  };

  // Navigation
  const handleNavigate = (qIndex: number) => {
    if (qIndex >= 0 && qIndex < questions.length) {
      setCurrentQuestion(qIndex);
      if (candidate && questions.length > 0) {
        saveCurrentSession(
          candidate,
          questions,
          qIndex,
          userAnswers,
          flaggedQuestions,
          timeLeft,
          sessionStartedAt
        );
      }
    }
  };

  // Submit test
  const handleSubmit = useCallback(() => {
    if (!candidate || questions.length === 0) return;

    const timeSpent = TOTAL_TIME_SECONDS - timeLeft;
    const computed = calculateResults(
      candidate,
      questions,
      userAnswers,
      timeSpent
    );

    setFinalResult(computed);
    setScreen('results');

    // Remove active in-progress state
    localStorage.removeItem(STORAGE_KEY);
  }, [candidate, questions, timeLeft, userAnswers]);

  // Tick timer every second
  const handleTickTimer = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        // Auto-submit when time expires!
        handleSubmit();
        return 0;
      }
      const newTime = prev - 1;
      // Periodic save every 10 seconds to reduce write frequency
      if (newTime % 10 === 0 && candidate && questions.length > 0) {
        saveCurrentSession(
          candidate,
          questions,
          currentQuestion,
          userAnswers,
          flaggedQuestions,
          newTime,
          sessionStartedAt
        );
      }
      return newTime;
    });
  }, [
    candidate,
    questions,
    currentQuestion,
    userAnswers,
    flaggedQuestions,
    sessionStartedAt,
    saveCurrentSession,
    handleSubmit
  ]);

  // Retake assessment with same candidate info
  const handleRestart = () => {
    if (!candidate) {
      setScreen('login');
      return;
    }
    const freshQuestions = prepareQuestions();
    setQuestions(freshQuestions);
    setCurrentQuestion(0);
    setUserAnswers({});
    setFlaggedQuestions([]);
    setTimeLeft(TOTAL_TIME_SECONDS);
    const now = Date.now();
    setSessionStartedAt(now);
    setFinalResult(null);
    setScreen('quiz');

    saveCurrentSession(
      candidate,
      freshQuestions,
      0,
      {},
      [],
      TOTAL_TIME_SECONDS,
      now
    );
  };

  // Switch candidate
  const handleNewCandidate = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCandidate(null);
    setQuestions([]);
    setUserAnswers({});
    setFlaggedQuestions([]);
    setFinalResult(null);
    setSavedState(null);
    setScreen('login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      {screen === 'login' && (
        <CandidateLogin
          onStart={handleStart}
          savedState={savedState}
          onResume={handleResume}
          onClearSaved={handleClearSaved}
        />
      )}

      {screen === 'quiz' && candidate && questions.length > 0 && (
        <QuizInterface
          candidate={candidate}
          questions={questions}
          currentQuestion={currentQuestion}
          userAnswers={userAnswers}
          flaggedQuestions={flaggedQuestions}
          timeLeft={timeLeft}
          totalTime={TOTAL_TIME_SECONDS}
          onSelectOption={handleSelectOption}
          onClearOption={handleClearOption}
          onToggleFlag={handleToggleFlag}
          onNavigate={handleNavigate}
          onSubmit={handleSubmit}
          onTickTimer={handleTickTimer}
        />
      )}

      {screen === 'results' && finalResult && (
        <ResultsReview
          result={finalResult}
          questions={questions}
          userAnswers={userAnswers}
          flaggedQuestions={flaggedQuestions}
          onRestart={handleRestart}
          onNewCandidate={handleNewCandidate}
        />
      )}
    </div>
  );
}
