# BÁO CÁO KIỂM TOÁN VÀ THẨM ĐỊNH NGÂN HÀNG 70 CÂU HỎI TRẮC NGHIỆM
**Môn học**: An toàn thông tin / An ninh thông tin  
**Hệ thống**: Web App Ôn tập An toàn thông tin  
**Thời gian thực hiện kiểm định**: Ngày 28 tháng 10 năm 2026  
**Trạng thái thẩm định**: **Đạt 100% (70/70 câu hỏi đã kiểm tra tự động và thủ công)**

---

## I. TỔNG QUAN KẾT QUẢ KIỂM TRA DỮ LIỆU NGUỒN

### 1. Đối chiếu tính toàn vẹn với tài liệu gốc
- **Tài liệu nguồn 1**: `File_cau_hoi.docx` (Trích xuất 70 câu hỏi từ Câu 1 đến Câu 70, kèm một đáp án đúng cho mỗi câu).
- **Tài liệu nguồn 2**: `File_he_thong_hoa_bo_cau_hoi.docx` (Phần II - Hồ sơ kiến thức 16 đối tượng; Phần III - 3 Bảng so sánh; Phần IV - Sơ đồ phân cấp; Phần V - Các bẫy trắc nghiệm; Phần VI - Cảnh báo học thuật; Phần VII - Bảng truy vết nguồn).
- **Tập dữ liệu chuẩn hóa**: `src/data/questions.json` (Gồm đủ 70 bản ghi theo đúng định dạng `Question` schema TypeScript).

### 2. Thống kê theo phân loại
- **Số câu hỏi Đúng/Sai (Boolean)**: **1 câu** (Câu 1) — Giữ nguyên 2 lựa chọn `Đúng` / `Sai`.
- **Số câu hỏi Trắc nghiệm 4 lựa chọn (Single Choice)**: **69 câu** (Câu 2 → Câu 70) — Đã xây dựng đầy đủ 3 phương án nhiễu hợp lý, không mơ hồ, không trùng lặp.
- **Số câu hỏi Phủ định (Negative Polarity)**: **4 câu** (Câu 16, 22, 46, 47) — Được gắn nhãn nhận diện phân cực để cảnh báo người học tránh chọn nhầm.
- **Số câu hỏi có lưu ý học thuật (Academic Caution)**: **6 câu** (Câu 8, 15, 20, 28, 40, 53) — Có khung ghi chú đối chiếu chuyên sâu.

---

## II. CHI TIẾT CÁC CÂU CẦN XỬ LÝ HỌC THUẬT VÀ ĐỊNH DẠNG ĐẶC BIỆT

| STT | Vấn đề trong Ngân hàng đề gốc | Phương pháp xử lý trong Dữ liệu Ứng dụng | Căn cứ học thuật & Khuyến nghị ôn tập |
| :---: | :--- | :--- | :--- |
| **Câu 8** | Gộp `Packet sniffer`, `Spoofing`, `Pharming`, `Man-in-the-middle` vào cùng nhóm *"Tấn công chặn liên lạc"*. | Giữ nguyên đáp án đúng: `"Tấn công chặn liên lạc"`. Bổ sung `academicNote`. | Về kỹ thuật: Sniffer và MITM trực tiếp chặn gói tin; Spoofing (giả mạo định danh) và Pharming (đầu độc DNS) là kỹ thuật giả mạo/chuyển hướng phục vụ đánh cắp dữ liệu hoặc dẫn tới chặn liên lạc. |
| **Câu 15** | Bài toán lặp hàm băm: *"Thông điệp 1024 byte qua hàm băm ra 512 byte, qua 3 lần băm liên tiếp ra bao nhiêu?"* | Giữ nguyên đáp án: `"512 byte"`. Giải thích chi tiết tính chất kích thước đầu ra cố định. | Bẫy thí sinh hay tính nhầm $1024 / 2^3 = 128 \text{ byte}$ do tưởng hàm băm chia đôi dung lượng. Thực chất kích thước đầu ra luôn cố định theo giải thuật băm. |
| **Câu 20** | Liệt kê *"Hàm băm"* là một trong 3 phương pháp chính của *"mã hóa và giải mã"*. | Giữ nguyên đáp án đúng: `"Ba ( mã hóa khóa đối xứng , mã hóa khóa công khai , hàm băm )"`. | Trong mật mã học chuẩn (và chính Câu 46 của đề), hàm băm là hàm một chiều không giải mã ngược được. Khi đi thi cần chọn phương án theo đúng bộ đề này. |
| **Câu 28** | Các bước thực thi quản lý ATTT: `"Plan, Do, Monitor, Control"`. | Giữ nguyên đáp án theo bộ đề. Bổ sung ghi chú đối sánh. | Lai ghép giữa chu trình **PDCA** (Plan - Do - Check - Act) của ISMS và chu trình Quản lý rủi ro (Risk Management). Khi đi thi chọn đúng 4 từ khóa: Plan -> Do -> Monitor -> Control. |
| **Câu 40** | Người chịu trách nhiệm xác định và quản lý rủi ro trong tổ chức là `"Bộ phận an toàn thông tin"`. | Giữ nguyên đáp án bộ đề. Bổ sung lưu ý vai trò. | Bộ phận ATTT là đơn vị chuyên môn vận hành và đánh giá rủi ro, nhưng trách nhiệm giải trình cuối cùng (Accountability) thuộc về Ban lãnh đạo cấp cao (Top Management) và Chủ sở hữu rủi ro (Risk Owners). |
| **Câu 53** | Tiền tố lựa chọn bị dính trong văn bản gốc: `"a) Layered Security Model"`. | Lưu nguyên văn vào `originalAnswer`, chuẩn hóa văn bản hiển thị thành `"Layered Security Model"`. | Đồng nghĩa với mô hình *Defense in Depth* (Phòng thủ chiều sâu). |

---

## III. BẢNG KIỂM ĐỊNH TOÀN BỘ 70 CÂU HỎI

| STT | Câu hỏi hiển thị | Đáp án đúng | Chủ đề | Trạng thái |
| :---: | :--- | :--- | :--- | :---: |
| **1** | Tiêu chuẩn ISO 27001 phù hợp với mọi loại hình tổ chức/đơn vị? | Đúng | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **2** | Mục đích chủ yếu của chính sách an ninh thông tin của một tổ chức là gì? | Theo dõi và kiểm soát thông tin, đảm bảo an toàn cho dữ liệu quan trọng | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **3** | RSA là giải thuật: | Mã công khai | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **4** | Loại tiêu chuẩn nào dưới đây cung cấp yêu cầu cho hệ thống quản lý an ninh thông tin (ISMS)? | ISO/IEC 27001 | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **5** | Đâu là phương pháp bảo mật mạng không dây an toàn nhất hiện nay? | WPA3 | Lỗ hổng, Tấn công & Phòng vệ | Đã xác nhận |
| **6** | Việc truy cập thông tin nhạy cảm tại màn hình máy tính, ATM, nơi công cộng là: | Shoulder Surfing | Lỗ hổng, Tấn công & Phòng vệ | Đã xác nhận |
| **7** | Back doors là? | Kiểu tấn công có chủ đích bằng phần mềm | Lỗ hổng, Tấn công & Phòng vệ | Đã xác nhận |
| **8** | Packet sniffer, Spoofing, Pharming, Man-in-the-middle là các kỹ thuật trong: | Tấn công chặn liên lạc | Lỗ hổng, Tấn công & Phòng vệ | Lưu ý học thuật |
| **9** | Mục tiêu của tấn công từ chối dịch vụ (DoS) là: | Chặn người dùng hợp pháp truy cập vào các hệ thống nào đó | Lỗ hổng, Tấn công & Phòng vệ | Đã xác nhận |
| **10** | Phát biểu nào sau đây đúng về chữ ký điện tử? | Chữ ký điện tử có thể sử dụng để xác thực tính toàn vẹn dữ liệu | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **11** | Chữ ký số giống với hệ mã hóa khóa công khai ở điểm nào? | Cùng sử dụng 2 khóa bí mật và công khai | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **12** | Chữ ký số khác với hệ mã hóa khóa công khai ở điểm nào? | Sử dụng 02 khóa bí mật và công khai như nhau nhưng vai trò đối tượng tham gia được đổi lại | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **13** | Kết luận nào sau đây là đúng về chữ ký số? | Chữ ký số được hình thành từ các thuật toán mã hóa khóa công khai | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **14** | Đặc điểm đúng về hàm băm: | Với mỗi giá trị đầu vào chỉ duy nhất có một giá trị đầu ra tương ứng | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **15** | Thông điệp 1024 byte qua hàm băm ra 512 byte, sau 3 lần băm liên tiếp ra bao nhiêu? | 512 byte | Mật mã học, Hàm băm & Chữ ký số | Lưu ý học thuật |
| **16** | Giải thuật nào sau đây KHÔNG dùng khóa đối xứng? | El-Gamal | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **17** | Ưu điểm của hệ mã khóa bí mật so với hệ mã hóa khóa công khai là: | Tốc độ xử lý của hệ mã khóa bí mật cao hơn hệ mã khóa công khai | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **18** | Nhược điểm của các hệ mã mật khóa công khai là: | Tốc độ xử lý của thuật toán chậm | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **19** | PKC được hiểu là: | Hệ mã khóa phi đối xứng | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **20** | Có mấy phương pháp chính cho việc mã hoá và giải mã? | Ba (mã hóa khóa đối xứng, mã hóa khóa công khai, hàm băm) | Mật mã học, Hàm băm & Chữ ký số | Lưu ý học thuật |
| **21** | Trong hệ mã hóa khóa công khai nhận định nào sau đây là ĐÚNG? | Sử dụng khóa công khai để MÃ HÓA, khóa bí mật để GIẢI MÃ | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **22** | Nhận định nào sau đây là SAI trong hệ mã hóa PKC? | Sử dụng một khóa mật chung cho cả hai hệ mã | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **23** | Chữ ký số là gì? | Sử dụng khóa bí mật để ký, khóa công khai để kiểm tra chữ ký | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **24** | Nhận định nào sau đây ĐÚNG về chữ ký số? | Một phép kiểm tra trong đó nhiều người có thể kiểm tra nhưng chỉ một người được tạo chữ ký | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **25** | Mã hóa nào là tiêu chuẩn phát triển tạo ra thông điệp an toàn? | Data Encryption Standard | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **26** | DES là viết tắt của từ nào? | Data encryption standard | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **27** | Có thể giảm khả năng bị tấn công nếu có thể: | Giảm thiểu các lỗ hổng bảo mật | Lỗ hổng, Tấn công & Phòng vệ | Đã xác nhận |
| **28** | Các bước thực thi quản lý an toàn thông tin: | Lập kế hoạch (Plan), Thực thi kế hoạch (Do), Giám sát kết quả thực hiện (Monitor), Thực hiện các kiểm soát (Control). | Quản trị ATTT & ISO 27000 | Lưu ý học thuật |
| **29** | Điểm yếu của các hệ mã hóa khóa đối xứng: | Khó khăn trong quản lý và phân phối khóa | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **30** | Các giải thuật mã hóa khóa đối xứng thông dụng: | DES, 3-DES, AES | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **31** | Nguy cơ xâm nhập do lỗi lập trình hoặc sự cố phần mềm: | Lỗ hổng bảo mật | Lỗ hổng, Tấn công & Phòng vệ | Đã xác nhận |
| **32** | Cách giúp bảo vệ thông tin trong quá trình truyền tin: | Mã hóa | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **33** | Xử lý khi nhận cuộc gọi yêu cầu bổ sung thông tin thuế: | Xác thực người gọi và thông tin người gọi. Sau đó lên trang web chính thống của tổng cục thuế để kiểm tra. | Lỗ hổng, Tấn công & Phòng vệ | Đã xác nhận |
| **34** | Không bị lộ lịch sử tìm kiếm web trên máy tính dùng chung: | Mở trình duyệt trong chế độ ẩn danh, chế độ riêng tư. Tắt trình duyệt sau khi sử dụng. | Lỗ hổng, Tấn công & Phòng vệ | Đã xác nhận |
| **35** | Nhận biết trang web an toàn: | Kiểm tra 'https', biểu tượng ổ khóa, và chứng chỉ SSL. | Lỗ hổng, Tấn công & Phòng vệ | Đã xác nhận |
| **36** | Mục tiêu của việc đánh giá lỗ hổng bảo mật: | Tăng cường bảo mật | Lỗ hổng, Tấn công & Phòng vệ | Đã xác nhận |
| **37** | Lập kế hoạch khôi phục thảm họa thuộc loại nào? | Lập kế hoạch dự phòng | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **38** | Mục tiêu của quản trị an toàn thông tin: | Giảm thiểu rủi ro | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **39** | Mục đích của chính sách an toàn thông tin: | Bảo vệ tài sản | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **40** | Người chịu trách nhiệm xác định và quản lý rủi ro trong tổ chức: | Bộ phận an toàn thông tin | Quản trị ATTT & ISO 27000 | Lưu ý học thuật |
| **41** | Đánh giá rủi ro trong an ninh thông tin giúp: | Xác định các mối đe dọa tiềm ẩn và tác động của chúng | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **42** | Ý nghĩa của 'Kiểm toán An ninh': | Đánh giá sự tuân thủ các chính sách và tiêu chuẩn an ninh | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **43** | Mục tiêu chính thiết lập chính sách an ninh thông tin: | Để thiết lập các quy định và hướng dẫn bảo vệ thông tin | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **44** | Mã Caesar với k = 4 của đoạn văn QUANLYTHONGTIN: | UYERPCXLSRKXMR | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **45** | Ai đã phát minh ra mã hóa khóa công khai? | Whitfield Diffie và Martin Hellman | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **46** | Đặc điểm KHÔNG PHẢI của một hàm băm an toàn: | Có khả năng giải mã ngược | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **47** | Đặc điểm KHÔNG ĐÚNG về hàm băm: | Dễ dàng tìm đầu vào từ đầu ra | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **48** | Caesar cipher là ví dụ của loại mã hóa nào? | Mã thay thế | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **49** | Phương pháp mã hóa đối xứng quan trọng phát triển vào những năm 1970: | DES (Tiêu chuẩn mã hóa dữ liệu) | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **50** | Khóa được sử dụng để tạo chữ ký số: | Khóa bí mật | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **51** | Vai trò của hàm 'băm' trong chữ ký số: | Đảm bảo tính toàn vẹn của tin nhắn. | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **52** | Trong chữ ký số, 'Cơ quan chứng thực' (CA) là gì? | Một tổ chức cung cấp và xác minh các khóa công khai | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **53** | Mô hình bảo mật nhiều lớp được gọi là gì? | Layered Security Model | Quản trị ATTT & ISO 27000 | Lưu ý học thuật |
| **54** | Chính sách cấp quyền cho người dùng nên tuân thủ nguyên tắc nào? | Cấp quyền vừa đủ để thực hiện nhiệm vụ | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **55** | Thuật ngữ "Cipher" dùng để chỉ gì? | Giải thuật dùng để mã hóa và giải mã thông tin | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **56** | Phương pháp thay thế hoạt động như thế nào? | Thay một giá trị bằng một giá trị khác | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **57** | Kỹ thuật mã hóa Caesar cipher thực hiện điều gì? | Thay thế từng ký tự bằng ký tự khác theo khóa cố định | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **58** | DES là dạng mã hóa nào? | Khóa đối xứng | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **59** | Kích thước khóa thực tế trong DES: | 56 bít | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **60** | AES hỗ trợ kích thước khóa nào? | 128 bít, 192 bít, 256 bít | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **61** | Hàm băm được sử dụng để làm gì? | Kiểm tra tính toàn vẹn của dữ liệu | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **62** | Ví dụ về hàm băm phổ biến: | MD5, SHA-256 | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **63** | RSA là giải thuật mã hóa gì? | Khóa công khai | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **64** | Ở hệ mật mã nào người gửi và người nhận dùng các khóa khác nhau? | Không đối xứng | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **65** | Ký tài liệu trước khi gửi đến người khác dùng khóa nào? | Khóa bí mật của người gửi | Mật mã học, Hàm băm & Chữ ký số | Đã xác nhận |
| **66** | Mối quan hệ giữa ISO/IEC 27001 và ISO/IEC 27002: | 27001 đưa ra yêu cầu, 27002 hướng dẫn thực hiện các biện pháp kiểm soát | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **67** | “Phạm vi áp dụng” (scope) của ISMS theo ISO 27001 nhằm: | Xác định ranh giới và giới hạn của ISMS trong tổ chức | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **68** | Điều khoản “Đánh giá rủi ro thông tin” trong ISO/IEC 27001 thuộc nhóm: | Hoạch định (Planning) | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **69** | Trong ISO/IEC 27001, “Statement of Applicability (SoA)” có mục đích gì? | Liệt kê các biện pháp kiểm soát được chọn và lý do áp dụng hoặc loại trừ | Quản trị ATTT & ISO 27000 | Đã xác nhận |
| **70** | Sự khác biệt giữa ISO/IEC 27005 và ISO/IEC 27001: | 27005 tập trung vào quản lý rủi ro an toàn thông tin, còn 27001 đưa ra yêu cầu ISMS tổng thể | Quản trị ATTT & ISO 27000 | Đã xác nhận |
