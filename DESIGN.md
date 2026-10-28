# DESIGN.md — Đặc tả Hệ thống Thiết kế Web App Ôn Tập An Toàn Thông Tin

Tài liệu thiết kế giao diện dựa trên sự kết hợp giữa:
- **`taste-skill v2`** (Anti-slop art direction cho App Screens)
- **`awesome-design-md`** (Chuẩn thiết kế Linear / Cloudflare cho nền tảng bảo mật)
- **`web-design-guidelines`** (Bộ quy tắc chuẩn Vercel Labs về UI, Accessibility và Mobile ergonomics)

---

## 1. Nguyên tắc Thẩm mỹ Cốt lõi (Anti-Slop Directives)

1. **Thực chất thay vì hoa mỹ hời hợt**:
   - Loại bỏ các gradient lòe loẹt, thẻ icon card rỗng tuếch, thanh viền dạ quang giả tạo (AI slop tells).
   - Mỗi khối thông tin, số liệu (70 câu, tỷ lệ đúng, số câu sai cần ôn) đều gắn liền trực tiếp với dữ liệu học tập thực tế của người dùng.
2. **Typography phân cấp sắc nét**:
   - Font chữ nội dung: Sans-serif hiện đại, độ tương phản cao, dễ đọc lâu trên màn hình máy tính và điện thoại.
   - Font chữ kỹ thuật / Mật mã: `JetBrains Mono` / monospace cho các công thức Caesar (`QUANLYTHONGTIN` → `UYERPCXLSRKXMR`), độ dài khóa bit (`56 bít`, `128/192/256 bít`), mã tiêu chuẩn (`ISO/IEC 27001`, `DES`, `RSA`).
3. **Phản hồi Trạng thái Đa giác quan**:
   - Trạng thái Đúng/Sai không chỉ dựa vào màu sắc; luôn có **Biểu tượng (Icon) + Nhãn chữ (Badge Text) + Màu sắc** để người dùng khiếm thị màu (color blind) phân biệt dễ dàng.

---

## 2. Bảng Phối màu (Color Palette Tokens)

### Light Mode (Chế độ Đọc sáng - Paper/Slate)
- `Background`: `#F8FAFC` (Slate-50)
- `Card Surface`: `#FFFFFF` (Trắng tinh khiết với viền tinh tế `#E2E8F0`)
- `Primary Accent`: `#16A34A` (Emerald-600) — Biểu trưng cho sự an toàn, bảo vệ
- `Text Primary`: `#0F172A` (Slate-900)
- `Text Muted`: `#64748B` (Slate-500)
- `Warning / Caution`: `#D97706` (Amber-600)
- `Destructive / Incorrect`: `#DC2626` (Rose-600)

### Dark Mode (Chế độ Kỹ thuật - Deep Security Slate)
- `Background`: `#020617` (Slate-950)
- `Card Surface`: `#0F172A` (Slate-900) với viền `#1E293B` (Slate-800)
- `Primary Accent`: `#22C55E` (Emerald-500)
- `Text Primary`: `#F8FAFC` (Slate-50)
- `Text Muted`: `#94A3B8` (Slate-400)
- `Warning / Caution`: `#F59E0B` (Amber-500)
- `Destructive / Incorrect`: `#EF4444` (Rose-500)

---

## 3. Trải nghiệm Tương tác (UX & Accessibility)

- **Vùng bấm (Touch Target)**: Mọi nút chọn đáp án, điều hướng đều có chiều cao $\ge 44\text{px}$, padding rộng rãi, hỗ trợ tối đa cho thiết bị di động và tablet.
- **Hỗ trợ Bàn phím Toàn diện**:
  - `A` / `1`: Chọn đáp án A
  - `B` / `2`: Chọn đáp án B
  - `C` / `3`: Chọn đáp án C
  - `D` / `4`: Chọn đáp án D
  - `Enter` hoặc `Space`: Chuyển sang câu hỏi tiếp theo
  - `Shift + B`: Đánh dấu / bỏ đánh dấu câu hỏi
- **Mô hình 3D Cryptographic Lattice (Three.js)**:
  - Chỉ xuất hiện nhẹ nhàng ở Banner trang chủ với chế độ `powerPreference: "low-power"`.
  - Tự động dừng render khi rời trang hoặc khi người dùng kích hoạt `prefers-reduced-motion` trong hệ điều hành để đảm bảo 0% giật lag và 100% tập trung khi làm bài.
