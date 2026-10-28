import React, { useState } from 'react';
import { UserProgressStore, QuizMode } from '../types/quiz';
import { ModeSelector } from '../components/ModeSelector';
import { ProgressOverview } from '../components/ProgressOverview';
import { CyberCanvas3D, TopologyType } from '../components/CyberCanvas3D';
import { CipherText } from '../components/CipherText';
import { ShieldCheck, BookOpen, Sparkles, Layers } from 'lucide-react';

interface HomePageProps {
  progressStore: UserProgressStore;
  onStartMode: (mode: QuizMode, topicId?: string, examConfig?: { questionCount: number; timeMinutes: number }) => void;
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

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner with 3D Cyber Shield Visual */}
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-[#0b0d14]/85 to-slate-950/90 backdrop-blur-2xl p-6 sm:p-10 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-4 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <CipherText text="AN TOÀN THÔNG TIN // SPATIAL 3D EDITION" duration={0.4} />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Nền tảng Ôn tập Trắc nghiệm An toàn thông tin
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Hệ thống hóa toàn bộ 70 câu hỏi chuẩn hóa, giải thích có căn cứ học thuật, mô phỏng mật mã tương tác 3D và 6 chế độ luyện tập thông minh.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onStartMode('sequential')}
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition shadow-lg shadow-emerald-500/25 hover:scale-[1.02]"
            >
              <ShieldCheck className="h-4 w-4" />
              Làm trọn vẹn 70 câu
            </button>
            <button
              onClick={onOpenLibrary}
              className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition backdrop-blur-sm"
            >
              <BookOpen className="h-4 w-4 text-emerald-400" />
              Tra cứu bảng so sánh
            </button>
          </div>

          {/* Interactive Topology Switcher Pills */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
              <Layers className="h-3.5 w-3.5 text-emerald-400" /> Cấu trúc 3D:
            </span>
            <button
              onClick={() => handleTopologyChange('cryptography')}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition ${
                activeTopology === 'cryptography'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Khối Mật mã (Lattice)
            </button>
            <button
              onClick={() => handleTopologyChange('governance')}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition ${
                activeTopology === 'governance'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Vòng Khiên ISO 27000
            </button>
            <button
              onClick={() => handleTopologyChange('threats')}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition ${
                activeTopology === 'threats'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Mạng Tô-pô Radar
            </button>
          </div>
        </div>

        {/* 3D Canvas in Hero right area */}
        <CyberCanvas3D
          topology={activeTopology}
          className="absolute right-0 top-0 bottom-0 w-full sm:w-1/2 h-full opacity-75 sm:opacity-100"
        />
      </div>

      {/* Progress Overview Section */}
      <ProgressOverview progressStore={progressStore} totalQuestions={70} />

      {/* Mode & Topic Selector Section */}
      <ModeSelector
        onStartMode={onStartMode}
        incorrectCount={progressStore.incorrectQuestionIds.length}
        bookmarkedCount={progressStore.bookmarkedQuestionIds.length}
        onHoverTopic={(topo) => handleTopologyChange(topo)}
      />
    </div>
  );
};
