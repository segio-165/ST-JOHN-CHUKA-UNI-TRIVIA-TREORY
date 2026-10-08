import React, { useState } from 'react';
import { CandidateInfo, SavedAssessmentState } from '../types';
import { StJohnLogo, BattenburgPattern } from './StJohnLogo';
import {
  Clock,
  Award,
  BookOpen,
  AlertCircle,
  Play,
  RotateCcw,
  User,
  CheckCircle2,
  ChevronRight,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react';
import { formatMinutesSeconds, generateCandidateId } from '../utils/quizUtils';

interface CandidateLoginProps {
  onStart: (candidate: CandidateInfo) => void;
  savedState: SavedAssessmentState | null;
  onResume: () => void;
  onClearSaved: () => void;
}

export const CandidateLogin: React.FC<CandidateLoginProps> = ({
  onStart,
  savedState,
  onResume,
  onClearSaved,
}) => {
  const [name, setName] = useState('');
  const [candidateId, setCandidateId] = useState(() => generateCandidateId());
  const [accessCode, setAccessCode] = useState('STJOHN-11TH');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your candidate name to enter the examination.');
      return;
    }
    setError(null);
    onStart({
      name: name.trim(),
      candidateId: candidateId.trim() || generateCandidateId(),
      accessCode: accessCode.trim()
    });
  };

  const handleDemoFill = () => {
    setName('First Responder Sarah Davies');
    setCandidateId(generateCandidateId());
    setAccessCode('STJOHN-11TH');
    setError(null);
  };

  const answeredCount = savedState ? Object.keys(savedState.userAnswers).length : 0;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between">
      {/* Top High-Vis Battenburg Stripe */}
      <BattenburgPattern className="h-3" />

      {/* Main Login Container */}
      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full space-y-6">

          {/* St John Ambulance Brand Header */}
          <div className="bg-black/95 text-white p-6 sm:p-8 rounded-2xl border-2 border-[#005A36] shadow-xl relative overflow-hidden">
            {/* Ambient Green & Yellow Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#005A36]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#FFD100]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
              <div className="space-y-3">
                <StJohnLogo size="lg" invertText={true} />
                <p className="text-slate-300 text-sm max-w-lg leading-relaxed pt-1">
                  Official candidate examination portal based strictly on the <strong className="text-white">First Aid Manual (11th Edition)</strong>, authorized training standard of St John Ambulance, St Andrew's First Aid, and the British Red Cross.
                </p>
              </div>

              {/* Verified Badge */}
              <div className="bg-[#005A36]/80 border-2 border-[#FFD100] px-4 py-3 rounded-xl text-center shrink-0 shadow-md">
                <div className="text-[11px] uppercase tracking-wider text-[#FFD100] font-black">
                  Accredited Module
                </div>
                <div className="text-lg font-extrabold text-white">
                  80 Questions
                </div>
                <div className="text-xs text-emerald-200 font-semibold flex items-center justify-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFD100]" />
                  Standard Syllabus
                </div>
              </div>
            </div>
          </div>

          {/* Active Session Resumption Card */}
          {savedState && (
            <div className="bg-amber-950/90 border-2 border-[#FFD100] rounded-2xl p-5 shadow-lg text-amber-100 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[#FFD100] font-bold text-base">
                    <RotateCcw className="w-5 h-5 text-[#FFD100] animate-spin-slow" />
                    Active Attempt Session in Progress
                  </div>
                  <p className="text-amber-200 text-sm">
                    Candidate: <strong className="text-white underline">{savedState.candidate.name}</strong> ({savedState.candidate.candidateId})
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                    <span className="bg-black/50 text-[#FFD100] px-2.5 py-1 rounded-md font-mono font-bold border border-[#FFD100]/40">
                      {answeredCount} / 80 Questions Saved
                    </span>
                    <span className="bg-black/50 text-white px-2.5 py-1 rounded-md font-mono font-bold border border-slate-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FFD100]" />
                      {formatMinutesSeconds(savedState.timeLeft)} Time Remaining
                    </span>
                    <span className="text-amber-300">
                      Currently at Question #{savedState.currentQuestion + 1}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onResume}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FFD100] hover:bg-yellow-400 text-black font-extrabold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    Resume Attempt
                  </button>
                  <button
                    type="button"
                    onClick={onClearSaved}
                    title="Discard saved progress and start new"
                    className="px-3.5 py-2.5 bg-black/60 hover:bg-black text-amber-200 text-xs font-semibold rounded-xl border border-amber-600/50 transition-colors cursor-pointer"
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Exam Requirements & Spec Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-[#FFD100] text-black font-black flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Attempt Timer</div>
                <div className="text-base font-extrabold text-white">35 Minutes Strict</div>
              </div>
            </div>

            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-[#005A36] text-white border border-[#FFD100]/40 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-[#FFD100]" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Question Bank</div>
                <div className="text-base font-extrabold text-white">Full 80 Questions</div>
              </div>
            </div>

            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 shadow-sm flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-black text-[#FFD100] border-2 border-[#FFD100] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Pass Standard</div>
                <div className="text-base font-extrabold text-[#FFD100]">80% (64/80 Correct)</div>
              </div>
            </div>
          </div>

          {/* Candidate Registration Card */}
          <div className="bg-white rounded-2xl shadow-2xl border-4 border-[#005A36] overflow-hidden">
            {/* Header Stripe in St John Green & Black */}
            <div className="px-6 py-4 bg-[#005A36] text-white flex justify-between items-center border-b-2 border-[#FFD100]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FFD100]" />
                <div>
                  <h2 className="text-base sm:text-lg font-black uppercase tracking-wide flex items-center gap-2 text-white">
                    <User className="w-5 h-5 text-[#FFD100]" />
                    Candidate Verification Sign-In
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-xs bg-black/60 hover:bg-black text-[#FFD100] font-bold px-3 py-1.5 rounded-lg border border-[#FFD100]/60 transition-colors cursor-pointer"
              >
                Auto-Fill Sample
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 bg-white text-slate-900">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border-2 border-red-500 text-red-900 text-sm flex items-center gap-2 font-medium">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-900 mb-1">
                    Full Candidate / Responders Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Responder John Miller"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#005A36] focus:ring-2 focus:ring-[#005A36]/30 text-slate-900 text-base font-medium placeholder:text-slate-400"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Used for validating your final St John Ambulance Assessment Record and Certificate.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="candidateId" className="block text-sm font-bold text-slate-900 mb-1">
                      Candidate Roll / Cadet ID
                    </label>
                    <input
                      id="candidateId"
                      type="text"
                      value={candidateId}
                      onChange={(e) => setCandidateId(e.target.value)}
                      placeholder="FA-2026-XXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#005A36] focus:ring-2 focus:ring-[#005A36]/30 text-slate-900 text-sm font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label htmlFor="accessCode" className="block text-sm font-bold text-slate-900 mb-1">
                      Session Passcode / Key
                    </label>
                    <input
                      id="accessCode"
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="STJOHN-11TH"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:outline-none focus:border-[#005A36] focus:ring-2 focus:ring-[#005A36]/30 text-slate-900 text-sm font-mono font-bold uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Examination Regulations */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900 flex items-center gap-1.5 text-sm mb-1">
                  <BookOpen className="w-4 h-4 text-[#005A36]" />
                  Examination Protocol & Assessment Rules:
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#005A36] font-bold shrink-0 mt-0.5" />
                  <span><strong>35-Minute Strict Clock:</strong> Continuous countdown starts upon launch. All answers auto-submit at 00:00.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#005A36] font-bold shrink-0 mt-0.5" />
                  <span><strong>Anti-Prediction Scramble:</strong> Correct answer positions (A, B, C, D) are randomly distributed on each attempt.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#005A36] font-bold shrink-0 mt-0.5" />
                  <span><strong>Full 80-Question Review:</strong> After submission, view an itemized breakdown with First Aid 11th Edition citations.</span>
                </div>
              </div>

              {/* Start Button in St John Ambulance Green & Yellow */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#005A36] hover:bg-[#00472a] active:bg-[#003d24] text-white font-black text-lg border-2 border-[#FFD100] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Launch 35-Minute Assessment</span>
                <div className="w-7 h-7 rounded-full bg-[#FFD100] text-black flex items-center justify-center font-bold group-hover:translate-x-1 transition-transform">
                  <ChevronRight className="w-5 h-5 text-black" />
                </div>
              </button>
            </form>
          </div>

          {/* Footer Note */}
          <div className="text-center text-xs text-slate-400 space-y-1">
            <p>St John Ambulance Training & Certification Syllabus • First Aid Manual 11th Edition</p>
            <p className="text-slate-500">Fully client-side assessment engine • Netlify & static web ready</p>
          </div>
        </div>
      </div>

      {/* Bottom High-Vis Battenburg Stripe */}
      <BattenburgPattern className="h-3" />
    </div>
  );
};
