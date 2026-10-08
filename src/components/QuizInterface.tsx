import React, { useState, useEffect, useMemo } from 'react';
import { ProcessedQuestion, CandidateInfo } from '../types';
import { formatMinutesSeconds } from '../utils/quizUtils';
import { StJohnLogo, BattenburgPattern } from './StJohnLogo';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  Grid,
  Send,
  AlertTriangle,
  CheckCircle,
  X,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface QuizInterfaceProps {
  candidate: CandidateInfo;
  questions: ProcessedQuestion[];
  currentQuestion: number;
  userAnswers: Record<number, number>;
  flaggedQuestions: number[];
  timeLeft: number;
  totalTime: number;
  onSelectOption: (qIndex: number, optionIndex: number) => void;
  onClearOption: (qIndex: number) => void;
  onToggleFlag: (qIndex: number) => void;
  onNavigate: (qIndex: number) => void;
  onSubmit: () => void;
  onTickTimer: () => void;
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({
  candidate,
  questions,
  currentQuestion,
  userAnswers,
  flaggedQuestions,
  timeLeft,
  totalTime,
  onSelectOption,
  onClearOption,
  onToggleFlag,
  onNavigate,
  onSubmit,
  onTickTimer
}) => {
  const [showGridModal, setShowGridModal] = useState(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [gridFilter, setGridFilter] = useState<'all' | 'unanswered' | 'flagged'>('all');

  // Timer interval countdown
  useEffect(() => {
    const timer = setInterval(() => {
      onTickTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [onTickTimer]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSubmitConfirmModal || showGridModal) return;

      const key = e.key.toLowerCase();
      if (key === 'arrowleft' && currentQuestion > 0) {
        onNavigate(currentQuestion - 1);
      } else if (key === 'arrowright' && currentQuestion < questions.length - 1) {
        onNavigate(currentQuestion + 1);
      } else if (key === '1' || key === 'a') {
        onSelectOption(currentQuestion, 0);
      } else if (key === '2' || key === 'b') {
        onSelectOption(currentQuestion, 1);
      } else if (key === '3' || key === 'c') {
        onSelectOption(currentQuestion, 2);
      } else if (key === '4' || key === 'd') {
        onSelectOption(currentQuestion, 3);
      } else if (key === 'f') {
        onToggleFlag(currentQuestion);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, questions.length, onNavigate, onSelectOption, onToggleFlag, showSubmitConfirmModal, showGridModal]);

  const activeQ = questions[currentQuestion];
  const selectedOptionIndex = userAnswers[currentQuestion];
  const isFlagged = flaggedQuestions.includes(currentQuestion);

  const answeredCount = useMemo(() => {
    return Object.keys(userAnswers).length;
  }, [userAnswers]);

  const unansweredCount = questions.length - answeredCount;
  const flaggedCount = flaggedQuestions.length;

  const isWarningTime = timeLeft <= 300; // <= 5 minutes
  const isCriticalTime = timeLeft <= 60; // <= 1 minute

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      onNavigate(currentQuestion + 1);
    } else {
      setShowSubmitConfirmModal(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      onNavigate(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top High-Vis Battenburg Stripe */}
      <BattenburgPattern className="h-2" />

      {/* Top Header Navigation Bar in St John Ambulance Black & Green */}
      <header className="sticky top-0 z-30 bg-[#111111] text-white border-b-4 border-[#005A36] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between gap-4">

            {/* St John Ambulance Logo & Candidate Details */}
            <div className="flex items-center gap-3 min-w-0">
              <StJohnLogo size="sm" variant="crest-only" />
              <div className="min-w-0">
                <div className="text-xs text-slate-300 font-medium truncate flex items-center gap-1.5">
                  <span className="font-bold text-white">{candidate.name}</span>
                  <span className="hidden md:inline text-[#FFD100] font-mono">• {candidate.candidateId}</span>
                </div>
                <div className="text-sm font-black text-white tracking-wide truncate flex items-center gap-1.5">
                  <span>St John Ambulance</span>
                  <span className="text-xs font-semibold text-[#FFD100] bg-black/60 px-1.5 py-0.2 rounded border border-[#FFD100]/40">
                    11th Edition
                  </span>
                </div>
              </div>
            </div>

            {/* Controls, Timer & Navigator */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Question Grid Drawer Trigger */}
              <button
                type="button"
                onClick={() => setShowGridModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                title="View full 80-question grid"
              >
                <Grid className="w-4 h-4 text-[#FFD100]" />
                <span className="hidden md:inline">Navigator</span>
                <span className="bg-[#005A36] text-[#FFD100] text-xs px-2 py-0.5 rounded font-mono font-bold">
                  {answeredCount}/80
                </span>
              </button>

              {/* 35-Minute Attempt Timer Pill */}
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 font-mono font-black text-sm sm:text-base transition-all ${
                  isCriticalTime
                    ? 'bg-red-600 text-white border-yellow-300 animate-pulse'
                    : isWarningTime
                    ? 'bg-amber-400 text-black border-red-600 animate-pulse'
                    : 'bg-[#FFD100] text-black border-yellow-500 shadow-sm'
                }`}
                title="St John 35-Minute Attempt Countdown Timer"
              >
                <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${isCriticalTime ? 'text-white' : 'text-black'}`} />
                <span className="tracking-wider">{formatMinutesSeconds(timeLeft)}</span>
              </div>

              {/* Submit Assessment Button */}
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#005A36] hover:bg-[#00472a] text-white border border-[#FFD100] font-black text-xs sm:text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#FFD100]" />
                <span>Submit</span>
              </button>
            </div>
          </div>

          {/* Progress Bar (St John Green with Gold Glow) */}
          <div className="mt-2 w-full bg-slate-800 h-2 rounded-full overflow-hidden flex border border-slate-700">
            <div
              className="bg-gradient-to-r from-[#005A36] via-emerald-500 to-[#FFD100] h-full transition-all duration-300"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              title={`${answeredCount} of 80 answered`}
            />
          </div>
        </div>
      </header>

      {/* Main Question Interface */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
        <div className="space-y-6">

          {/* Question Metadata & Bookmark Actions */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-[#005A36] text-white font-extrabold text-xs tracking-wide border border-[#FFD100]/50 shadow-xs">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black text-[#FFD100] font-bold text-xs border border-slate-800">
                {activeQ.category}
              </span>
              {selectedOptionIndex !== undefined ? (
                <span className="inline-flex items-center gap-1 text-xs text-[#005A36] font-extrabold bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                  <CheckCircle className="w-3.5 h-3.5 text-[#005A36]" /> Recorded
                </span>
              ) : (
                <span className="text-xs text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                  Unanswered
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => onToggleFlag(currentQuestion)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all cursor-pointer ${
                isFlagged
                  ? 'bg-[#FFD100] text-black border-black shadow-xs font-black'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-black text-black' : 'text-slate-500'}`} />
              {isFlagged ? 'Flagged for Review' : 'Flag Question'}
            </button>
          </div>

          {/* Question Box Card */}
          <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {activeQ.q}
            </h2>

            {/* Options List (A, B, C, D) */}
            <div className="mt-6 space-y-3">
              {activeQ.options.map((optionText, idx) => {
                const isSelected = selectedOptionIndex === idx;
                return (
                  <label
                    key={idx}
                    onClick={() => onSelectOption(currentQuestion, idx)}
                    className={`flex items-start sm:items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#005A36] bg-emerald-50/80 shadow-sm ring-2 ring-[#005A36]/40'
                        : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center mr-3 sm:mr-4 shrink-0 mt-0.5 sm:mt-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${
                          isSelected
                            ? 'bg-[#005A36] text-[#FFD100] border-[#005A36]'
                            : 'bg-black text-white border-slate-700'
                        }`}
                      >
                        {optionLetters[idx]}
                      </div>
                    </div>
                    <span
                      className={`text-sm sm:text-base leading-relaxed ${
                        isSelected ? 'font-bold text-slate-950' : 'text-slate-700 font-medium'
                      }`}
                    >
                      {optionText}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Clear Choice & Keyboard shortcut guide */}
            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="hidden sm:inline">
                Keyboard shortcuts: Keys <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono font-bold">A-D</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono font-bold">1-4</kbd> • <kbd className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono font-bold">F</kbd> to flag
              </span>
              {selectedOptionIndex !== undefined && (
                <button
                  type="button"
                  onClick={() => onClearOption(currentQuestion)}
                  className="text-red-600 hover:text-red-800 underline font-bold transition-colors cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm border-2 shadow-xs transition-colors cursor-pointer ${
              currentQuestion === 0
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-xs text-slate-600 font-bold hidden sm:block">
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl font-extrabold text-sm bg-[#005A36] hover:bg-[#00472a] text-white border-2 border-[#FFD100] shadow-sm transition-colors cursor-pointer"
          >
            {currentQuestion === questions.length - 1 ? (
              <>
                Review & Submit
                <Send className="w-4 h-4 text-[#FFD100]" />
              </>
            ) : (
              <>
                Next Question
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </main>

      {/* QUESTION NAVIGATOR / PALETTE MODAL */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border-4 border-[#005A36]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#005A36] text-white flex items-center justify-between border-b-2 border-[#FFD100]">
              <div className="flex items-center gap-2.5">
                <StJohnLogo size="sm" variant="crest-only" />
                <div>
                  <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                    Assessment Question Navigator
                  </h3>
                  <p className="text-xs text-emerald-100">
                    Jump directly to any of the 80 questions.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGridModal(false)}
                className="w-8 h-8 rounded-lg bg-black/60 hover:bg-black text-white flex items-center justify-center border border-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter and Legend */}
            <div className="p-4 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-[#005A36]"></span> Answered ({answeredCount})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-[#FFD100] border border-black"></span> Flagged ({flaggedCount})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-400"></span> Unanswered ({unansweredCount})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-black ring-2 ring-[#FFD100]"></span> Current
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-300">
                <button
                  type="button"
                  onClick={() => setGridFilter('all')}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${gridFilter === 'all' ? 'bg-[#005A36] text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  All (80)
                </button>
                <button
                  type="button"
                  onClick={() => setGridFilter('unanswered')}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${gridFilter === 'unanswered' ? 'bg-[#005A36] text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  Unanswered ({unansweredCount})
                </button>
                <button
                  type="button"
                  onClick={() => setGridFilter('flagged')}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${gridFilter === 'flagged' ? 'bg-[#005A36] text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  Flagged ({flaggedCount})
                </button>
              </div>
            </div>

            {/* 80 Questions Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50">
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {questions.map((_, idx) => {
                  const hasAnswer = userAnswers[idx] !== undefined;
                  const isQFlagged = flaggedQuestions.includes(idx);
                  const isCurrent = currentQuestion === idx;

                  if (gridFilter === 'unanswered' && hasAnswer) return null;
                  if (gridFilter === 'flagged' && !isQFlagged) return null;

                  let bgClass = 'bg-white text-slate-800 hover:bg-slate-100 border-slate-300';
                  if (hasAnswer) {
                    bgClass = 'bg-[#005A36] text-[#FFD100] hover:bg-[#00472a] border-[#005A36] font-bold';
                  }
                  if (isQFlagged) {
                    bgClass = 'bg-[#FFD100] text-black hover:bg-yellow-400 border-black font-black';
                  }
                  if (isCurrent) {
                    bgClass = 'bg-black text-[#FFD100] ring-4 ring-[#FFD100] font-black border-black';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onNavigate(idx);
                        setShowGridModal(false);
                      }}
                      className={`h-10 rounded-lg font-mono text-xs sm:text-sm font-bold border-2 transition-all flex flex-col items-center justify-center relative cursor-pointer ${bgClass}`}
                    >
                      <span>{idx + 1}</span>
                      {isQFlagged && (
                        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-black border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-300 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-600">
                Time Remaining: <span className="font-mono font-bold text-black">{formatMinutesSeconds(timeLeft)}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowGridModal(false)}
                className="px-4 py-2 bg-black hover:bg-slate-900 text-[#FFD100] font-bold text-xs rounded-lg cursor-pointer"
              >
                Close Palette
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM FINAL SUBMIT MODAL */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border-4 border-[#005A36]">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#005A36] text-[#FFD100] border-2 border-[#FFD100] flex items-center justify-center mx-auto shadow-md">
                <Send className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-black text-slate-900">
                Submit St John Ambulance Assessment?
              </h3>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Candidate:</span>
                  <span className="font-bold text-slate-900">{candidate.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Completed Questions:</span>
                  <span className="font-bold text-[#005A36]">{answeredCount} of 80</span>
                </div>
                {unansweredCount > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-200 text-amber-700">
                    <span className="flex items-center gap-1 font-bold">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Unanswered Questions:
                    </span>
                    <span className="font-black">{unansweredCount}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Flagged for Review:</span>
                  <span className="font-bold text-black">{flaggedCount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Remaining Time:</span>
                  <span className="font-mono font-black text-[#005A36]">{formatMinutesSeconds(timeLeft)}</span>
                </div>
              </div>

              {unansweredCount > 0 && (
                <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-300 font-medium">
                  Warning: You have {unansweredCount} unanswered questions which will be scored as incorrect.
                </p>
              )}
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
              >
                Return to Assessment
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitConfirmModal(false);
                  onSubmit();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#005A36] hover:bg-[#00472a] text-white font-black text-sm border-2 border-[#FFD100] shadow-sm transition-colors cursor-pointer"
              >
                Confirm & Finalize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
