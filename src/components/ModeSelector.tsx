import React from 'react';
import { QuizMode } from '../types/quiz';
import { TOPICS } from '../data/topics';
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

interface ModeSelectorProps {
  onStartMode: (mode: QuizMode, topicId?: string, examConfig?: { questionCount: number; timeMinutes: number }) => void;
  incorrectCount: number;
  bookmarkedCount: number;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  onStartMode,
  incorrectCount,
  bookmarkedCount,
}) => {
  return (
    <div className="space-y-6">
      {/* 6 Primary Modes Grid */}
      <div>
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 text-xs sm:text-sm">
          Chọn chế độ học tập
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* 1. Sequential Mode */}
          <button
            onClick={() => onStartMode('sequential')}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-emerald-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500 transition-all"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                <ListOrdered className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                Làm tuần tự 1 → 70
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Ôn luyện lần lượt theo đúng số thứ tự và mạch kiến thức từ Câu 1 đến Câu 70 của ngân hàng đề.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Bắt đầu ngay <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* 2. Random Mode */}
          <button
            onClick={() => onStartMode('random')}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-sky-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-500 transition-all"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 mb-3 group-hover:scale-105 transition-transform">
                <Shuffle className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                Luyện ngẫu nhiên
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Xáo trộn thứ tự câu hỏi và phương án ngẫu nhiên, giúp kiểm tra phản xạ kiến thức toàn diện.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-sky-600 dark:text-sky-400">
              Bắt đầu ngay <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* 3. Incorrect Review */}
          <button
            onClick={() => onStartMode('incorrect')}
            disabled={incorrectCount === 0}
            className={`group flex flex-col justify-between rounded-xl border p-4 text-left shadow-sm transition-all ${
              incorrectCount > 0
                ? 'border-rose-200 bg-white hover:border-rose-500 hover:shadow-md dark:border-rose-900/50 dark:bg-slate-900 dark:hover:border-rose-500'
                : 'border-slate-200 bg-slate-50/50 opacity-60 cursor-not-allowed dark:border-slate-800 dark:bg-slate-900/40'
            }`}
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 mb-3 group-hover:scale-105 transition-transform">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  Ôn câu làm sai
                </h3>
                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-400">
                  {incorrectCount} câu
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Làm lại các câu bạn đã từng chọn sai cho đến khi nắm vững bản chất học thuật.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-rose-600 dark:text-rose-400">
              {incorrectCount > 0 ? 'Khắc phục lỗi sai' : 'Chưa có câu sai'} 
              {incorrectCount > 0 && <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />}
            </div>
          </button>

          {/* 4. Bookmarked Review */}
          <button
            onClick={() => onStartMode('bookmarked')}
            disabled={bookmarkedCount === 0}
            className={`group flex flex-col justify-between rounded-xl border p-4 text-left shadow-sm transition-all ${
              bookmarkedCount > 0
                ? 'border-amber-200 bg-white hover:border-amber-500 hover:shadow-md dark:border-amber-900/50 dark:bg-slate-900 dark:hover:border-amber-500'
                : 'border-slate-200 bg-slate-50/50 opacity-60 cursor-not-allowed dark:border-slate-800 dark:bg-slate-900/40'
            }`}
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                <Bookmark className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  Câu hỏi đánh dấu
                </h3>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                  {bookmarkedCount} câu
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Xem lại tập hợp các câu hỏi quan trọng, bẫy trắc nghiệm bạn đã chủ động đánh dấu lưu lại.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-amber-600 dark:text-amber-400">
              {bookmarkedCount > 0 ? 'Xem danh sách' : 'Chưa đánh dấu câu nào'}
              {bookmarkedCount > 0 && <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />}
            </div>
          </button>

          {/* 5. Exam Simulation */}
          <button
            onClick={() => onStartMode('exam', undefined, { questionCount: 40, timeMinutes: 30 })}
            className="group flex flex-col justify-between rounded-xl border border-purple-200 bg-white p-4 text-left shadow-sm hover:border-purple-500 hover:shadow-md dark:border-purple-900/50 dark:bg-slate-900 dark:hover:border-purple-500 transition-all sm:col-span-2 lg:col-span-2"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 mb-3 group-hover:scale-105 transition-transform">
                <Timer className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                  Thi thử mô phỏng (40 câu / 30 phút)
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  Tính giờ thi thật
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Mô phỏng kỳ thi chính thức: Trích ngẫu nhiên 40 câu, có đồng hồ đếm ngược, KHÔNG hiển thị đáp án khi làm, nộp bài nhận bảng điểm và phân tích chi tiết.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400">
              Vào phòng thi <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Topics Selection Grid */}
      <div>
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 text-xs sm:text-sm flex items-center gap-2">
          <FolderTree className="h-4 w-4" />
          Luyện tập chuyên sâu theo 3 Chủ đề chính
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {TOPICS.map((topic) => {
            const Icon =
              topic.id === 'topic-governance-iso'
                ? ShieldCheck
                : topic.id === 'topic-cryptography'
                ? KeyRound
                : AlertOctagon;

            return (
              <button
                key={topic.id}
                onClick={() => onStartMode('topic', topic.id)}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-emerald-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 dark:group-hover:bg-emerald-950/60 dark:group-hover:text-emerald-400 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                      {topic.questionCount} câu
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-3">
                    {topic.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Luyện chủ đề này <ChevronRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
