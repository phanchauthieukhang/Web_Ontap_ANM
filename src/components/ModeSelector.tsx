import React, { useRef } from 'react';
import { QuizMode } from '../types/quiz';
import { TOPICS } from '../data/topics';
import { TopologyType } from './CyberCanvas3D';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ListOrdered,
  Shuffle,
  FolderTree,
  AlertTriangle,
  Bookmark,
  Timer,
  ChevronRight,
  ShieldCheck,
  KeyRound,
  AlertOctagon
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

interface ModeSelectorProps {
  onStartMode: (mode: QuizMode, topicId?: string, examConfig?: { questionCount: number; timeMinutes: number }) => void;
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

  // 3D Tilt + Spotlight mouse effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rotateY = ((x / rect.width) - 0.5) * 9;
      const rotateX = (0.5 - (y / rect.height)) * 9;
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
    <div ref={containerRef} className="space-y-6">
      {/* 6 Primary Modes Grid */}
      <div>
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 text-xs sm:text-sm">
          Chọn chế độ học tập
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* 1. Sequential Mode */}
          <button
            onClick={() => onStartMode('sequential')}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => onHoverTopic?.('governance')}
            className="spatial-glass spotlight-card group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 p-5 text-left hover:border-emerald-500/80 dark:border-white/15 dark:hover:border-emerald-500/60 transition-colors overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mb-3.5 group-hover:scale-105 transition-transform">
                <ListOrdered className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                Làm tuần tự 1 → 70
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Ôn luyện theo đúng thứ tự câu và hệ thống hóa từ Câu 1 đến Câu 70 của ngân hàng đề.
              </p>
            </div>
            <div className="relative z-10 mt-4 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Bắt đầu ngay <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 2. Random Mode */}
          <button
            onClick={() => onStartMode('random')}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => onHoverTopic?.('cryptography')}
            className="spatial-glass spotlight-card group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 p-5 text-left hover:border-sky-500/80 dark:border-white/15 dark:hover:border-sky-500/60 transition-colors overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 mb-3.5 group-hover:scale-105 transition-transform">
                <Shuffle className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                Luyện ngẫu nhiên
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Xáo trộn thứ tự câu hỏi và phương án ngẫu nhiên, giúp kiểm tra phản xạ kiến thức toàn diện.
              </p>
            </div>
            <div className="relative z-10 mt-4 flex items-center text-xs font-semibold text-sky-600 dark:text-sky-400">
              Bắt đầu ngay <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* 3. Incorrect Review */}
          <button
            onClick={() => onStartMode('incorrect')}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => onHoverTopic?.('threats')}
            disabled={incorrectCount === 0}
            className={`spatial-glass spotlight-card group relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-colors overflow-hidden ${
              incorrectCount > 0
                ? 'border-rose-200/80 hover:border-rose-500 dark:border-rose-950/60 dark:hover:border-rose-500/60'
                : 'border-slate-200/60 opacity-60 cursor-not-allowed dark:border-white/5'
            }`}
          >
            <div className="relative z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 mb-3.5 group-hover:scale-105 transition-transform">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  Ôn câu làm sai
                </h3>
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-400 font-mono">
                  {incorrectCount} câu
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Làm lại các câu bạn đã từng chọn sai cho đến khi nắm vững bản chất học thuật.
              </p>
            </div>
            <div className="relative z-10 mt-4 flex items-center text-xs font-semibold text-rose-600 dark:text-rose-400">
              {incorrectCount > 0 ? 'Khắc phục lỗi sai' : 'Chưa có câu sai'}
              {incorrectCount > 0 && <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />}
            </div>
          </button>

          {/* 4. Bookmarked Review */}
          <button
            onClick={() => onStartMode('bookmarked')}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            disabled={bookmarkedCount === 0}
            className={`spatial-glass spotlight-card group relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-colors overflow-hidden ${
              bookmarkedCount > 0
                ? 'border-amber-200/80 hover:border-amber-500 dark:border-amber-950/60 dark:hover:border-amber-500/60'
                : 'border-slate-200/60 opacity-60 cursor-not-allowed dark:border-white/5'
            }`}
          >
            <div className="relative z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 mb-3.5 group-hover:scale-105 transition-transform">
                <Bookmark className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  Câu hỏi đánh dấu
                </h3>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-400 font-mono">
                  {bookmarkedCount} câu
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                Xem lại tập hợp các câu hỏi quan trọng, bẫy trắc nghiệm bạn đã chủ động đánh dấu lưu lại.
              </p>
            </div>
            <div className="relative z-10 mt-4 flex items-center text-xs font-semibold text-amber-600 dark:text-amber-400">
              {bookmarkedCount > 0 ? 'Xem danh sách' : 'Chưa đánh dấu câu nào'}
              {bookmarkedCount > 0 && <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />}
            </div>
          </button>

          {/* 5. Exam Simulation */}
          <button
            onClick={() => onStartMode('exam', undefined, { questionCount: 40, timeMinutes: 30 })}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="spatial-glass spotlight-card group relative flex flex-col justify-between rounded-2xl border border-purple-200/80 p-5 text-left hover:border-purple-500 dark:border-purple-950/60 dark:hover:border-purple-500/60 transition-colors sm:col-span-2 lg:col-span-2 overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 mb-3.5 group-hover:scale-105 transition-transform">
                <Timer className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  Thi thử mô phỏng (40 câu / 30 phút)
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-mono">
                  Áp lực phòng thi thật
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Trích ngẫu nhiên 40 câu, đếm ngược thời gian thực, KHÔNG hiển thị đáp án khi làm bài, tự động nộp bài khi hết giờ và phân tích chi tiết.
              </p>
            </div>
            <div className="relative z-10 mt-4 flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400">
              Vào phòng thi <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Topics Selection Grid */}
      <div>
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 text-xs sm:text-sm flex items-center gap-2">
          <FolderTree className="h-4 w-4" />
          Luyện tập theo 3 Chủ đề chính
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {TOPICS.map((topic) => {
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

            return (
              <button
                key={topic.id}
                onClick={() => onStartMode('topic', topic.id)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={() => onHoverTopic?.(topoType)}
                className="spatial-glass spotlight-card group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 p-5 text-left hover:border-emerald-500 dark:border-white/15 dark:hover:border-emerald-500/60 transition-colors overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 dark:group-hover:bg-emerald-950/60 dark:group-hover:text-emerald-400 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                      {topic.questionCount} câu
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
                <div className="relative z-10 mt-4 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Luyện chủ đề này <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
