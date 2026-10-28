import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types/quiz';
import questionsRaw from '../data/questions.json';
import { Search, Hash, ArrowRight, ShieldCheck, Timer, BookOpen, AlertTriangle } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (questionId: number) => void;
  onActionStartExam: () => void;
  onActionReviewIncorrect: () => void;
  onActionOpenLibrary: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectQuestion,
  onActionStartExam,
  onActionReviewIncorrect,
  onActionOpenLibrary,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const questions = questionsRaw as Question[];

  // Filter actions or questions
  const filteredQuestions = query.trim()
    ? questions.filter((q) => {
        const qStr = `${q.id} ${q.displayQuestion} ${q.originalAnswer} ${q.conceptName}`.toLowerCase();
        return qStr.includes(query.toLowerCase());
      }).slice(0, 10)
    : [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredQuestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredQuestions.length > 0 && filteredQuestions[selectedIndex]) {
        onSelectQuestion(filteredQuestions[selectedIndex].id);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden font-sans"
      >
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm theo số câu (#44) hoặc từ khóa (ISO 27001, DES, Caesar, DoS)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-400">
            ESC để đóng
          </kbd>
        </div>

        {/* Content list */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {/* Quick Actions if query is empty */}
          {!query.trim() && (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Thao tác nhanh
              </div>
              <button
                onClick={() => {
                  onActionStartExam();
                  onClose();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                  <Timer className="h-4 w-4" />
                </div>
                <span>Bắt đầu Thi thử 40 câu / 30 phút</span>
              </button>
              <button
                onClick={() => {
                  onActionReviewIncorrect();
                  onClose();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <span>Ôn lại các câu hỏi trả lời sai</span>
              </button>
              <button
                onClick={() => {
                  onActionOpenLibrary();
                  onClose();
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-xs sm:text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span>Mở Thư viện 3 Bảng so sánh & Sơ đồ kiến thức</span>
              </button>
            </div>
          )}

          {/* Filtered Questions List */}
          {query.trim() && (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Kết quả tìm kiếm ({filteredQuestions.length})
              </div>
              {filteredQuestions.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Không tìm thấy câu hỏi phù hợp với "{query}"
                </div>
              ) : (
                filteredQuestions.map((q, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        onSelectQuestion(q.id);
                        onClose();
                      }}
                      className={`flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition ${
                        isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span className="flex h-6 w-8 items-center justify-center rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs font-bold text-slate-600 dark:text-slate-300">
                        #{q.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold truncate">
                          {q.displayQuestion}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          Đáp án đúng: <span className="font-mono text-emerald-600 dark:text-emerald-400">{q.options.find(o => o.isCorrect)?.text}</span>
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 self-center flex-shrink-0" />
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
          <span>Dùng phím <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">↓</kbd> để di chuyển, <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">Enter</kbd> để chọn</span>
          <span className="font-mono">70 câu hỏi đã sẵn sàng</span>
        </div>
      </div>
    </div>
  );
};
