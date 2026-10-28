# DANH MỤC TÀI LIỆU NGUỒN VÀ TIÊU CHUẨN THAM CHIẾU

Tài liệu này lưu trữ danh mục tài liệu gốc nội bộ và các tiêu chuẩn quốc tế chính thống được dùng làm căn cứ xây dựng ngân hàng câu hỏi, kiểm chứng đáp án và tạo phương án giải thích trong hệ thống.

---

## I. TÀI LIỆU NGUỒN NỘI BỘ DỰ ÁN

1. **`File_cau_hoi.docx`**:
   - Vai trò: Căn cứ pháp lý chuẩn xác định nội dung câu hỏi nguyên bản, số thứ tự STT từ 1 đến 70 và đáp án đúng theo quy định của ngân hàng đề thi.
   - Trạng thái lưu trữ: Giữ nguyên bản (read-only) trong thư mục dự án cha, không sửa đổi.

2. **`File_he_thong_hoa_bo_cau_hoi.docx`**:
   - Vai trò: Căn cứ cấu trúc kiến thức phân loại (16 đối tượng, 3 nhóm chủ đề), bảng so sánh đối sánh, sơ đồ phân cấp và đặc biệt là 5 cảnh báo học thuật tại Phần VI.
   - Trạng thái lưu trữ: Giữ nguyên bản (read-only) trong thư mục dự án cha, không sửa đổi.

---

## II. TIÊU CHUẨN VÀ NGUỒN CHUYÊN MÔN QUỐC TẾ BỔ SUNG

Khi cần làm rõ các câu hỏi học thuật nhạy cảm (như giải thuật mật mã, kích thước bit, chu trình quản trị ISMS), hệ thống tham chiếu trực tiếp đến các nguồn chuẩn mực:

1. **Bộ Tiêu chuẩn Quốc tế ISO/IEC**:
   - **ISO/IEC 27001:2022**: *Information security, cybersecurity and privacy protection — Information security management systems — Requirements*. (Căn cứ cho Câu 1, 4, 66, 67, 68, 69, 70).
   - **ISO/IEC 27002:2022**: *Information security, cybersecurity and privacy protection — Information security controls*. (Căn cứ cho Câu 66).
   - **ISO/IEC 27005:2022**: *Information security, cybersecurity and privacy protection — Guidance on managing information security risks*. (Căn cứ cho Câu 70).

2. **Tiêu chuẩn Mật mã học Viện Tiêu chuẩn và Công nghệ Quốc gia Hoa Kỳ (NIST)**:
   - **NIST FIPS PUB 46-3**: *Data Encryption Standard (DES)* — Xác nhận độ dài khối 64-bit và độ dài khóa hiệu lực thực tế 56-bit (Căn cứ cho Câu 25, 26, 49, 58, 59).
   - **NIST FIPS PUB 197**: *Advanced Encryption Standard (AES)* — Xác nhận hỗ trợ 3 kích thước khóa: 128, 192 và 256 bit (Căn cứ cho Câu 30, 60).
   - **NIST FIPS PUB 180-4**: *Secure Hash Standard (SHS)* — Phân tích đặc tính hàm băm an toàn một chiều, tính tất định và độ dài digest cố định (Căn cứ cho Câu 14, 15, 46, 47, 61, 62).
   - **Diffie, W., & Hellman, M. (1976)**: *New Directions in Cryptography*, IEEE Transactions on Information Theory — Lịch sử phát minh hệ mã hóa khóa công khai PKC (Căn cứ cho Câu 19, 45).
   - **Rivest, R. L., Shamir, A., & Adleman, L. (1978)**: *A Method for Obtaining Digital Signatures and Public-Key Cryptosystems*, Communications of the ACM — Giải thuật RSA (Căn cứ cho Câu 3, 63).

3. **Tiêu chuẩn Mạng và An ninh Không dây**:
   - **Wi-Fi Alliance**: *WPA3™ Specification* — Chuẩn bảo mật mạng không dây Wi-Fi an toàn nhất hiện nay với xác thực SAE (Căn cứ cho Câu 5).
