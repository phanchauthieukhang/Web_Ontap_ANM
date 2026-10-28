import React, { useRef } from 'react';
import { QuizMode } from '../types/quiz';
import { TOPICS } from '../data/topics';
import { TopologyType } from './CyberCanvas3D';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ListOrdered,
  Shuffle,
  AlertTriangle,
  Bookmark,
  Timer,
  ArrowUpRight,
  ShieldCheck,
  KeyRound,
  AlertOctagon,
  Orbit,
  Cpu,
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

interface ModeSelectorProps {
  onStartMode: (
    mode: QuizMode,
    topicId?: string,
    examConfig?: { questionCount: number; timeMinutes: number }
  ) => void;
  incorrectCount: number;
  bookmarkedCount: number;
  onHoverTopic?: (topology: TopologyType) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  onStartMode,
  incorrectCount,
  bookmarkedCount,
  onHoverTopic,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Perspective Tilt + Spotlight cursor tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = (0.5 - (y / rect.height)) * 10;
      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 950,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: 'power3.out',
    });
  };

  return (
    <div ref={containerRef} className="space-y-8">
      {/* =========================================================
          1. ORBITAL TOPIC NODES (3 Interactive 3D-Morphing Stations)
          ========================================================= */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <Orbit className="h-4 w-4 animate-spin" style={{ animationDuration: '12s' }} />
            01 // Trạm Chủ Đề Không Gian (Hover để biến hình Lõi 3D)
          </h2>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
            3 Phân khu kiến thức trọng tâm
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TOPICS.map((topic, index) => {
            const Icon =
              topic.id === 'topic-governance-iso'
                ? ShieldCheck
                : topic.id === 'topic-cryptography'
                ? KeyRound
                : AlertOctagon;

            const topoType: TopologyType =
              topic.id === 'topic-governance-iso'
                ? 'governance'
                : topic.id === 'topic-cryptography'
                ? 'cryptography'
                : 'threats';

            const accentBorder =
              index === 0
                ? 'hover:border-emerald-400/70'
                : index === 1
                ? 'hover:border-sky-400/70'
                : 'hover:border-amber-400/70';

            const badgeColor =
              index === 0
                ? 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/30'
                : index === 1
                ? 'text-sky-600 dark:text-sky-300 bg-sky-500/15 border-sky-500/30'
                : 'text-amber-600 dark:text-amber-300 bg-amber-500/15 border-amber-500/30';

            return (
              <button
                key={topic.id}
                onClick={() => onStartMode('topic', topic.id)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => onHoverTopic?.(topoType)}
                className={`crystal-pod spotlight-card hud-corners group relative flex flex-col justify-between rounded-3xl border border-slate-200/70 dark:border-white/15 p-5 text-left transition-colors ${accentBorder}`}
              >
                <div className="relative z-10">
                  {/* Top Telemetry Strip */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-bold border ${badgeColor}`}>
                      <Icon className="h-3.5 w-3.5" />
                      NODE 0{index + 1}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 bg-white/40 dark:bg-white/5 px-2.5 py-0.5 rounded-lg border border-slate-200/60 dark:border-white/10">
                      {topic.questionCount} CÂU
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-snug group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300/80 mt-2 line-clamp-2 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                <div className="relative z-10 mt-5 pt-3 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
                  <span>KÍCH HOẠT MÔ-ĐUN</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/60 dark:bg-white/10 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          2. TACTICAL COMMAND DOCK (Asymmetric Launch Portals + Capsules)
          ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            02 // Bàn Điều Khiển Chiến Thuật (Tactical Command Dock)
          </h2>
        </div>

        {/* Row A: 2 Asymmetric Primary Launch Portals (7 cols + 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Portal 1: Sequential Full 70 Campaign */}
          <button
            onClick={() => onStartMode('sequential')}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => onHoverTopic?.('governance')}
            className="spatial-glass spotlight-card hud-corners lg:col-span-7 group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-emerald-500/35 hover:border-emerald-400 p-6 text-left transition-colors overflow-hidden"
          >
            {/* Background Watermark */}
            <span className="pointer-events-none select-none absolute -right-3 -bottom-5 text-7xl sm:text-8xl font-black font-mono text-emerald-500/[0.07] dark:text-emerald-400/[0.08]">
              01→70
            </span>

            <div className="relative z-10 space-y-2 max-w-md">
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                <ListOrdered className="h-3.5 w-3.5" />
                PORTAL ALPHA // FULL CAMPAIGN
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Làm Tuần Tự Trọn Bộ 1 → 70
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300/90 leading-relaxed">
                Lộ trình chuẩn hóa xuyên suốt 70 câu hỏi theo đúng thứ tự ngân hàng đề, tích hợp giải thích học thuật và phòng thí nghiệm mật mã trực tiếp.
              </p>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <span className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 group-hover:bg-emerald-400 transition">
                Vào Lộ Trình
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </button>

          {/* Portal 2: Exam Simulation (40 Qs / 30 Mins) */}
          <button
            onClick={() => onStartMode('exam', undefined, { questionCount: 40, timeMinutes: 30 })}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => onHoverTopic?.('cryptography')}
            className="spatial-glass spotlight-card hud-corners lg:col-span-5 group relative flex flex-col justify-between rounded-3xl border border-purple-500/35 hover:border-purple-400 p-6 text-left transition-colors overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/15 px-2.5 py-1 text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 border border-purple-500/30">
                <Timer className="h-3.5 w-3.5" />
                PORTAL OMEGA // EXAM
              </span>
              <span className="font-mono text-sm font-black text-purple-600 dark:text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-lg border border-purple-500/25">
                30:00
              </span>
            </div>

            <div className="relative z-10 my-1">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors">
                Thi Thử Mô Phỏng (40 Câu)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300/85 mt-1 leading-relaxed">
                Đảo ngẫu nhiên câu & đáp án, khóa gợi ý trong lúc làm, tự động chấm điểm khi hết giờ.
              </p>
            </div>

            <div className="relative z-10 mt-3 flex items-center justify-between text-xs font-mono font-bold text-purple-600 dark:text-purple-300">
              <span>BẮT ĐẦU BẤM GIỜ</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Row B: 3 Floating Telemetry Capsules (Compact Horizontal Pods) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Capsule 1: Random Reflex */}
          <button
            onClick={() => onStartMode('random')}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => onHoverTopic?.('cryptography')}
            className="crystal-pod spotlight-card group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/70 dark:border-white/15 hover:border-sky-400/70 p-4 text-left transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                <Shuffle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-sky-400 transition-colors">
                  Phản Xạ Ngẫu Nhiên
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Trộn 70 câu & đảo vị trí A/B/C/D
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-xl border border-sky-500/20">
              MIX
            </span>
          </button>

          {/* Capsule 2: Incorrect Recovery */}
          <button
            onClick={() => onStartMode('incorrect')}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => onHoverTopic?.('threats')}
            disabled={incorrectCount === 0}
            className={`crystal-pod spotlight-card group flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-colors ${
              incorrectCount > 0
                ? 'border-rose-500/35 hover:border-rose-400'
                : 'border-slate-200/50 dark:border-white/5 opacity-55 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-rose-400 transition-colors">
                  Khắc Phục Câu Sai
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {incorrectCount > 0 ? 'Xoáy sâu các câu từng chọn nhầm' : 'Hiện chưa có câu làm sai'}
                </p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-rose-600 dark:text-rose-300 bg-rose-500/15 px-3 py-1 rounded-xl border border-rose-500/30">
              {incorrectCount}
            </span>
          </button>

          {/* Capsule 3: Bookmarked Vault */}
          <button
            onClick={() => onStartMode('bookmarked')}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            disabled={bookmarkedCount === 0}
            className={`crystal-pod spotlight-card group flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-colors ${
              bookmarkedCount > 0
                ? 'border-amber-500/35 hover:border-amber-400'
                : 'border-slate-200/50 dark:border-white/5 opacity-55 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                <Bookmark className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber-400 transition-colors">
                  Kho Câu Đánh Dấu
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {bookmarkedCount > 0 ? 'Ôn các câu trọng tâm đã lưu' : 'Bấm Lưu câu khi làm bài'}
                </p>
              </div>
            </div>
            <span className="font-mono text-sm font-black text-amber-600 dark:text-amber-300 bg-amber-500/15 px-3 py-1 rounded-xl border border-amber-500/30">
              {bookmarkedCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
