# ỨNG DỤNG WEB TRẮC NGHIỆM ÔN TẬP AN TOÀN THÔNG TIN (70 CÂU HỎI)

Ứng dụng web ôn tập môn An toàn thông tin / An ninh thông tin dành cho sinh viên, được chuẩn hóa từ ngân hàng 70 câu hỏi đề thi và tài liệu hệ thống hóa kiến thức học thuật.

---

## 🌟 TÍNH NĂNG NỔI BẬT

1. **Ngân hàng 70 câu hỏi chuẩn hóa 100%**:
   - Trích xuất đủ từ Câu 1 đến Câu 70 theo đúng thứ tự file nguồn.
   - Đáp án đúng được bảo toàn tuyệt đối theo ngân hàng đề thi.
   - Các phương án nhiễu (distractors) được biên soạn chặt chẽ từ các khái niệm đối lập trong tài liệu hệ thống hóa.
   - Kèm lời giải thích chi tiết, điểm cốt lõi cần nhớ và **khung cảnh báo học thuật** (phân tích sâu các câu hỏi nhạy cảm như Câu 8, 15, 20, 28, 40, 53...).

2. **6 Chế độ học tập toàn diện**:
   - **Làm tuần tự 1 → 70**: Ôn luyện theo đúng thứ tự ngân hàng đề.
   - **Luyện ngẫu nhiên**: Trộn ngẫu nhiên câu hỏi và phương án, rèn luyện phản xạ.
   - **Luyện theo chủ đề**: 3 nhóm chủ đề chuyên sâu (Quản trị ATTT & ISO 27000; Mật mã học, Hàm băm & Chữ ký số; Lỗ hổng, Tấn công & Phòng vệ).
   - **Ôn câu làm sai**: Tự động gom các câu bạn từng trả lời sai để luyện lại đến khi thuần thục.
   - **Câu hỏi đánh dấu**: Lưu lại các câu hỏi quan trọng, bẫy trắc nghiệm cần xem lại.
   - **Thi thử mô phỏng**: 40 câu ngẫu nhiên trong 30 phút, đồng hồ đếm ngược, chỉ công bố đáp án và phân tích chi tiết sau khi nộp bài.

3. **Thư viện Tra cứu Kiến thức Nhanh & Lệnh Tức thì (Ctrl + K)**:
   - Tích hợp **Raycast-style Command Palette (`Ctrl + K`)**: Tra cứu toàn văn 70 câu hỏi và nhảy nhanh đến bất kỳ câu hỏi/chế độ nào.
   - 3 bảng so sánh kinh điển (Khóa đối xứng vs PKC vs Hàm băm; PKC vs Chữ ký số; Tiêu chuẩn ISO 27001, 27002, 27005).
   - Bảng 5 quy tắc bất biến trong phòng thi & 5 cảnh báo học thuật trọng tâm.

4. **"Signature Elements" — Phòng thí nghiệm Mật mã Tương tác (Interactive Crypto Labs)**:
   - **Lab 01 (Caesar Shifter)**: Tương tác thanh trượt $k \in [0..25]$, tính toán mô-đun thời gian thực $C = (P + k) \bmod 26$ (Câu 44, 48, 56, 57).
   - **Lab 02 (Fixed-Length Hash Pipeline)**: Mô phỏng khóa kích thước đầu ra 512-byte qua nhiều vòng băm và cảnh báo một chiều `ONE_WAY_ERROR` (Câu 14, 15, 20, 46).
   - **Lab 03 (Asymmetric Key-Flow Simulator)**: Trực quan hóa đối kháng giữa luồng Mã hóa Bí mật (khóa công khai mã hóa) vs. Chữ ký số (khóa bí mật ký) (Câu 11-13, 21-24, 65).

5. **Lưu trữ Cục bộ & Bảo mật**:
   - Hoạt động 100% Offline, không yêu cầu đăng nhập, không dùng AI API khi làm bài.
   - Lưu tiến độ học tập, lịch sử thi và câu sai an toàn qua `localStorage` (phiên bản Schema v1).

6. **Giao diện Cyber-Craft & Interactive 3D Edition**:
   - Thiết kế kết hợp giữa `taste-skill v2`, `awesome-design-md` (Linear + Raycast) và `web-design-guidelines`.
   - **Lõi 3D Morphing Topologies (Three.js)**: Biến hình 3 cấu trúc hình học đại diện cho 3 chủ đề (Vòng khiên đồng tâm Layered Security, Tinh thể 20 mặt Icosahedron, và Mạng radar tô-pô phân tán).
   - **State-Reactive Feedback**: Xung năng lượng lục bảo Emerald khi trả lời đúng, Glitch shake cảnh báo khi chọn sai.
   - **Hiệu ứng Giải mã Chữ ký GSAP (`CipherText`)**: Hiệu ứng scramble hex sống động khi chuyển câu hỏi.
   - **3D Hardware Keycaps**: Phím bấm vật lý phản hồi chuyển động lún phím khi gõ phím thật (`A-D`, `1-4`, `Enter`, `Shift+B`).

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY DỰ ÁN

### Yêu cầu môi trường
- **Node.js**: Phiên bản 18+ (khuyên dùng Node 20 hoặc 22+).
- **Trình quản lý gói**: npm hoặc pnpm/yarn.

### 1. Cài đặt phụ thuộc (Dependencies)
```bash
npm install
```

### 2. Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Truy cập ứng dụng tại: `http://localhost:3000`

### 3. Kiểm định dữ liệu & Chạy Unit Tests
```bash
# Kiểm định toàn bộ 70 câu hỏi (10 tiêu chí ràng buộc)
npx tsx scripts/validate-questions.ts

# Chạy bộ kiểm thử tự động Vitest
npx vitest run
```

### 4. Đóng gói cho môi trường Production (Build)
```bash
npm run build
```
Thư mục đầu ra sản phẩm sẽ nằm tại `dist/`.

---

## 🌐 HƯỚNG DẪN TRIỂN KHAI LÊN GITHUB & VERCEL

### Bước 1: Khởi tạo Git và Commit mã nguồn
```bash
git init
git add .
git commit -m "feat: complete cybersecurity quiz web app with 70 questions and 6 modes"
```

### Bước 2: Đẩy lên GitHub
1. Tạo một repository mới trên GitHub (ví dụ: `web-ontap-anm`).
2. Liên kết và đẩy code lên:
```bash
git remote add origin https://github.com/<tai-khoan-cua-ban>/web-ontap-anm.git
git branch -M main
git push -u origin main
```

### Bước 3: Triển khai lên Vercel
1. Đăng nhập vào [Vercel](https://vercel.com).
2. Chọn **"Add New..."** → **"Project"** và import repository GitHub bạn vừa tạo.
3. Cấu hình triển khai:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (hoặc thư mục chứa mã nguồn)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Bấm **"Deploy"** — Vercel sẽ tự động build và cấp phát URL production dạng `https://web-ontap-anm.vercel.app`.
