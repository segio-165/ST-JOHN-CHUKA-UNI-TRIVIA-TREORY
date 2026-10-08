import React, { useState } from 'react';
import { AssessmentResult, ProcessedQuestion } from '../types';
import { formatDurationHuman } from '../utils/quizUtils';
import { StJohnLogo, BattenburgPattern } from './StJohnLogo';
import {
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Printer,
  Bookmark,
  BookOpen,
  Check,
  X,
  FileCheck2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface ResultsReviewProps {
  result: AssessmentResult;
  questions: ProcessedQuestion[];
  userAnswers: Record<number, number>;
  flaggedQuestions: number[];
  onRestart: () => void;
  onNewCandidate: () => void;
}

export const ResultsReview: React.FC<ResultsReviewProps> = ({
  result,
  questions,
  userAnswers,
  flaggedQuestions,
  onRestart,
  onNewCandidate
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct' | 'flagged'>('all');

  const optionLetters = ['A', 'B', 'C', 'D'];

  const incorrectCount = result.totalQuestions - result.score;
  const flaggedCount = flaggedQuestions.length;

  const handlePrintCertificate = () => {
    window.print();
  };

  const filteredQuestions = questions.filter((q, idx) => {
    const userAns = userAnswers[idx];
    const isCorrect = userAns !== undefined && userAns === q.correctIndex;
    const isFlagged = flaggedQuestions.includes(idx);

    if (filterMode === 'incorrect') return !isCorrect;
    if (filterMode === 'correct') return isCorrect;
    if (filterMode === 'flagged') return isFlagged;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Top High-Vis Battenburg Stripe */}
      <BattenburgPattern className="h-2.5 no-print" />

      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Official St John Ambulance Result Banner */}
          <div
            className={`rounded-2xl p-6 sm:p-8 text-white shadow-xl border-4 transition-all ${
              result.passed
                ? 'bg-gradient-to-r from-[#005A36] via-[#00472a] to-black border-[#FFD100]'
                : 'bg-gradient-to-r from-slate-900 via-stone-900 to-black border-red-500'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-[#FFD100] text-[#FFD100] text-xs font-black uppercase tracking-wider">
                  {result.passed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#FFD100]" />
                      St John Ambulance Benchmark Achieved
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-400" />
                      Candidate Revision Required (Passing Mark 80%)
                    </>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {result.passed
                    ? 'Assessment Complete: Certified Pass'
                    : 'Assessment Complete: Review Required'}
                </h1>
                <p className="text-slate-200 text-sm max-w-lg leading-relaxed">
                  Candidate: <strong className="text-white underline">{result.candidate.name}</strong> (ID: {result.candidate.candidateId})
                  {result.passed
                    ? ' has successfully satisfied the theoretical knowledge requirements of the First Aid Manual 11th Edition.'
                    : ' scored below the 80% passing threshold. Please review the itemized questions and manual citations below.'}
                </p>
              </div>

              {/* Score Display Card */}
              <div className="bg-black/80 border-2 border-[#FFD100] rounded-2xl p-5 text-center min-w-[190px] shrink-0 shadow-lg">
                <div className="text-xs uppercase font-black text-[#FFD100] tracking-wider">
                  Result Score
                </div>
                <div className="text-4xl sm:text-5xl font-black my-1 font-mono text-white">
                  {result.percentage}%
                </div>
                <div className="text-sm font-bold text-emerald-300">
                  {result.score} / {result.totalQuestions} Questions Correct
                </div>
                <div className="mt-2 text-xs text-slate-300 font-mono">
                  Time Spent: {formatDurationHuman(result.timeSpentSeconds)}
                </div>
              </div>
            </div>
          </div>

          {/* St John Ambulance Official Certificate Card (Printable) */}
          <div className="bg-white rounded-2xl border-4 border-[#005A36] shadow-lg overflow-hidden p-6 sm:p-10 relative">
            {/* Top decorative Battenburg stripe */}
            <BattenburgPattern className="h-2 -mt-6 -mx-6 sm:-mt-10 sm:-mx-10 mb-6" />

            {/* Background St John Maltese Cross Watermark */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none">
              <StJohnLogo size="xl" variant="crest-only" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-slate-200 pb-6">
              <div className="flex items-center gap-3">
                <StJohnLogo size="md" />
              </div>

              <div className="no-print flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintCertificate}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005A36] hover:bg-[#00472a] text-white border-2 border-[#FFD100] rounded-xl text-xs sm:text-sm font-black shadow-sm transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#FFD100]" />
                  Print / Save Certificate PDF
                </button>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="text-center py-6 space-y-2 border-b border-slate-200">
              <span className="text-xs font-black uppercase tracking-widest text-[#005A36] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                First Aid Manual (11th Edition) Examination
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Certificate of Academic Achievement
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                This certifies that the candidate named below has completed the comprehensive 80-question theoretical examination under strict timed conditions.
              </p>
            </div>

            {/* Candidate Credentials Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 text-sm">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Candidate Name</div>
                <div className="font-black text-slate-900 text-base mt-0.5">{result.candidate.name}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Candidate Roll ID</div>
                <div className="font-mono font-bold text-slate-800 mt-0.5">{result.candidate.candidateId}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Completion Date</div>
                <div className="font-bold text-slate-800 mt-0.5">{result.completedAt}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 font-bold uppercase">Certificate Ref</div>
                <div className="font-mono text-xs font-black text-[#005A36] mt-0.5">{result.certificateId}</div>
              </div>
            </div>

            {/* Performance by Domain */}
            <div className="pt-2">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#005A36]" />
                Module Performance by First Aid Syllabus Section
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {result.categoryBreakdown.map((cat) => (
                  <div key={cat.category} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
                      <span className="truncate pr-2">{cat.category}</span>
                      <span className="font-mono font-black text-[#005A36]">{cat.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                      <div
                        className={`h-full ${
                          cat.percentage >= 80 ? 'bg-[#005A36]' : cat.percentage >= 50 ? 'bg-[#FFD100]' : 'bg-red-500'
                        }`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex justify-between font-medium">
                      <span>{cat.correct} / {cat.total} correct</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom decorative Battenburg stripe */}
            <BattenburgPattern className="h-2 -mb-6 -mx-6 sm:-mb-10 sm:-mx-10 mt-8" />
          </div>

          {/* Action Row for Retake and Candidate Switch */}
          <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-sm">
            <div className="text-xs text-slate-600 font-medium">
              Want to improve your score? Retaking shuffles all options fresh and restarts the 35:00 clock.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onRestart}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#005A36] hover:bg-[#00472a] text-white font-black text-sm border-2 border-[#FFD100] shadow-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-[#FFD100]" />
                Retake Assessment
              </button>
              <button
                type="button"
                onClick={onNewCandidate}
                className="px-4 py-3 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
              >
                Change Candidate
              </button>
            </div>
          </div>

          {/* Itemized 80-Question Audit Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#005A36]" />
                  Itemized 80-Question Syllabus Audit
                </h3>
                <p className="text-xs text-slate-500">
                  Detailed review comparing candidate selections with the verified First Aid Manual (11th Edition) references.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="no-print flex items-center gap-1.5 bg-white p-1 rounded-xl border-2 border-slate-300 shadow-xs text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    filterMode === 'all' ? 'bg-[#005A36] text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  All (80)
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('incorrect')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    filterMode === 'incorrect' ? 'bg-red-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Incorrect ({incorrectCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('correct')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    filterMode === 'correct' ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Correct ({result.score})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('flagged')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    filterMode === 'flagged' ? 'bg-[#FFD100] text-black font-black' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Flagged ({flaggedCount})
                </button>
              </div>
            </div>

            {/* List of Questions */}
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <div className="bg-white rounded-xl p-8 text-center text-slate-500 border border-slate-200">
                  No questions match the "{filterMode}" filter.
                </div>
              ) : (
                filteredQuestions.map((q) => {
                  const qOriginalIndex = questions.findIndex((orig) => orig.id === q.id);
                  const userAns = userAnswers[qOriginalIndex];
                  const isCorrect = userAns !== undefined && userAns === q.correctIndex;
                  const isFlagged = flaggedQuestions.includes(qOriginalIndex);

                  return (
                    <div
                      key={q.id}
                      className={`bg-white rounded-xl border-2 p-5 sm:p-6 transition-all ${
                        isCorrect ? 'border-emerald-300 bg-emerald-50/20' : 'border-red-300 bg-red-50/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-black ${
                              isCorrect ? 'bg-[#005A36] text-[#FFD100]' : 'bg-red-600 text-white'
                            }`}
                          >
                            {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                            Question {q.id}
                          </span>
                          <span className="text-xs bg-black text-[#FFD100] px-2 py-0.5 rounded font-bold">
                            {q.category}
                          </span>
                          {q.citation && (
                            <span className="text-xs bg-[#005A36]/10 text-[#005A36] px-2 py-0.5 rounded font-bold font-mono border border-[#005A36]/20">
                              Manual {q.citation}
                            </span>
                          )}
                        </div>

                        {isFlagged && (
                          <span className="inline-flex items-center gap-1 text-xs text-black bg-[#FFD100] px-2 py-0.5 rounded font-black border border-black">
                            <Bookmark className="w-3.5 h-3.5" /> Flagged
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 text-base mb-4 leading-snug">
                        {q.q}
                      </h4>

                      {/* Options audit */}
                      <div className="space-y-2">
                        {q.options.map((optText, optIdx) => {
                          const isUserChoice = userAns === optIdx;
                          const isTheCorrectOption = q.correctIndex === optIdx;

                          let optCardClass = 'border-slate-200 bg-slate-50/50 text-slate-700';
                          if (isTheCorrectOption) {
                            optCardClass = 'border-[#005A36] bg-emerald-100 text-emerald-950 font-bold ring-2 ring-[#005A36]';
                          } else if (isUserChoice && !isTheCorrectOption) {
                            optCardClass = 'border-red-500 bg-red-100 text-red-950 font-bold ring-2 ring-red-400';
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-lg border-2 text-sm flex items-start sm:items-center justify-between gap-3 ${optCardClass}`}
                            >
                              <div className="flex items-start sm:items-center gap-2.5">
                                <span className="w-6 h-6 rounded-full bg-white border border-slate-400 flex items-center justify-center font-mono text-xs font-black shrink-0">
                                  {optionLetters[optIdx]}
                                </span>
                                <span>{optText}</span>
                              </div>

                              <div className="shrink-0 flex items-center gap-1.5 text-xs font-black">
                                {isTheCorrectOption && (
                                  <span className="text-white bg-[#005A36] px-2.5 py-0.5 rounded flex items-center gap-1 border border-[#FFD100]">
                                    <Check className="w-3.5 h-3.5 text-[#FFD100]" /> Correct Answer
                                  </span>
                                )}
                                {isUserChoice && !isTheCorrectOption && (
                                  <span className="text-white bg-red-600 px-2.5 py-0.5 rounded flex items-center gap-1">
                                    <X className="w-3.5 h-3.5" /> Your Choice
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {userAns === undefined && (
                        <div className="mt-3 text-xs text-amber-900 font-bold bg-amber-100 p-2 rounded-lg border border-amber-300">
                          Question not answered by candidate.
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Bottom Retake Button */}
          <div className="no-print pt-6 pb-12 text-center">
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#005A36] hover:bg-[#00472a] text-white font-black rounded-xl border-2 border-[#FFD100] shadow-md transition-all cursor-pointer text-base"
            >
              <RotateCcw className="w-5 h-5 text-[#FFD100]" />
              Retake Full Assessment (Fresh Shuffle)
            </button>
          </div>
        </div>
      </div>

      {/* Bottom High-Vis Battenburg Stripe */}
      <BattenburgPattern className="h-2.5 no-print" />
    </div>
  );
};
