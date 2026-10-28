import React, { useState } from 'react';
import { ArrowRight, RefreshCw, KeyRound, Lock, Unlock, Hash, AlertOctagon } from 'lucide-react';

interface CryptoInteractiveLabProps {
  questionId: number;
}

export const CryptoInteractiveLab: React.FC<CryptoInteractiveLabProps> = ({ questionId }) => {
  // Determine which lab to show based on questionId
  const isCaesar = [44, 48, 55, 56, 57].includes(questionId);
  const isHash = [14, 15, 20, 46, 47, 61, 62].includes(questionId);
  const isPKC = [3, 10, 11, 12, 13, 16, 17, 18, 19, 21, 22, 23, 24, 45, 50, 51, 52, 63, 64, 65].includes(questionId);

  // --- 1. Caesar State ---
  const [caesarShift, setCaesarShift] = useState<number>(4);
  const plaintext = 'QUANLYTHONGTIN';

  const applyCaesar = (str: string, shift: number) => {
    return str
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          const p = code - 65;
          const c = (p + shift) % 26;
          return String.fromCharCode(c + 65);
        }
        return char;
      })
      .join('');
  };

  const ciphertext = applyCaesar(plaintext, caesarShift);

  // --- 2. Hash State ---
  const [hashRounds, setHashRounds] = useState<number>(3);
  const [inputSize, setInputSize] = useState<number>(1024);
  const [hashError, setHashError] = useState<string | null>(null);

  // --- 3. PKC vs Signature State ---
  const [pkcMode, setPkcMode] = useState<'encryption' | 'signature'>('encryption');

  if (!isCaesar && !isHash && !isPKC) {
    return null;
  }

  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/60 text-xs sm:text-sm">
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800 mb-3">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Phòng thí nghiệm Mật mã Tương tác (Interactive Crypto Lab)
        </span>
        <span className="text-[11px] text-slate-400 font-mono">
          {isCaesar && 'Lab 01 // Caesar Shift Sandbox'}
          {isHash && 'Lab 02 // Fixed-Length Hash Pipeline'}
          {isPKC && 'Lab 03 // Asymmetric Key-Flow Simulator'}
        </span>
      </div>

      {/* LAB 1: CAESAR CIPHER SHIFTER */}
      {isCaesar && (
        <div className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Thử nghiệm dịch chuyển khóa Caesar: <code className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">k = {caesarShift}</code>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kéo thanh trượt để quan sát công thức <code className="font-mono text-emerald-600">C = (P + k) mod 26</code> trực tiếp
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="25"
                value={caesarShift}
                onChange={(e) => setCaesarShift(Number(e.target.value))}
                className="accent-emerald-600 cursor-pointer h-1.5 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <button
                onClick={() => setCaesarShift(4)}
                className="px-2 py-1 text-[11px] rounded font-mono font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                title="Khôi phục k=4 chuẩn theo Câu 44"
              >
                Đặt k=4 (Câu 44)
              </button>
            </div>
          </div>

          {/* Letter mapping display */}
          <div className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="w-16 font-bold text-slate-400">Bản rõ P:</span>
              {plaintext.split('').map((char, i) => (
                <span key={i} className="flex h-7 w-7 items-center justify-center rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                  {char}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 font-mono text-xs mt-1.5">
              <span className="w-16 font-bold text-emerald-600 dark:text-emerald-400">Bản mã C:</span>
              {ciphertext.split('').map((char, i) => (
                <span
                  key={i}
                  className={`flex h-7 w-7 items-center justify-center rounded font-bold transition-colors ${
                    plaintext[i] === 'Y' && caesarShift === 4
                      ? 'bg-amber-500 text-white ring-2 ring-amber-300' // Highlight special wrap-around Y -> C
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  }`}
                  title={plaintext[i] === 'Y' && caesarShift === 4 ? "Chữ Y (24) + 4 = 28 mod 26 = 2 -> Chữ C (Bẫy quay vòng)" : undefined}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-amber-700 dark:text-amber-400">
            💡 <strong>Bẫy chữ Y:</strong> Vị trí chữ <code>Y</code> là 24. Khi k=4: (24 + 4) = 28; 28 chia 26 dư 2, tức quay vòng về chữ <code>C</code> (trong UYERPC...).
          </p>
        </div>
      )}

      {/* LAB 2: FIXED-LENGTH HASH PIPELINE */}
      {isHash && (
        <div className="space-y-3.5">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              Minh họa đặc tính hàm băm: Độ dài đầu ra CỐ ĐỊNH qua nhiều lần lặp
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Đề thi Câu 15: Thông điệp 1024 byte qua hàm băm ra 512 byte. Qua 3 lần hay n lần liên tiếp ra bao nhiêu?
            </p>
          </div>

          {/* Interactive Pipeline visual */}
          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <div className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-center">
                <span className="block text-[10px] text-slate-400">Đầu vào gốc</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{inputSize} byte</span>
              </div>

              {Array.from({ length: hashRounds }).map((_, rIdx) => (
                <React.Fragment key={rIdx}>
                  <ArrowRight className="h-4 w-4 text-emerald-500" />
                  <div className="px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-center">
                    <span className="block text-[10px] text-emerald-600 dark:text-emerald-400">Lần băm {rIdx + 1}</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">512 byte</span>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Controls */}
            <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              <button
                onClick={() => setHashRounds((prev) => Math.min(prev + 1, 6))}
                className="px-2.5 py-1 text-xs rounded-lg font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition"
              >
                + Băm thêm 1 lần (Lần {hashRounds + 1})
              </button>
              <button
                onClick={() => setHashRounds(3)}
                className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              >
                Đặt 3 lần (Câu 15)
              </button>
              <button
                onClick={() => {
                  setHashError('LỖI: Hàm băm là hàm một chiều (One-way function). Không có phép giải mã ngược! (Kiến thức Câu 20 & 46)');
                  setTimeout(() => setHashError(null), 4000);
                }}
                className="px-2.5 py-1 text-xs rounded-lg border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400"
              >
                Thử giải mã ngược
              </button>
            </div>

            {hashError && (
              <div className="mt-2 p-2 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center gap-1.5 animate-pulse">
                <AlertOctagon className="h-4 w-4" />
                {hashError}
              </div>
            )}
          </div>
        </div>
      )}

      {/* LAB 3: PKC VS DIGITAL SIGNATURE KEY-FLOW */}
      {isPKC && (
        <div className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Mô phỏng chiều sử dụng khóa: Mã hóa PKC vs. Chữ ký số
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Câu 11 & 12: Cùng dùng 2 khóa nhưng đảo ngược vai trò đối tượng tham gia
              </p>
            </div>
            <div className="flex rounded-lg bg-slate-200 dark:bg-slate-800 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setPkcMode('encryption')}
                className={`px-3 py-1 rounded-md transition ${
                  pkcMode === 'encryption'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                1. Mã hóa Bảo mật (PKC)
              </button>
              <button
                onClick={() => setPkcMode('signature')}
                className={`px-3 py-1 rounded-md transition ${
                  pkcMode === 'signature'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                2. Chữ ký số (Signature)
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            {pkcMode === 'encryption' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
                  <span className="flex items-center gap-1.5 font-bold text-sky-800 dark:text-sky-300 mb-1">
                    <Lock className="h-4 w-4" /> BƯỚC 1: NGƯỜI GỬI MÃ HÓA
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">
                    Người gửi dùng <strong>Khóa công khai (Public Key của người nhận)</strong> để mã hóa thông điệp. Bất kỳ ai cũng có thể có khóa này.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                    <KeyRound className="h-4 w-4" /> BƯỚC 2: NGƯỜI NHẬN GIẢI MÃ
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">
                    Chỉ duy nhất người nhận có <strong>Khóa bí mật (Private Key của người nhận)</strong> để giải mã được thông điệp bí mật.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  <span className="flex items-center gap-1.5 font-bold text-purple-800 dark:text-purple-300 mb-1">
                    <KeyRound className="h-4 w-4" /> BƯỚC 1: NGƯỜI GỬI TẠO CHỮ KÝ (KÝ)
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">
                    Người gửi dùng <strong>Khóa bí mật (Private Key của người gửi)</strong> để ký. <em>Chỉ 1 người duy nhất ký được</em> (Câu 24, 50, 65).
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                    <Unlock className="h-4 w-4" /> BƯỚC 2: MỌI NGƯỜI KIỂM TRA CHỮ KÝ
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">
                    Bất kỳ ai cũng có thể dùng <strong>Khóa công khai (Public Key của người gửi)</strong> để xác minh chữ ký và tính toàn vẹn (Câu 23, 24).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
