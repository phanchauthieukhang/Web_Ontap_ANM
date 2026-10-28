import React, { useState } from 'react';
import { X, Layers, Table, BookOpen, AlertCircle, FileText, Check } from 'lucide-react';

interface KnowledgeLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeLibraryModal: React.FC<KnowledgeLibraryModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'tables' | 'cautions' | 'shortcuts'>('tables');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative flex flex-col w-full max-w-4xl max-h-[90vh] rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Thư viện Tra cứu Kiến thức Trọng tâm & So sánh
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tổng hợp từ File hệ thống hóa bộ câu hỏi (Phần II, III, V, VI)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-5 pt-2 gap-4">
          <button
            onClick={() => setActiveTab('tables')}
            className={`pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'tables'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Table className="h-4 w-4" />
            3 Bảng so sánh kinh điển
          </button>
          <button
            onClick={() => setActiveTab('cautions')}
            className={`pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'cautions'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <AlertCircle className="h-4 w-4" />
            5 Cảnh báo học thuật & Bẫy thi
          </button>
          <button
            onClick={() => setActiveTab('shortcuts')}
            className={`pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'shortcuts'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="h-4 w-4" />
            Quy tắc cốt lõi cần thuộc lòng
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'tables' && (
            <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300">
              {/* Bảng 1 */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 font-bold text-slate-900 dark:text-white text-xs sm:text-sm border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Bảng 1: Phân biệt Ba Phương pháp Mật mã Chính (Đối xứng vs PKC vs Hàm băm)
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/70 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-800">
                        <th className="p-3">Tiêu chí</th>
                        <th className="p-3">Mã hóa Khóa đối xứng</th>
                        <th className="p-3">Mã hóa Khóa công khai (PKC)</th>
                        <th className="p-3">Hàm băm Mật mã</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Bản chất</td>
                        <td className="p-3">Mã hóa 2 chiều có giải mã</td>
                        <td className="p-3">Mã hóa 2 chiều có giải mã</td>
                        <td className="p-3 text-rose-600 dark:text-rose-400 font-medium">Hàm 1 chiều KHÔNG giải mã ngược</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Cơ chế khóa</td>
                        <td className="p-3">Dùng 1 khóa mật chung duy nhất</td>
                        <td className="p-3">Dùng cặp 2 khóa: Công khai & Bí mật</td>
                        <td className="p-3">Không dùng khóa để giải mã</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Tốc độ xử lý</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Rất nhanh (Ưu điểm nổi bật)</td>
                        <td className="p-3 text-rose-600 dark:text-rose-400 font-medium">Chậm (Nhược điểm lớn nhất)</td>
                        <td className="p-3">Rất nhanh, tạo bản tóm lược cố định</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Điểm yếu</td>
                        <td className="p-3">Khó quản lý & phân phối khóa an toàn</td>
                        <td className="p-3">Tốc độ thuật toán chậm</td>
                        <td className="p-3">Không khôi phục lại được dữ liệu gốc</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Giải thuật tiêu biểu</td>
                        <td className="p-3 font-mono">DES (khóa 56-bit), 3-DES, AES</td>
                        <td className="p-3 font-mono">RSA, El-Gamal</td>
                        <td className="p-3 font-mono">MD5, SHA-256</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bảng 2 */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 font-bold text-slate-900 dark:text-white text-xs sm:text-sm border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                  Bảng 2: Phân biệt Hệ PKC (Mã hóa tin nhắn) và Chữ ký số (Digital Signature)
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/70 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-800">
                        <th className="p-3">Tiêu chí</th>
                        <th className="p-3">Mã hóa Khóa công khai (PKC)</th>
                        <th className="p-3">Chữ ký số (Digital Signature)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Giống nhau cốt lõi</td>
                        <td className="p-3" colSpan={2}>
                          Cùng sử dụng 02 khóa: Khóa bí mật và Khóa công khai; đều hình thành từ thuật toán khóa công khai.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Khác biệt bản chất</td>
                        <td className="p-3">Bảo vệ tính bí mật của thông điệp</td>
                        <td className="p-3">Đảo ngược vai trò đối tượng tham gia và thứ tự dùng khóa</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Chiều dùng khóa của Người gửi</td>
                        <td className="p-3 font-mono text-sky-600 dark:text-sky-400 font-bold">Khóa công khai (của người nhận) để MÃ HÓA</td>
                        <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">Khóa bí mật (của người gửi) để KÝ</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Chiều dùng khóa của Người nhận</td>
                        <td className="p-3 font-mono">Khóa bí mật (của người nhận) để GIẢI MÃ</td>
                        <td className="p-3 font-mono">Khóa công khai (của người gửi) để KIỂM TRA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bảng 3 */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2.5 font-bold text-slate-900 dark:text-white text-xs sm:text-sm border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                  Bảng 3: Gia đình Tiêu chuẩn ISO/IEC 27000
                </div>
                <div className="p-4 space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">ISO/IEC 27001</span>: Đưa ra các <strong>yêu cầu (requirements)</strong> cho ISMS tổng thể (phù hợp mọi tổ chức).
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sky-600 dark:text-sky-400 font-mono">ISO/IEC 27002</span>: <strong>Hướng dẫn thực hiện</strong> các biện pháp kiểm soát an toàn thông tin.
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">ISO/IEC 27005</span>: Tập trung chuyên sâu vào <strong>quản lý rủi ro an toàn thông tin</strong>.
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">SoA (Statement of Applicability)</span>: Liệt kê các <strong>biện pháp kiểm soát được chọn</strong> và lý do áp dụng hoặc loại trừ.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cautions' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1.5">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  1. Câu 20: Hàm băm trong câu hỏi "Có mấy phương pháp mã hóa và giải mã"
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ngân hàng đề chọn đáp án là <strong>Ba (mã hóa khóa đối xứng, mã hóa khóa công khai, hàm băm)</strong>. Mặc dù về bản chất kỹ thuật (xác nhận tại Câu 46), hàm băm là hàm một chiều không giải mã được, nhưng khi làm bài thi bạn cần chọn đúng đáp án <strong>Ba</strong> theo ngân hàng đề.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1.5">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  2. Câu 28: Các bước thực thi quản lý ATTT (Plan - Do - Monitor - Control)
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Đề sử dụng tổ hợp: <strong>Lập kế hoạch (Plan), Thực thi kế hoạch (Do), Giám sát kết quả thực hiện (Monitor), Thực hiện các kiểm soát (Control)</strong>. Đây là sự lai ghép giữa chu trình PDCA và Risk Management. Hãy chọn đúng tổ hợp 4 từ này.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1.5">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  3. Câu 15: Bẫy tính nhầm kích thước lặp hàm băm
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Thông điệp 1024 byte qua hàm băm ra 512 byte. Qua 3 lần liên tiếp vẫn là <strong>512 byte</strong> (độ dài cố định của hàm băm), tuyệt đối không lấy 1024 chia đôi thành 128 byte.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                <h4 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1.5">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  4. Bẫy cụm câu hỏi Chính sách ATTT (Câu 2, 38, 39, 43)
                </h4>
                <div className="mt-2 space-y-1.5 text-xs">
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    • Câu 2: Mục đích chủ yếu (vận hành) → <em>"Theo dõi và kiểm soát thông tin, đảm bảo an toàn cho dữ liệu quan trọng"</em>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    • Câu 39: Mục đích chính sách (đối tượng tối hậu) → <em>"Bảo vệ tài sản"</em>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    • Câu 43: Mục tiêu chính thiết lập chính sách → <em>"Để thiết lập các quy định và hướng dẫn bảo vệ thông tin"</em>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    • Câu 38: Mục tiêu của quản trị ATTT → <em>"Giảm thiểu rủi ro"</em>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shortcuts' && (
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">
                  5 Quy tắc bất biến trong phòng thi:
                </h4>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Mã hóa bảo mật PKC</strong>: Khóa công khai để MÃ HÓA, Khóa bí mật để GIẢI MÃ.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Chữ ký số</strong>: Khóa bí mật (người gửi) để KÝ, Khóa công khai để KIỂM TRA chữ ký.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Kích thước khóa DES</strong>: Khóa thực tế được sử dụng là <strong>56 bít</strong> (đầu vào 64 bít trừ 8 bít parity).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>AES</strong>: Hỗ trợ 3 kích thước khóa: <strong>128 bít, 192 bít, 256 bít</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Đánh giá rủi ro trong ISO 27001</strong>: Nằm trong nhóm hoạt động <strong>Hoạch định (Planning)</strong>.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition"
          >
            Đóng bảng tra cứu
          </button>
        </div>
      </div>
    </div>
  );
};
