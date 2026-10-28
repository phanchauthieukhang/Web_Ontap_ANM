import React, { useState } from 'react';
import { UserProgressStore, QuizMode } from '../types/quiz';
import { ModeSelector } from '../components/ModeSelector';
import { TopologyType } from '../components/CyberCanvas3D';
import { CipherText } from '../components/CipherText';
import {
  ShieldCheck,
  BookOpen,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Activity,
} from 'lucide-react';

interface HomePageProps {
  progressStore: UserProgressStore;
  onStartMode: (
    mode: QuizMode,
    topicId?: string,
    examConfig?: { questionCount: number; timeMinutes: number }
  ) => void;
  onOpenLibrary: () => void;
  onOpenCommandPalette: () => void;
  activeTopology?: TopologyType;
  onChangeTopology?: (topo: TopologyType) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  progressStore,
  onStartMode,
  onOpenLibrary,
  activeTopology: externalTopology,
  onChangeTopology,
}) => {
  const [localTopology, setLocalTopology] = useState<TopologyType>('cryptography');
  const activeTopology = externalTopology ?? localTopology;
  const handleTopologyChange = (topo: TopologyType) => {
    setLocalTopology(topo);
    onChangeTopology?.(topo);
  };

  // Compute live telemetry metrics
  const totalQuestions = 70;
  const answeredIds = Object.keys(progressStore.questionStats).map(Number);
  const totalAnswered = answeredIds.length;
  const incorrectCount = progressStore.incorrectQuestionIds.length;
  const bookmarkedCount = progressStore.bookmarkedQuestionIds.length;

  const totalAttempts = Object.values(progressStore.questionStats).reduce(
    (acc, curr) => acc + curr.timesAnswered,
    0
  );
  const totalCorrectAttempts = Object.values(progressStore.questionStats).reduce(
    (acc, curr) => acc + curr.timesCorrect,
    0
  );
  const accuracyRate =
    totalAttempts > 0 ? Math.round((totalCorrectAttempts / totalAttempts) * 100) : 0;
  const completionPct = Math.round((totalAnswered / totalQuestions) * 100);

  // SVG Ring calculation
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPct / 100) * circumference;

  return (
    <div className="space-y-8 pb-16">
      {/* Open Spatial Command Stage (No opaque box blocking the 3D Core) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
        {/* Left: Floating Hologram Identity & Topology Controller */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <CipherText text="CYBERSECURITY // SPATIAL 3D COMMAND DECK" duration={0.4} />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12] drop-shadow-sm">
            Không gian Ôn tập{' '}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 bg-clip-text text-transparent">
              An toàn Thông tin
            </span>
          </h1>

          <p className="max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-300/90 leading-relaxed">
            Làm chủ 70 câu hỏi chuẩn hóa cùng phòng thí nghiệm mật mã tương tác 3D. Di chuột hoặc chọn cấu trúc bên dưới để biến đổi Lõi Mật Mã không gian theo thời gian thực.
          </p>

          {/* Primary Quick Launch & Topology Matrix Switcher */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onStartMode('sequential')}
              className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/25 hover:scale-[1.02]"
            >
              <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
              Bắt đầu Chiến dịch 70 Câu
            </button>
            <button
              onClick={onOpenLibrary}
              className="spatial-glass flex items-center gap-2 rounded-2xl border border-slate-300/80 dark:border-white/15 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-white hover:border-emerald-500/50 transition"
            >
              <BookOpen className="h-4 w-4 text-emerald-500" />
              Bảng đối sánh & Cảnh báo
            </button>
          </div>

          {/* Floating 3D Topology Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono text-[11px] mr-1">
              <Layers className="h-3.5 w-3.5 text-emerald-500" /> Lõi 3D:
            </span>
            <button
              onClick={() => handleTopologyChange('cryptography')}
              className={`px-3 py-1 rounded-full font-mono text-[11px] backdrop-blur-md transition border ${
                activeTopology === 'cryptography'
                  ? 'bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-500/50 shadow-sm shadow-sky-500/20'
                  : 'bg-white/30 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-300/50 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              01 // Khối Đa Diện Mật Mã
            </button>
            <button
              onClick={() => handleTopologyChange('governance')}
              className={`px-3 py-1 rounded-full font-mono text-[11px] backdrop-blur-md transition border ${
                activeTopology === 'governance'
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/20'
                  : 'bg-white/30 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-300/50 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              02 // Vòng Khiên ISO 27000
            </button>
            <button
              onClick={() => handleTopologyChange('threats')}
              className={`px-3 py-1 rounded-full font-mono text-[11px] backdrop-blur-md transition border ${
                activeTopology === 'threats'
                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                  : 'bg-white/30 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-300/50 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              03 // Vòm Radar Phòng Vệ
            </button>
          </div>
        </div>

        {/* Right: Floating Holographic Telemetry HUD (Ultra-transparent so 3D Core shines through) */}
        <div className="lg:col-span-5">
          <div className="spatial-glass hud-corners rounded-3xl border border-slate-200/70 dark:border-white/15 p-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-white/10">
              <div className="flex items-center gap-3">
                {/* SVG Radial Mastery Ring */}
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <svg className="h-16 w-16 -rotate-90 transform" viewBox="0 0 68 68">
                    <circle
                      cx="34"
                      cy="34"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="transparent"
                      className="text-slate-200/70 dark:text-white/10"
                    />
                    <circle
                      cx="34"
                      cy="34"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="text-emerald-500 transition-all duration-700"
                    />
                  </svg>
                  <span className="absolute text-xs font-mono font-bold text-slate-900 dark:text-white">
                    {completionPct}%
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold block">
                    TELEMETRY // TIẾN ĐỘ
                  </span>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {totalAnswered} / {totalQuestions} câu đã chinh phục
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Lưu tự động Offline trên trình duyệt
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Micro Telemetry Pills */}
            <div className="grid grid-cols-3 gap-2.5 pt-4">
              <div className="crystal-pod rounded-2xl border border-slate-200/60 dark:border-white/10 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-sky-600 dark:text-sky-400 font-semibold">
                  <Activity className="h-3.5 w-3.5" /> Chính xác
                </div>
                <div className="mt-1 text-lg font-black font-mono text-slate-900 dark:text-white">
                  {accuracyRate}%
                </div>
              </div>

              <div className="crystal-pod rounded-2xl border border-rose-500/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                  <AlertCircle className="h-3.5 w-3.5" /> Câu sai
                </div>
                <div className="mt-1 text-lg font-black font-mono text-rose-600 dark:text-rose-400">
                  {incorrectCount}
                </div>
              </div>

              <div className="crystal-pod rounded-2xl border border-amber-500/20 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                  <Bookmark className="h-3.5 w-3.5" /> Đã lưu
                </div>
                <div className="mt-1 text-lg font-black font-mono text-amber-600 dark:text-amber-400">
                  {bookmarkedCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Tactical Command Dock & Orbital Topic Nodes */}
      <ModeSelector
        onStartMode={onStartMode}
        incorrectCount={incorrectCount}
        bookmarkedCount={bookmarkedCount}
        onHoverTopic={(topo) => handleTopologyChange(topo)}
      />
    </div>
  );
};
