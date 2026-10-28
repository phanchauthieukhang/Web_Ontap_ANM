/**
 * Master Data Generator for all 70 questions (Q1 - Q70)
 * Fully compliant with File_cau_hoi.docx and File_he_thong_hoa_bo_cau_hoi.docx
 */

import * as fs from 'fs';
import * as path from 'path';

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  distractorRationale?: string;
}

export interface Question {
  id: number;
  originalQuestion: string;
  displayQuestion: string;
  originalAnswer: string;
  answerType: 'single_choice' | 'boolean';
  questionPolarity: 'positive' | 'negative';
  topicId: string;
  topicName: string;
  conceptId: string;
  conceptName: string;
  options: Option[];
  correctOptionId: string;
  explanation: {
    correctRationale: string;
    keyTakeaway: string;
  };
  sourceReferences: string[];
  academicNote?: string;
  reviewStatus: 'verified' | 'academic_caution';
}

export const allQuestions: Question[] = [
  // ==========================================
  // BATCH 1: Q1 - Q10
  // ==========================================
  {
    id: 1,
    originalQuestion: "Tiêu chuẩn ISO 27001 phù hợp với mọi loai hình tổ chức/đơn vị?",
    displayQuestion: "Tiêu chuẩn ISO 27001 phù hợp với mọi loại hình tổ chức/đơn vị?",
    originalAnswer: "Đúng",
    answerType: "boolean",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-1-isms-iso27001",
    conceptName: "Hệ thống Quản lý An toàn Thông tin (ISMS) & ISO/IEC 27001",
    options: [
      { id: "A", text: "Đúng", isCorrect: true },
      { id: "B", text: "Sai", isCorrect: false, distractorRationale: "ISO/IEC 27001 được xây dựng linh hoạt để áp dụng cho mọi quy mô doanh nghiệp từ nhỏ đến lớn, thuộc mọi ngành nghề và lĩnh vực." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Tiêu chuẩn ISO/IEC 27001 là tiêu chuẩn quốc tế quy định các yêu cầu cho Hệ thống quản lý an toàn thông tin (ISMS) tổng thể, được thiết kế áp dụng cho mọi loại hình tổ chức không phân biệt quy mô, lĩnh vực hoạt động hay tính chất sở hữu.",
      keyTakeaway: "ISO/IEC 27001 áp dụng cho MỌI loại hình tổ chức/đơn vị."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 1", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 1"],
    reviewStatus: "verified"
  },
  {
    id: 2,
    originalQuestion: "Mục đích chủ yếu của chính sách an ninh thông tin của một tổ chức là gì?",
    displayQuestion: "Mục đích chủ yếu của chính sách an ninh thông tin của một tổ chức là gì?",
    originalAnswer: "Theo dõi và kiểm soát thông tin, đảm bảo an toàn cho dữ liệu quan trọng",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-3-security-policy",
    conceptName: "Chính sách An toàn / An ninh Thông tin",
    options: [
      { id: "A", text: "Theo dõi và kiểm soát thông tin, đảm bảo an toàn cho dữ liệu quan trọng", isCorrect: true },
      { id: "B", text: "Thay thế hoàn toàn các giải pháp kỹ thuật bảo vệ đường truyền mạng", isCorrect: false, distractorRationale: "Chính sách là khung quy chế định hướng quản lý, không thể thay thế công cụ kỹ thuật phần cứng/phần mềm." },
      { id: "C", text: "Tự động phát hiện và loại bỏ virus trên tất cả máy tính nhân viên", isCorrect: false, distractorRationale: "Đây là nhiệm vụ của phần mềm chống mã độc (Antivirus/EDR), không phải của văn bản chính sách." },
      { id: "D", text: "Chỉ tập trung xử phạt hành chính đối với các vi phạm của bộ phận IT", isCorrect: false, distractorRationale: "Chính sách an ninh áp dụng đồng bộ cho toàn bộ nhân sự và các cấp trong tổ chức." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Về mặt vận hành thực tế, mục đích chủ yếu của chính sách an ninh thông tin là theo dõi và kiểm soát thông tin, đảm bảo an toàn cho dữ liệu quan trọng của tổ chức.",
      keyTakeaway: "Chính sách ATTT về mặt vận hành: Theo dõi và kiểm soát thông tin, đảm bảo an toàn cho dữ liệu quan trọng."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 2", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 3; Phần V.2"],
    reviewStatus: "verified"
  },
  {
    id: 3,
    originalQuestion: "RSA là giải thuật",
    displayQuestion: "RSA là giải thuật:",
    originalAnswer: "Mã công khai",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-8-pkc-rsa",
    conceptName: "Hệ Mã hóa Khóa công khai / Phi đối xứng (PKC) & RSA",
    options: [
      { id: "A", text: "Mã công khai", isCorrect: true },
      { id: "B", text: "Mã hóa đối xứng", isCorrect: false, distractorRationale: "Mã hóa đối xứng dùng chung 1 khóa như DES, AES; RSA sử dụng cặp khóa bất đối xứng." },
      { id: "C", text: "Hàm băm một chiều", isCorrect: false, distractorRationale: "Hàm băm là hàm nén không có khóa giải mã như MD5, SHA-256." },
      { id: "D", text: "Mã hóa thay thế cổ điển đơn bảng", isCorrect: false, distractorRationale: "Mã hóa thay thế cổ điển là Caesar, không phải giải thuật khóa công khai hiện đại RSA." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "RSA (viết tắt của Ron Rivest, Adi Shamir và Leonard Adleman) là một giải thuật mã hóa khóa công khai (Public Key Cryptography) kinh điển, dựa trên tính bất đối xứng của bài toán phân tích thừa số nguyên tố lớn.",
      keyTakeaway: "RSA = Giải thuật mã công khai (khóa công khai / phi đối xứng)."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 3", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 8"],
    reviewStatus: "verified"
  },
  {
    id: 4,
    originalQuestion: "Loại tiêu chuẩn nào dưới đây cung cấp yêu cầu cho hệ thống quản lý an ninh thông tin (ISMS)?",
    displayQuestion: "Loại tiêu chuẩn nào dưới đây cung cấp yêu cầu cho hệ thống quản lý an ninh thông tin (ISMS)?",
    originalAnswer: "ISO/IEC 27001",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-1-isms-iso27001",
    conceptName: "Hệ thống Quản lý An toàn Thông tin (ISMS) & ISO/IEC 27001",
    options: [
      { id: "A", text: "ISO/IEC 27001", isCorrect: true },
      { id: "B", text: "ISO/IEC 27002", isCorrect: false, distractorRationale: "ISO/IEC 27002 là tiêu chuẩn hướng dẫn thực hiện các biện pháp kiểm soát, không cung cấp yêu cầu chứng nhận ISMS." },
      { id: "C", text: "ISO/IEC 27005", isCorrect: false, distractorRationale: "ISO/IEC 27005 là tiêu chuẩn tập trung chuyên biệt vào quản lý rủi ro an toàn thông tin." },
      { id: "D", text: "ISO 9001", isCorrect: false, distractorRationale: "ISO 9001 là tiêu chuẩn quản lý chất lượng chung, không phải quản lý an ninh thông tin." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "ISO/IEC 27001 là tiêu chuẩn quốc tế cung cấp các yêu cầu (requirements) chính thức cho Hệ thống quản lý an ninh/an toàn thông tin (ISMS) tổng thể của tổ chức.",
      keyTakeaway: "Từ khóa: ISO/IEC 27001 = Cung cấp yêu cầu cho ISMS."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 4", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 1; Bảng 3"],
    reviewStatus: "verified"
  },
  {
    id: 5,
    originalQuestion: "Đâu là phương pháp bảo mật mạng không dây an toàn nhất hiện nay?",
    displayQuestion: "Đâu là phương pháp bảo mật mạng không dây an toàn nhất hiện nay?",
    originalAnswer: "WPA3",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-16-wireless-web-defense",
    conceptName: "Biện pháp Kỹ thuật Bảo vệ Mạng Không dây & Web",
    options: [
      { id: "A", text: "WPA3", isCorrect: true },
      { id: "B", text: "WPA2", isCorrect: false, distractorRationale: "WPA2 ra đời trước WPA3 và dễ bị tổn thương trước tấn công KRACK." },
      { id: "C", text: "WEP", isCorrect: false, distractorRationale: "WEP có thuật toán RC4 bị lỗi nghiêm trọng, bị bẻ khóa dễ dàng." },
      { id: "D", text: "WPA", isCorrect: false, distractorRationale: "WPA sử dụng TKIP đã lỗi thời và không còn an toàn." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "WPA3 (Wi-Fi Protected Access 3) là chuẩn bảo mật Wi-Fi thế hệ mới nhất, cung cấp thuật toán xác thực SAE mạnh mẽ và mã hóa 192-bit trong môi trường doanh nghiệp.",
      keyTakeaway: "WPA3 = Phương pháp bảo mật mạng không dây an toàn nhất hiện nay."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 5", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 16"],
    reviewStatus: "verified"
  },
  {
    id: 6,
    originalQuestion: "Việc truy cập thông tin nhạy cảm, thường xảy ra tại các thiết bịđầu cuối máy tính, bàn làm việc, máy ATM, trên xe bus, máy bay, tàuđiện ngầm – nơi mọi người sử dụng điện thoại thông minh, hoặcnhững nơi nhân viên có thể truy cập thông tin bí mật là",
    displayQuestion: "Việc truy cập thông tin nhạy cảm, thường xảy ra tại các thiết bị đầu cuối máy tính, bàn làm việc, máy ATM, trên xe bus, máy bay, tàu điện ngầm – nơi mọi người sử dụng điện thoại thông minh, hoặc những nơi nhân viên có thể truy cập thông tin bí mật là:",
    originalAnswer: "Shoulder Surfing",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-15-social-engineering",
    conceptName: "Tấn công Phi kỹ thuật (Social Engineering)",
    options: [
      { id: "A", text: "Shoulder Surfing", isCorrect: true },
      { id: "B", text: "Phishing", isCorrect: false, distractorRationale: "Phishing là tấn công lừa đảo người dùng qua email hoặc liên kết giả mạo, không phải quan sát màn hình trực tiếp." },
      { id: "C", text: "Man-in-the-middle", isCorrect: false, distractorRationale: "Man-in-the-middle là kỹ thuật chặn luồng mạng kỹ thuật, không phải nhìn trộm cơ học." },
      { id: "D", text: "Dumpster Diving", isCorrect: false, distractorRationale: "Dumpster Diving là bới thùng rác tìm tài liệu mật bị bỏ quên." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Shoulder Surfing (nhìn trộm qua vai) là hành vi thu thập thông tin nhạy cảm (như mật khẩu, mã PIN) bằng cách quan sát trực tiếp màn hình hoặc bàn phím của nạn nhân tại nơi công cộng hoặc bàn làm việc.",
      keyTakeaway: "Nhìn trộm thông tin tại máy tính/ATM/nơi công cộng = Shoulder Surfing."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 6", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 15"],
    reviewStatus: "verified"
  },
  {
    id: 7,
    originalQuestion: "Back doors là?",
    displayQuestion: "Back doors là?",
    originalAnswer: "Kiểu tấn công có chủ đích bằng phần mềm",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-14-backdoors",
    conceptName: "Cửa hậu (Back doors)",
    options: [
      { id: "A", text: "Kiểu tấn công có chủ đích bằng phần mềm", isCorrect: true },
      { id: "B", text: "Giao thức truyền file bảo mật", isCorrect: false, distractorRationale: "Giao thức truyền file an toàn là SFTP hoặc FTPS." },
      { id: "C", text: "Cơ chế sinh khóa mật mã công khai", isCorrect: false, distractorRationale: "Sinh khóa là thuật toán mật mã học, không liên quan đến Backdoor." },
      { id: "D", text: "Hệ thống tường lửa lọc gói tin", isCorrect: false, distractorRationale: "Tường lửa là biện pháp phòng thủ, trong khi Backdoor là phương thức xâm nhập của mã độc." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Trong bộ câu hỏi môn học, Back doors (cửa hậu) được định danh là 'Kiểu tấn công có chủ đích bằng phần mềm', cho phép kẻ tấn công bí mật vượt qua rào cản xác thực để duy trì quyền điều khiển hệ thống.",
      keyTakeaway: "Back doors = Kiểu tấn công có chủ đích bằng phần mềm."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 7", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 14"],
    reviewStatus: "verified"
  },
  {
    id: 8,
    originalQuestion: "Packet sniffer, Spoofing, Pharming, Man-in-the-middle là các kỹthuật trong",
    displayQuestion: "Packet sniffer, Spoofing, Pharming, Man-in-the-middle là các kỹ thuật trong:",
    originalAnswer: "Tấn công chặn liên lạc",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-12-interception-attacks",
    conceptName: "Tấn công Chặn liên lạc",
    options: [
      { id: "A", text: "Tấn công chặn liên lạc", isCorrect: true },
      { id: "B", text: "Tấn công từ chối dịch vụ (DoS)", isCorrect: false, distractorRationale: "Tấn công DoS nhằm làm sập tài nguyên mạng chứ không nhằm chặn luồng nghe lén liên lạc." },
      { id: "C", text: "Tấn công phi kỹ thuật văn phòng", isCorrect: false, distractorRationale: "Các kỹ thuật trên là tấn công giao thức mạng kỹ thuật chuyên sâu." },
      { id: "D", text: "Kiểm toán an ninh thông tin", isCorrect: false, distractorRationale: "Kiểm toán an ninh là quy trình rà soát quản lý của tổ chức." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Theo bộ câu hỏi ngân hàng đề, 4 kỹ thuật Packet sniffer (bắt gói tin), Spoofing (giả mạo), Pharming (chuyển hướng truy cập) và Man-in-the-middle (người đứng giữa) được xếp chung vào nhóm Tấn công chặn liên lạc.",
      keyTakeaway: "Packet sniffer, Spoofing, Pharming, Man-in-the-middle thuộc nhóm Tấn công chặn liên lạc."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 8", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 12; Phần VI.1"],
    academicNote: "Lưu ý học thuật: Packet sniffer và MITM là nghe lén/chặn bắt gói trực tiếp. Spoofing và Pharming là kỹ thuật giả mạo/chuyển hướng lưu lượng nhằm phục vụ đánh cắp dữ liệu hoặc dẫn tới chặn liên lạc.",
    reviewStatus: "academic_caution"
  },
  {
    id: 9,
    originalQuestion: "Mục tiêu của tấn công từ chối dịch vụ (DoS) là",
    displayQuestion: "Mục tiêu của tấn công từ chối dịch vụ (DoS) là:",
    originalAnswer: "Chặn người dùng hợp pháp truy cập vào các hệ thống nào đó",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-13-dos-attack",
    conceptName: "Tấn công Từ chối Dịch vụ (DoS)",
    options: [
      { id: "A", text: "Chặn người dùng hợp pháp truy cập vào các hệ thống nào đó", isCorrect: true },
      { id: "B", text: "Đánh cắp khóa bí mật trong cơ sở dữ liệu máy chủ", isCorrect: false, distractorRationale: "Mục tiêu DoS là làm cạn kiệt tài nguyên mạng, không tập trung trích xuất khóa bí mật." },
      { id: "C", text: "Mã hóa toàn bộ tập tin để đòi tiền chuộc", isCorrect: false, distractorRationale: "Đây là hành vi của Ransomware (mã độc tống tiền)." },
      { id: "D", text: "Thay đổi cấu hình bảng mã ký tự của thông điệp", isCorrect: false, distractorRationale: "Đây không phải là mục tiêu của tấn công DoS." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Mục tiêu cốt lõi của tấn công từ chối dịch vụ (DoS - Denial of Service) là làm quá tải hoặc làm sập hệ thống, ngăn chặn người dùng hợp pháp truy cập vào các dịch vụ hoặc tài nguyên của hệ thống.",
      keyTakeaway: "Mục tiêu của DoS = Chặn người dùng hợp pháp truy cập vào các hệ thống nào đó."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 9", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 13"],
    reviewStatus: "verified"
  },
  {
    id: 10,
    originalQuestion: "Phát biểu nào sau đây đúng về chữ ký điện tử",
    displayQuestion: "Phát biểu nào sau đây đúng về chữ ký điện tử?",
    originalAnswer: "Chữ ký điện tử có thể sử dụng để xác thực tính toàn vẹn dữ liệu",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-10-digital-signature",
    conceptName: "Chữ ký số & Chữ ký điện tử",
    options: [
      { id: "A", text: "Chữ ký điện tử có thể sử dụng để xác thực tính toàn vẹn dữ liệu", isCorrect: true },
      { id: "B", text: "Chữ ký điện tử chỉ có thể dùng để nén giảm dung lượng file", isCorrect: false, distractorRationale: "Chữ ký điện tử không có chức năng nén dữ liệu." },
      { id: "C", text: "Chữ ký điện tử không có bất kỳ giá trị xác thực nào trong giao dịch", isCorrect: false, distractorRationale: "Chữ ký điện tử có giá trị pháp lý và kỹ thuật xác thực danh tính lẫn toàn vẹn dữ liệu." },
      { id: "D", text: "Chữ ký điện tử bắt buộc phải sử dụng giải thuật mã hóa đối xứng DES", isCorrect: false, distractorRationale: "Chữ ký điện tử dựa trên mật mã khóa công khai, không dựa trên mã đối xứng DES." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Chữ ký điện tử được sử dụng để xác thực tính toàn vẹn của dữ liệu và chứng minh nguồn gốc xuất phát của thông điệp, bảo đảm dữ liệu không bị sửa đổi trái phép sau khi ký.",
      keyTakeaway: "Chữ ký điện tử có thể sử dụng để xác thực tính toàn vẹn dữ liệu."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 10", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 10"],
    reviewStatus: "verified"
  },

  // ==========================================
  // BATCH 2: Q11 - Q20
  // ==========================================
  {
    id: 11,
    originalQuestion: "Chữ ký số giống với hệ mã hóa khóa công khai ở các điểm",
    displayQuestion: "Chữ ký số giống với hệ mã hóa khóa công khai ở điểm nào?",
    originalAnswer: "Cùng sử dụng 2 khóa bí mật và công khai",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-10-digital-signature",
    conceptName: "Chữ ký số & Cơ chế khóa",
    options: [
      { id: "A", text: "Cùng sử dụng 2 khóa bí mật và công khai", isCorrect: true },
      { id: "B", text: "Cùng sử dụng chung một khóa mật duy nhất cho cả người gửi và người nhận", isCorrect: false, distractorRationale: "Đây là đặc điểm của hệ mã hóa khóa đối xứng, không phải chữ ký số hay PKC." },
      { id: "C", text: "Cùng chỉ sử dụng khóa công khai để tạo dữ liệu mà không cần khóa bí mật", isCorrect: false, distractorRationale: "Cả hai đều bắt buộc phải có khóa bí mật kết hợp với khóa công khai." },
      { id: "D", text: "Cùng không thể kết hợp với hàm băm", isCorrect: false, distractorRationale: "Chữ ký số luôn kết hợp chặt chẽ với hàm băm để tạo chữ ký trên digest." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Điểm giống nhau cốt lõi giữa chữ ký số và hệ mã hóa khóa công khai (PKC) là cả hai đều sử dụng một cặp gồm 02 khóa: khóa bí mật và khóa công khai.",
      keyTakeaway: "Điểm giống nhau: Cùng sử dụng 2 khóa bí mật và công khai."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 11", "File_he_thong_hoa_bo_cau_hoi.docx - Bảng 2; Nhóm 2, Đối tượng 10"],
    reviewStatus: "verified"
  },
  {
    id: 12,
    originalQuestion: "Chữ ký số khác với hệ mã hóa khóa công khai ở điểm",
    displayQuestion: "Chữ ký số khác với hệ mã hóa khóa công khai ở điểm nào?",
    originalAnswer: "Sử dụng 02 khóa bí mật và công khai như nhau nhưng vai trò đối tượng tham gia được đổi lại",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-10-digital-signature",
    conceptName: "Chữ ký số vs Mã hóa khóa công khai",
    options: [
      { id: "A", text: "Sử dụng 02 khóa bí mật và công khai như nhau nhưng vai trò đối tượng tham gia được đổi lại", isCorrect: true },
      { id: "B", text: "Chữ ký số chỉ dùng thuật toán đối xứng DES còn PKC dùng RSA", isCorrect: false, distractorRationale: "Chữ ký số dựa trên thuật toán khóa công khai, không dùng mã đối xứng DES." },
      { id: "C", text: "Chữ ký số không cần kiểm tra tính toàn vẹn dữ liệu", isCorrect: false, distractorRationale: "Chữ ký số có mục tiêu hàng đầu là xác thực và đảm bảo tính toàn vẹn dữ liệu." },
      { id: "D", text: "Chữ ký số sử dụng 3 khóa khác nhau", isCorrect: false, distractorRationale: "Chữ ký số chỉ sử dụng một cặp 2 khóa (bí mật và công khai)." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Trong mã hóa bảo mật PKC: Khóa công khai dùng để MÃ HÓA, khóa bí mật dùng để GIẢI MÃ. Trong Chữ ký số: Khóa bí mật dùng để KÝ, khóa công khai dùng để KIỂM TRA chữ ký. Cả hai dùng cặp khóa như nhau nhưng vai trò đối tượng tham gia và thứ tự dùng khóa được đổi ngược lại.",
      keyTakeaway: "Khác biệt: Sử dụng 02 khóa như nhau nhưng vai trò đối tượng tham gia được đổi lại."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 12", "File_he_thong_hoa_bo_cau_hoi.docx - Bảng 2; Nhóm 2, Đối tượng 10"],
    reviewStatus: "verified"
  },
  {
    id: 13,
    originalQuestion: "Kết luận nào sau là đúng:",
    displayQuestion: "Kết luận nào sau đây là đúng về chữ ký số?",
    originalAnswer: "Chữ ký số được hình thành từ các thuật toán mã hóa khóa công khai",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-10-digital-signature",
    conceptName: "Nền tảng của Chữ ký số",
    options: [
      { id: "A", text: "Chữ ký số được hình thành từ các thuật toán mã hóa khóa công khai", isCorrect: true },
      { id: "B", text: "Chữ ký số được hình thành từ thuật toán mã hóa đối xứng DES", isCorrect: false, distractorRationale: "Hệ mã đối xứng không thể tạo ra tính bất đối xứng để một người ký và mọi người kiểm tra." },
      { id: "C", text: "Chữ ký số không thể kiểm tra được bằng phương pháp toán học", isCorrect: false, distractorRationale: "Chữ ký số được kiểm tra chính xác tuyệt đối bằng thuật toán số học với khóa công khai." },
      { id: "D", text: "Chữ ký số bắt buộc phải lưu trữ dưới dạng bản in giấy", isCorrect: false, distractorRationale: "Chữ ký số là chuỗi bit dữ liệu điện tử đi kèm thông điệp số." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Chữ ký số được xây dựng và phát triển trên nền tảng của các thuật toán mã hóa khóa công khai (PKC), sử dụng khóa bí mật để tạo chữ ký và khóa công khai để xác thực.",
      keyTakeaway: "Chữ ký số được hình thành từ các thuật toán mã hóa khóa công khai."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 13", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 10"],
    reviewStatus: "verified"
  },
  {
    id: 14,
    originalQuestion: "Hãy cho biết những đặc điểm đúng về hàm băm",
    displayQuestion: "Hãy cho biết đặc điểm nào sau đây là đúng về hàm băm?",
    originalAnswer: "Với mỗi giá trị đầu vào chỉ duy nhất có một giá trị đầu ra tương ứng",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-9-hash-function",
    conceptName: "Hàm băm Mật mã & Tính tất định",
    options: [
      { id: "A", text: "Với mỗi giá trị đầu vào chỉ duy nhất có một giá trị đầu ra tương ứng", isCorrect: true },
      { id: "B", text: "Với một đầu vào có thể tạo ra nhiều giá trị đầu ra ngẫu nhiên khác nhau", isCorrect: false, distractorRationale: "Hàm băm là hàm xác định (deterministic), không bao giờ sinh ngẫu nhiên." },
      { id: "C", text: "Có thể giải mã ngược để tìm lại thông điệp gốc", isCorrect: false, distractorRationale: "Hàm băm có tính một chiều, không thể giải mã ngược." },
      { id: "D", text: "Độ dài đầu ra thay đổi theo dung lượng của đầu vào", isCorrect: false, distractorRationale: "Kích thước đầu ra của hàm băm luôn cố định." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Tính tất định (deterministic) của hàm băm: Với mỗi giá trị đầu vào xác định, hàm băm sẽ chỉ cho duy nhất một giá trị đầu ra băm tương ứng.",
      keyTakeaway: "Đặc điểm hàm băm: Với mỗi giá trị đầu vào chỉ duy nhất có một giá trị đầu ra tương ứng."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 14", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 9"],
    reviewStatus: "verified"
  },
  {
    id: 15,
    originalQuestion: "Một thông điệp có độ lớn là 1024 byte. Sau khi qua hàm băm lần 1 thu được kết quả là 512 byte. Hỏi nếu qua 3 lần hàm băm liên tiếp ta thu được kết quả bao nhiêu?",
    displayQuestion: "Một thông điệp có độ lớn là 1024 byte. Sau khi qua hàm băm lần 1 thu được kết quả là 512 byte. Hỏi nếu qua 3 lần hàm băm liên tiếp ta thu được kết quả bao nhiêu?",
    originalAnswer: "512 byte",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-9-hash-function",
    conceptName: "Hàm băm Mật mã & Độ dài đầu ra cố định",
    options: [
      { id: "A", text: "512 byte", isCorrect: true },
      { id: "B", text: "128 byte", isCorrect: false, distractorRationale: "Bẫy tính sai: lấy 1024 chia đôi 3 lần (1024 -> 512 -> 256 -> 128 byte). Hàm băm không chia đôi dung lượng mà cho ra kích thước cố định." },
      { id: "C", text: "256 byte", isCorrect: false, distractorRationale: "Bẫy chia đôi dung lượng sau 2 lần băm." },
      { id: "D", text: "64 byte", isCorrect: false, distractorRationale: "Bẫy giả định kích thước suy giảm theo cấp số nhân." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Hàm băm có đặc tính cốt lõi là ánh xạ thông điệp đầu vào có kích thước bất kỳ thành đầu ra CÓ ĐỘ DÀI CỐ ĐỊNH. Khi hàm băm đã có kích thước đầu ra là 512 byte ở lần 1, thì lấy kết quả đó băm tiếp lần 2, lần 3 hay n lần liên tiếp (cùng một hàm băm) thì kết quả cuối cùng vẫn giữ nguyên độ dài cố định là 512 byte.",
      keyTakeaway: "Độ dài đầu ra của hàm băm luôn CỐ ĐỊNH: Băm n lần liên tiếp kết quả vẫn là 512 byte."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 15", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 9; Phần V.2"],
    academicNote: "Bẫy kinh điển: Thí sinh hay lấy 1024/2^3 = 128 byte vì tưởng hàm băm chia đôi kích thước. Bản chất: Hàm băm luôn cho ra độ dài cố định xác định bởi thuật toán.",
    reviewStatus: "verified"
  },
  {
    id: 16,
    originalQuestion: "Giải thuật nào sau đây là không dùng khóa đối xứng",
    displayQuestion: "Giải thuật nào sau đây KHÔNG dùng khóa đối xứng?",
    originalAnswer: "El-Gamal",
    answerType: "single_choice",
    questionPolarity: "negative",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-8-pkc-rsa",
    conceptName: "Hệ Mã hóa Khóa công khai & El-Gamal",
    options: [
      { id: "A", text: "El-Gamal", isCorrect: true },
      { id: "B", text: "DES", isCorrect: false, distractorRationale: "DES là giải thuật mã hóa khóa đối xứng kinh điển của NIST." },
      { id: "C", text: "3-DES", isCorrect: false, distractorRationale: "Triple DES là thuật toán mã hóa khóa đối xứng mở rộng từ DES." },
      { id: "D", text: "AES", isCorrect: false, distractorRationale: "AES là tiêu chuẩn mã hóa khóa đối xứng hiện đại." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "El-Gamal là giải thuật mã hóa thuộc hệ mã khóa công khai (bất đối xứng), dựa trên bài toán logarit rời rạc. DES, 3-DES và AES đều là các giải thuật mã hóa khóa đối xứng.",
      keyTakeaway: "El-Gamal = Giải thuật không dùng khóa đối xứng (thuộc hệ mã khóa công khai)."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 16", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 8"],
    reviewStatus: "verified"
  },
  {
    id: 17,
    originalQuestion: "Ưu điểm của hệ mã khóa bí mật so với hệ mã hóa khóa công khai là",
    displayQuestion: "Ưu điểm của hệ mã khóa bí mật so với hệ mã hóa khóa công khai là gì?",
    originalAnswer: "Tốc độ xử lý của hệ mã khóa bí mật cao hơn hệ mã khóa công khai",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-7-symmetric-des-aes",
    conceptName: "Ưu điểm Hệ mã khóa bí mật (Đối xứng)",
    options: [
      { id: "A", text: "Tốc độ xử lý của hệ mã khóa bí mật cao hơn hệ mã khóa công khai", isCorrect: true },
      { id: "B", text: "Quản lý và phân phối khóa dễ dàng trên diện rộng", isCorrect: false, distractorRationale: "Phân phối khóa là nhược điểm lớn nhất của hệ mã khóa đối xứng." },
      { id: "C", text: "Tự động xác thực danh tính người gửi chống chối bỏ", isCorrect: false, distractorRationale: "Mã hóa đối xứng dùng chung 1 khóa nên không thể tạo chữ ký số chống chối bỏ." },
      { id: "D", text: "Không cần chia sẻ bí mật giữa các bên", isCorrect: false, distractorRationale: "Hai bên bắt buộc phải chia sẻ chung khóa mật." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Hệ mã khóa bí mật (đối xứng) thực hiện các phép toán thao tác bit trực tiếp rất nhanh, do đó ưu điểm vượt trội là tốc độ xử lý cao hơn nhiều so với hệ mã hóa khóa công khai.",
      keyTakeaway: "Ưu điểm hệ mã khóa bí mật: Tốc độ xử lý cao hơn hệ mã hóa khóa công khai."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 17", "File_he_thong_hoa_bo_cau_hoi.docx - Bảng 1; Nhóm 2, Đối tượng 7"],
    reviewStatus: "verified"
  },
  {
    id: 18,
    originalQuestion: "Nhược điểm của các hệ mã mật khóa công khai là",
    displayQuestion: "Nhược điểm của các hệ mã mật khóa công khai là gì?",
    originalAnswer: "Tốc độ xử lý của thuật toán chậm",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-8-pkc-rsa",
    conceptName: "Nhược điểm Hệ mã khóa công khai",
    options: [
      { id: "A", text: "Tốc độ xử lý của thuật toán chậm", isCorrect: true },
      { id: "B", text: "Khó khăn trong việc công khai khóa ra cộng đồng", isCorrect: false, distractorRationale: "Khóa công khai được thiết kế để phân phối tự do mà không sợ lộ." },
      { id: "C", text: "Bắt buộc người gửi và người nhận phải dùng chung một khóa", isCorrect: false, distractorRationale: "Đây là đặc điểm của hệ mã đối xứng; PKC dùng 2 khóa riêng biệt." },
      { id: "D", text: "Không thể ứng dụng trong chữ ký số", isCorrect: false, distractorRationale: "PKC chính là nền tảng cốt lõi của chữ ký số." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Do phải thực hiện các phép tính toán số học trên các số nguyên rất lớn (như phép tính số mũ modulo), nhược điểm lớn của hệ mã khóa công khai là tốc độ xử lý của thuật toán chậm.",
      keyTakeaway: "Nhược điểm hệ mã khóa công khai: Tốc độ xử lý của thuật toán chậm."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 18", "File_he_thong_hoa_bo_cau_hoi.docx - Bảng 1; Nhóm 2, Đối tượng 8"],
    reviewStatus: "verified"
  },
  {
    id: 19,
    originalQuestion: "PKC được hiểu là :",
    displayQuestion: "PKC được hiểu là:",
    originalAnswer: "Hệ mã khóa phi đối xứng",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-8-pkc-rsa",
    conceptName: "Thuật ngữ PKC",
    options: [
      { id: "A", text: "Hệ mã khóa phi đối xứng", isCorrect: true },
      { id: "B", text: "Hệ mã hóa đối xứng khóa đơn", isCorrect: false, distractorRationale: "Hệ mã hóa đối xứng là Symmetric Cryptography, không phải PKC." },
      { id: "C", text: "Giao thức kiểm soát đường truyền mạng", isCorrect: false, distractorRationale: "PKC là thuật ngữ mật mã học (Public Key Cryptography), không phải giao thức mạng." },
      { id: "D", text: "Quy chuẩn đánh giá chứng chỉ SSL", isCorrect: false, distractorRationale: "PKI là hạ tầng khóa công khai, còn PKC là hệ mật mã khóa công khai/phi đối xứng." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "PKC là viết tắt của Public Key Cryptography, trong tiếng Việt tương đương với Hệ mã khóa công khai hoặc Hệ mã khóa phi đối xứng.",
      keyTakeaway: "PKC = Public Key Cryptography = Hệ mã khóa phi đối xứng."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 19", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 8"],
    reviewStatus: "verified"
  },
  {
    id: 20,
    originalQuestion: "Có mấy phương pháp chính cho việc mã hoá và giải mã",
    displayQuestion: "Có mấy phương pháp chính cho việc mã hoá và giải mã?",
    originalAnswer: "Ba ( mã hóa khóa đối xứng , mã hóa khóa công khai , hàm băm )",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-5-encryption-methods",
    conceptName: "Các Phương pháp Mật mã Chính",
    options: [
      { id: "A", text: "Ba ( mã hóa khóa đối xứng , mã hóa khóa công khai , hàm băm )", isCorrect: true },
      { id: "B", text: "Hai (mã hóa đối xứng và mã hóa phi đối xứng)", isCorrect: false, distractorRationale: "Theo ngân hàng đề môn học, phân loại gồm 3 phương pháp chính bao gồm cả hàm băm." },
      { id: "C", text: "Bốn (mã Caesar, DES, RSA và chữ ký số)", isCorrect: false, distractorRationale: "Đây là các thuật toán và ứng dụng cụ thể, không phải 3 phương pháp phân loại chính." },
      { id: "D", text: "Chỉ có một phương pháp duy nhất là mã hóa thay thế", isCorrect: false, distractorRationale: "Mã hóa thay thế chỉ là một nhánh nhỏ của mật mã cổ điển." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Theo quy ước của ngân hàng câu hỏi đề thi, có 3 phương pháp chính được liệt kê cho mã hóa và giải mã là: Ba (mã hóa khóa đối xứng, mã hóa khóa công khai, hàm băm).",
      keyTakeaway: "Đáp án theo đề thi: Có 3 phương pháp chính: mã hóa khóa đối xứng, mã hóa khóa công khai, hàm băm."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 20", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 5; Phần VI.1"],
    academicNote: "Lưu ý học thuật: Trong mật mã học hiện đại chuẩn (và tại Câu 46 của đề), hàm băm là hàm một chiều dùng để kiểm tra tính toàn vẹn, không có khả năng giải mã ngược. Tuy nhiên khi thi trắc nghiệm theo ngân hàng đề này, cần chọn đáp án 'Ba (mã hóa khóa đối xứng, mã hóa khóa công khai, hàm băm)'.",
    reviewStatus: "academic_caution"
  },

  // ==========================================
  // BATCH 3: Q21 - Q30
  // ==========================================
  {
    id: 21,
    originalQuestion: "Trong hệ mã hóa khóa công khai nhận định nào sau đây là ĐÚNG ?",
    displayQuestion: "Trong hệ mã hóa khóa công khai nhận định nào sau đây là ĐÚNG?",
    originalAnswer: "Sử dụng khóa công khai để MÃ HÓA , khóa bí mật để GIẢI MÃ",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-8-pkc-rsa",
    conceptName: "Cơ chế Mã hóa Khóa công khai",
    options: [
      { id: "A", text: "Sử dụng khóa công khai để MÃ HÓA , khóa bí mật để GIẢI MÃ", isCorrect: true },
      { id: "B", text: "Sử dụng khóa bí mật để MÃ HÓA , khóa công khai để GIẢI MÃ", isCorrect: false, distractorRationale: "Đây là chiều dùng khóa trong tạo và kiểm tra chữ ký số, không phải để bảo mật mã hóa thông điệp." },
      { id: "C", text: "Sử dụng cùng một khóa duy nhất cho cả mã hóa và giải mã", isCorrect: false, distractorRationale: "Đây là cơ chế của hệ mã hóa khóa đối xứng." },
      { id: "D", text: "Khóa công khai và khóa bí mật có thể tùy ý hoán đổi vai trò mã hóa bảo mật", isCorrect: false, distractorRationale: "Để bảo mật thông điệp gửi cho người nhận, chỉ người gửi dùng khóa công khai của người nhận để mã hóa, và chỉ người nhận dùng khóa bí mật của mình để giải mã." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Trong việc truyền thông điệp bí mật bằng hệ mã hóa khóa công khai: Người gửi sử dụng khóa công khai (của người nhận) để MÃ HÓA thông điệp, và người nhận sử dụng khóa bí mật (của mình) để GIẢI MÃ.",
      keyTakeaway: "Quy tắc mã hóa PKC: Khóa công khai để MÃ HÓA, khóa bí mật để GIẢI MÃ."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 21", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 8; Bảng 2"],
    reviewStatus: "verified"
  },
  {
    id: 22,
    originalQuestion: "Nhận định nào là SAI trong hệ mã hóa PKC ?",
    displayQuestion: "Nhận định nào sau đây là SAI trong hệ mã hóa PKC?",
    originalAnswer: "Sử dụng một khóa mật chung cho cả hai hệ mã",
    answerType: "single_choice",
    questionPolarity: "negative",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-8-pkc-rsa",
    conceptName: "Nhận định về Hệ mã PKC",
    options: [
      { id: "A", text: "Sử dụng một khóa mật chung cho cả hai hệ mã", isCorrect: true },
      { id: "B", text: "Sử dụng hai khóa khác nhau là khóa công khai và khóa bí mật", isCorrect: false, distractorRationale: "Đây là nhận định ĐÚNG về PKC." },
      { id: "C", text: "Tốc độ xử lý của thuật toán chậm hơn so với mã hóa đối xứng", isCorrect: false, distractorRationale: "Đây là nhận định ĐÚNG về PKC." },
      { id: "D", text: "Khóa công khai có thể phân phối tự do trên mạng", isCorrect: false, distractorRationale: "Đây là nhận định ĐÚNG về PKC." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Trong hệ mã hóa khóa công khai (PKC), mỗi bên sở hữu một cặp gồm 2 khóa riêng biệt (khóa công khai và khóa bí mật). Phát biểu 'Sử dụng một khóa mật chung cho cả hai hệ mã' là hoàn toàn SAI (đây là đặc điểm của hệ mã đối xứng).",
      keyTakeaway: "Nhận định SAI về PKC: Sử dụng một khóa mật chung cho cả hai hệ mã."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 22", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 8"],
    reviewStatus: "verified"
  },
  {
    id: 23,
    originalQuestion: "Chữ ký số là gì ?",
    displayQuestion: "Chữ ký số là gì?",
    originalAnswer: "Sử dụng khóa bí mật để ký , khóa công khai để kiểm tra chữ ký",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-10-digital-signature",
    conceptName: "Cơ chế Chữ ký số",
    options: [
      { id: "A", text: "Sử dụng khóa bí mật để ký , khóa công khai để kiểm tra chữ ký", isCorrect: true },
      { id: "B", text: "Sử dụng khóa công khai để ký , khóa bí mật để kiểm tra chữ ký", isCorrect: false, distractorRationale: "Nếu dùng khóa công khai để ký thì ai cũng ký được, mất đi tính xác thực người gửi." },
      { id: "C", text: "Sử dụng khóa đối xứng chia sẻ trước để tạo dấu chứng thực", isCorrect: false, distractorRationale: "Khóa đối xứng không dùng để tạo chữ ký số chống chối bỏ." },
      { id: "D", text: "Hình ảnh chữ ký quét tay chèn vào tài liệu PDF", isCorrect: false, distractorRationale: "Chữ ký tay quét hình chỉ là chữ ký điện tử đơn giản, không phải cơ chế mật mã học của chữ ký số." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Chữ ký số hoạt động dựa trên cơ chế: Người gửi sử dụng khóa bí mật của mình để KÝ (tạo chữ ký), và người nhận hoặc bên thứ ba sử dụng khóa công khai của người gửi để KIỂM TRA tính hợp lệ của chữ ký.",
      keyTakeaway: "Chữ ký số: Khóa bí mật để KÝ, khóa công khai để KIỂM TRA chữ ký."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 23", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 10; Bảng 2"],
    reviewStatus: "verified"
  },
  {
    id: 24,
    originalQuestion: "Nhận định nào sau đây ĐÚNG về chữ ký số ?",
    displayQuestion: "Nhận định nào sau đây ĐÚNG về chữ ký số?",
    originalAnswer: "Một phép kiểm tra trong đó nhiều người có thể kiểm tra nhưng chỉ một người được tạo chữ ký",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-10-digital-signature",
    conceptName: "Bản chất Phép kiểm tra Chữ ký số",
    options: [
      { id: "A", text: "Một phép kiểm tra trong đó nhiều người có thể kiểm tra nhưng chỉ một người được tạo chữ ký", isCorrect: true },
      { id: "B", text: "Một phép kiểm tra trong đó nhiều người cùng tạo chữ ký nhưng chỉ một người kiểm tra được", isCorrect: false, distractorRationale: "Sai bản chất: chỉ người sở hữu khóa bí mật mới tạo được chữ ký." },
      { id: "C", text: "Bất kỳ ai cũng có thể giả mạo chữ ký nếu biết nội dung văn bản", isCorrect: false, distractorRationale: "Không thể giả mạo nếu không có khóa bí mật của người ký." },
      { id: "D", text: "Chữ ký số không phụ thuộc vào nội dung thông điệp", isCorrect: false, distractorRationale: "Chữ ký số gắn liền với nội dung thông điệp; thông điệp đổi thì chữ ký thay đổi ngay lập tức." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Bản chất của chữ ký số là: Chỉ có một người duy nhất tạo được chữ ký (người nắm giữ khóa bí mật), nhưng nhiều người có thể kiểm tra được chữ ký đó (bằng cách dùng khóa công khai được công bố rộng rãi).",
      keyTakeaway: "Đặc điểm đúng của chữ ký số: Nhiều người có thể kiểm tra nhưng chỉ một người được tạo chữ ký."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 24", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 10"],
    reviewStatus: "verified"
  },
  {
    id: 25,
    originalQuestion: "Mã hóa nào sau đây là 1 tiêu chuẩn dùng để phát triển cho việc tạo ra thông điệp an toàn",
    displayQuestion: "Mã hóa nào sau đây là 1 tiêu chuẩn dùng để phát triển cho việc tạo ra thông điệp an toàn?",
    originalAnswer: "Data Encryption Standard",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-7-symmetric-des-aes",
    conceptName: "Tiêu chuẩn DES",
    options: [
      { id: "A", text: "Data Encryption Standard", isCorrect: true },
      { id: "B", text: "Domain Name System", isCorrect: false, distractorRationale: "DNS là hệ thống phân giải tên miền, không phải tiêu chuẩn mã hóa thông điệp." },
      { id: "C", text: "Dynamic Host Configuration Protocol", isCorrect: false, distractorRationale: "DHCP là giao thức cấu hình IP động trong mạng máy tính." },
      { id: "D", text: "Digital Signature Algorithm", isCorrect: false, distractorRationale: "DSA là thuật toán chữ ký số, không phải tên tiêu chuẩn phát triển mã hóa thông điệp DES." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Data Encryption Standard (DES) là tiêu chuẩn mã hóa dữ liệu đối xứng được phát triển và công bố bởi NBS (nay là NIST) vào những năm 1970 để tạo ra các thông điệp an toàn trong cơ quan và thương mại.",
      keyTakeaway: "Data Encryption Standard = Tiêu chuẩn mã hóa dùng để phát triển tạo thông điệp an toàn."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 25", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 7"],
    reviewStatus: "verified"
  },
  {
    id: 26,
    originalQuestion: "DES là viết tắt của từ nào",
    displayQuestion: "DES là viết tắt của từ nào?",
    originalAnswer: "Data encryption standard",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-7-symmetric-des-aes",
    conceptName: "Định nghĩa viết tắt DES",
    options: [
      { id: "A", text: "Data encryption standard", isCorrect: true },
      { id: "B", text: "Digital encryption system", isCorrect: false, distractorRationale: "Sai từ viết tắt chuẩn mực của NIST." },
      { id: "C", text: "Data electronic security", isCorrect: false, distractorRationale: "Sai thuật ngữ chuyên ngành." },
      { id: "D", text: "Direct encoding service", isCorrect: false, distractorRationale: "Sai nghĩa thuật ngữ." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "DES là viết tắt của cụm từ tiếng Anh 'Data Encryption Standard' (Tiêu chuẩn mã hóa dữ liệu).",
      keyTakeaway: "DES = Data Encryption Standard."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 26", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 7"],
    reviewStatus: "verified"
  },
  {
    id: 27,
    originalQuestion: "Trên thực tế, có thể giảm khả năng bị tấn công nếu có thể...",
    displayQuestion: "Trên thực tế, có thể giảm khả năng bị tấn công nếu có thể:",
    originalAnswer: "Giảm thiểu các lỗ hổng bảo mật",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-11-security-vulnerability",
    conceptName: "Lỗ hổng Bảo mật & Nguy cơ Tấn công",
    options: [
      { id: "A", text: "Giảm thiểu các lỗ hổng bảo mật", isCorrect: true },
      { id: "B", text: "Tắt hoàn toàn các dịch vụ sao lưu dữ liệu dự phòng", isCorrect: false, distractorRationale: "Tắt sao lưu làm tăng rủi ro mất mát dữ liệu nghiêm trọng." },
      { id: "C", text: "Cho phép tất cả người dùng sử dụng chung một tài khoản quản trị", isCorrect: false, distractorRationale: "Vi phạm nghiêm trọng nguyên tắc phân quyền và kiểm soát truy cập." },
      { id: "D", text: "Không cài đặt bất kỳ bản vá lỗi nào từ nhà sản xuất", isCorrect: false, distractorRationale: "Không cập nhật bản vá sẽ để lộ lỗ hổng cho hacker khai thác." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Lỗ hổng bảo mật là điểm yếu mà kẻ tấn công khai thác để thâm nhập hệ thống. Vì vậy, trên thực tế có thể giảm khả năng bị tấn công nếu giảm thiểu được các lỗ hổng bảo mật thông qua vá lỗi, rà soát mã nguồn và cấu hình an toàn.",
      keyTakeaway: "Giảm khả năng bị tấn công bằng cách: Giảm thiểu các lỗ hổng bảo mật."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 27", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 11"],
    reviewStatus: "verified"
  },
  {
    id: 28,
    originalQuestion: "Các bước thực thi quản lí ATTT:",
    displayQuestion: "Các bước thực thi quản lý an toàn thông tin gồm:",
    originalAnswer: "Lập kế hoạch (Plan), Thực thi kế hoạch (Do), Giám sát kết quả thực hiện (Monitor), Thực hiện các kiểm soát (Control).",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-2-isms-governance",
    conceptName: "Các bước Thực thi Quản lý ATTT",
    options: [
      { id: "A", text: "Lập kế hoạch (Plan), Thực thi kế hoạch (Do), Giám sát kết quả thực hiện (Monitor), Thực hiện các kiểm soát (Control).", isCorrect: true },
      { id: "B", text: "Khởi động (Start), Vận hành (Run), Tạm dừng (Pause), Kết thúc (End).", isCorrect: false, distractorRationale: "Không thuộc quy trình quản lý ATTT chuẩn mực." },
      { id: "C", text: "Mã hóa (Encrypt), Truyền tin (Transfer), Nhận tin (Receive), Giải mã (Decrypt).", isCorrect: false, distractorRationale: "Đây là quy trình mã hóa truyền tin mật mã, không phải quy trình quản lý ATTT." },
      { id: "D", text: "Đánh giá (Assess), Tấn công (Attack), Báo cáo (Report), Sửa chữa (Fix).", isCorrect: false, distractorRationale: "Đây là các bước kiểm thử xâm nhập (Penetration Testing), không phải thực thi quản lý ATTT." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Theo ngân hàng câu hỏi đề thi, các bước thực thi quản lý ATTT được xác định theo chuỗi 4 bước: Lập kế hoạch (Plan), Thực thi kế hoạch (Do), Giám sát kết quả thực hiện (Monitor), Thực hiện các kiểm soát (Control).",
      keyTakeaway: "Các bước thực thi quản lý ATTT: Plan -> Do -> Monitor -> Control."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 28", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 2; Phần VI.1"],
    academicNote: "Lưu ý học thuật: Trong ISO/IEC 27001, chu trình ISMS chuẩn là PDCA (Plan - Do - Check - Act), còn chu trình Quản lý rủi ro gồm Identify - Assess - Plan - Implement - Monitor - Control. Đáp án Câu 28 là tổ hợp kết hợp đặc thù trong ngân hàng đề, cần ghi nhớ chính xác khi đi thi.",
    reviewStatus: "academic_caution"
  },
  {
    id: 29,
    originalQuestion: "Một trong các điểm yếu của các hệ mã hóa khóa đối xứng là:",
    displayQuestion: "Một trong các điểm yếu của các hệ mã hóa khóa đối xứng là:",
    originalAnswer: "Khó khăn trong quản lý và phân phối khóa",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-7-symmetric-des-aes",
    conceptName: "Điểm yếu Hệ mã Khóa đối xứng",
    options: [
      { id: "A", text: "Khó khăn trong quản lý và phân phối khóa", isCorrect: true },
      { id: "B", text: "Tốc độ xử lý mã hóa dữ liệu quá chậm", isCorrect: false, distractorRationale: "Mã hóa đối xứng có tốc độ rất nhanh, tốc độ chậm là nhược điểm của PKC." },
      { id: "C", text: "Kích thước bản mã luôn lớn gấp 10 lần bản rõ", isCorrect: false, distractorRationale: "Kích thước bản mã trong mã đối xứng xấp xỉ bằng bản rõ." },
      { id: "D", text: "Không thể mã hóa được các tệp văn bản lớn", isCorrect: false, distractorRationale: "Mã hóa đối xứng là giải pháp tiêu chuẩn tối ưu để mã hóa dữ liệu lớn và file dung lượng cao." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Điểm yếu lớn nhất của hệ mã hóa khóa đối xứng là việc trao đổi, phân phối và lưu trữ khóa an toàn giữa các bên: Với n người tham gia cần n(n-1)/2 khóa, rất khó khăn và dễ bị lộ khóa trên đường truyền.",
      keyTakeaway: "Điểm yếu của hệ mã hóa đối xứng: Khó khăn trong quản lý và phân phối khóa."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 29", "File_he_thong_hoa_bo_cau_hoi.docx - Bảng 1; Nhóm 2, Đối tượng 7"],
    reviewStatus: "verified"
  },
  {
    id: 30,
    originalQuestion: "Các giải thuật mã hóa khóa đối xứng thông dụng gồm:",
    displayQuestion: "Các giải thuật mã hóa khóa đối xứng thông dụng gồm:",
    originalAnswer: "DES, 3-DES, AES",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-7-symmetric-des-aes",
    conceptName: "Các Giải thuật Khóa đối xứng Thông dụng",
    options: [
      { id: "A", text: "DES, 3-DES, AES", isCorrect: true },
      { id: "B", text: "RSA, El-Gamal, ECC", isCorrect: false, distractorRationale: "Đây là các thuật toán mã hóa khóa công khai (bất đối xứng)." },
      { id: "C", text: "MD5, SHA-1, SHA-256", isCorrect: false, distractorRationale: "Đây là các thuật toán hàm băm một chiều, không phải mã hóa đối xứng." },
      { id: "D", text: "Diffie-Hellman, DSA, RSA", isCorrect: false, distractorRationale: "Diffie-Hellman là giao thức trao đổi khóa, DSA là chữ ký số, RSA là mã công khai." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Các thuật toán mã hóa khóa đối xứng (khóa bí mật) tiêu biểu và thông dụng nhất trong mật mã học gồm có DES, 3-DES (Triple DES) và AES.",
      keyTakeaway: "Thuật toán mã hóa đối xứng thông dụng: DES, 3-DES, AES."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 30", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 7; Bảng 1"],
    reviewStatus: "verified"
  },

  // ==========================================
  // BATCH 4: Q31 - Q40
  // ==========================================
  {
    id: 31,
    originalQuestion: "Nguy cơ xâm nhập nào thường do lỗi lập trình hoặc sự cố phần mềm?",
    displayQuestion: "Nguy cơ xâm nhập nào thường do lỗi lập trình hoặc sự cố phần mềm?",
    originalAnswer: "Lỗ hổng bảo mật",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-11-security-vulnerability",
    conceptName: "Lỗ hổng Bảo mật",
    options: [
      { id: "A", text: "Lỗ hổng bảo mật", isCorrect: true },
      { id: "B", text: "Mất điện đột ngột tại trung tâm dữ liệu", isCorrect: false, distractorRationale: "Mất điện là sự cố hạ tầng vật lý, không phải do lỗi lập trình." },
      { id: "C", text: "Sao lưu dữ liệu định kỳ trên máy chủ", isCorrect: false, distractorRationale: "Sao lưu là quy trình an toàn dự phòng, không phải nguy cơ xâm nhập." },
      { id: "D", text: "Chuẩn mã hóa AES hỗ trợ khóa 256 bit", isCorrect: false, distractorRationale: "Đây là thuật toán mật mã bảo vệ dữ liệu." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Lỗ hổng bảo mật (security vulnerability) là các khiếm khuyết phát sinh chủ yếu do lỗi lập trình hoặc sự cố phần mềm, tạo điều kiện cho tin tặc khai thác để xâm nhập hệ thống.",
      keyTakeaway: "Nguy cơ do lỗi lập trình hoặc sự cố phần mềm = Lỗ hổng bảo mật."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 31", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 11"],
    reviewStatus: "verified"
  },
  {
    id: 32,
    originalQuestion: "Cách nào giúp bảo vệ thông tin trong quá trình truyền tin?",
    displayQuestion: "Cách nào giúp bảo vệ thông tin trong quá trình truyền tin?",
    originalAnswer: "Mã hóa",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-5-encryption-methods",
    conceptName: "Mã hóa Truyền tin",
    options: [
      { id: "A", text: "Mã hóa", isCorrect: true },
      { id: "B", text: "Gửi dưới dạng văn bản thuần không khóa bảo vệ", isCorrect: false, distractorRationale: "Văn bản thuần (plaintext) dễ dàng bị nghe lén trên đường truyền mạng." },
      { id: "C", text: "Tăng kích thước font chữ của tài liệu trước khi gửi", isCorrect: false, distractorRationale: "Thay đổi định dạng hiển thị không có tác dụng bảo vệ an toàn thông tin." },
      { id: "D", text: "Chia sẻ mật khẩu bảo vệ tài liệu công khai trong email", isCorrect: false, distractorRationale: "Chia sẻ mật khẩu công khai làm mất hoàn toàn tính bảo mật." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Mã hóa (Encryption) là phương pháp biến đổi bản rõ thành bản mã khó hiểu nhằm bảo vệ tính bí mật của thông tin trong suốt quá trình truyền trên mạng, đảm bảo chỉ người có khóa hợp lệ mới đọc được.",
      keyTakeaway: "Bảo vệ thông tin trong quá trình truyền tin = Mã hóa."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 32", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 5"],
    reviewStatus: "verified"
  },
  {
    id: 33,
    originalQuestion: "Khi nhận được cuộc gọi yêu cầu bổ sung thông tin cá nhân để quyết toán thuế, bạn sẽ:",
    displayQuestion: "Khi nhận được cuộc gọi yêu cầu bổ sung thông tin cá nhân để quyết toán thuế, bạn sẽ:",
    originalAnswer: "Xác thực người gọi và thông tin người gọi. Sau đó lên trang web chính thống của tổng cục thuế để kiểm tra.",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-15-social-engineering",
    conceptName: "Phòng vệ Lừa đảo Giả mạo (Social Engineering)",
    options: [
      { id: "A", text: "Xác thực người gọi và thông tin người gọi. Sau đó lên trang web chính thống của tổng cục thuế để kiểm tra.", isCorrect: true },
      { id: "B", text: "Cung cấp ngay toàn bộ số tài khoản ngân hàng và mã OTP để hoàn tất nhanh chóng", isCorrect: false, distractorRationale: "Hành vi cực kỳ nguy hiểm, rơi vào bẫy lừa đảo tài chính." },
      { id: "C", text: "Chuyển tiền vào tài khoản cá nhân của người gọi để nộp phạt trước", isCorrect: false, distractorRationale: "Cơ quan nhà nước không bao giờ yêu cầu chuyển tiền vào tài khoản cá nhân qua điện thoại." },
      { id: "D", text: "Tải ngay ứng dụng theo đường link lạ được gửi qua tin nhắn Zalo/SMS", isCorrect: false, distractorRationale: "Đây là chiêu trò cài cắm phần mềm gián điệp đánh cắp mã OTP." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Biện pháp xử lý chuẩn trước các cuộc gọi có dấu hiệu lừa đảo phi kỹ thuật: Tuyệt đối không cung cấp thông tin cá nhân qua điện thoại; cần xác thực danh tính người gọi và tự mình truy cập cổng thông tin chính thức của cơ quan thuế để đối chiếu.",
      keyTakeaway: "Xử lý cuộc gọi giả mạo: Xác thực người gọi và kiểm tra trên trang web chính thống của Tổng cục Thuế."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 33", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 15"],
    reviewStatus: "verified"
  },
  {
    id: 34,
    originalQuestion: "Làm cách nào để không bị lộ lịch sử tìm kiếm web khi sử dụng máy tính dùng chung?",
    displayQuestion: "Làm cách nào để không bị lộ lịch sử tìm kiếm web khi sử dụng máy tính dùng chung?",
    originalAnswer: "Mở trình duyệt trong chế độ ẩn danh, chế độ riêng tư. Tắt trình duyệt sau khi sử dụng.",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-16-wireless-web-defense",
    conceptName: "Bảo vệ Quyền riêng tư Trình duyệt",
    options: [
      { id: "A", text: "Mở trình duyệt trong chế độ ẩn danh, chế độ riêng tư. Tắt trình duyệt sau khi sử dụng.", isCorrect: true },
      { id: "B", text: "Thu nhỏ cửa sổ trình duyệt xuống thanh Taskbar khi rời đi", isCorrect: false, distractorRationale: "Người dùng tiếp theo vẫn mở lên xem được toàn bộ phiên làm việc." },
      { id: "C", text: "Lưu toàn bộ mật khẩu vào trình duyệt để lần sau truy cập nhanh hơn", isCorrect: false, distractorRationale: "Lưu mật khẩu trên máy dùng chung sẽ khiến người khác dễ dàng chiếm đoạt tài khoản." },
      { id: "D", text: "Chỉ tắt màn hình máy tính mà không tắt ứng dụng", isCorrect: false, distractorRationale: "Không ngăn được việc lộ dữ liệu khi người khác bật màn hình lên." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Chế độ ẩn danh / riêng tư (Incognito/Private Mode) ngăn trình duyệt ghi lại lịch sử duyệt web, cookie và dữ liệu biểu mẫu trên máy cục bộ, và việc tắt trình duyệt sẽ xóa phiên làm việc tạm thời đó ngay lập tức.",
      keyTakeaway: "Bảo vệ lịch sử duyệt web trên máy tính dùng chung: Mở chế độ ẩn danh/riêng tư và tắt trình duyệt sau khi dùng."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 34", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 16"],
    reviewStatus: "verified"
  },
  {
    id: 35,
    originalQuestion: "Làm thế nào để nhận biết một trang web an toàn?",
    displayQuestion: "Làm thế nào để nhận biết một trang web an toàn?",
    originalAnswer: "Kiểm tra 'https', biểu tượng ổ khóa, và chứng chỉ SSL.",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-16-wireless-web-defense",
    conceptName: "Dấu hiệu Nhận biết Trang Web An toàn",
    options: [
      { id: "A", text: "Kiểm tra 'https', biểu tượng ổ khóa, và chứng chỉ SSL.", isCorrect: true },
      { id: "B", text: "Trang web có nhiều hình ảnh quảng cáo lấp lánh và pop-up trúng thưởng", isCorrect: false, distractorRationale: "Đây thường là dấu hiệu của trang web lừa đảo hoặc chứa mã độc." },
      { id: "C", text: "Đường dẫn chỉ sử dụng giao thức 'http' không có mã hóa", isCorrect: false, distractorRationale: "Giao thức 'http' truyền dữ liệu dạng văn bản rõ không an toàn." },
      { id: "D", text: "Trang web yêu cầu tải file cài đặt lạ trước khi cho xem nội dung", isCorrect: false, distractorRationale: "Dấu hiệu phát tán phần mềm độc hại (Malware)." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Trang web an toàn sử dụng giao thức HTTPS được mã hóa qua TLS/SSL, có biểu tượng ổ khóa an toàn trên thanh địa chỉ của trình duyệt và đi kèm chứng chỉ SSL hợp lệ do CA uy tín cấp.",
      keyTakeaway: "Dấu hiệu nhận biết web an toàn: Kiểm tra 'https', biểu tượng ổ khóa và chứng chỉ SSL."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 35", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 16"],
    reviewStatus: "verified"
  },
  {
    id: 36,
    originalQuestion: "Mục tiêu của việc đánh giá lỗ hổng bảo mật là gì?",
    displayQuestion: "Mục tiêu của việc đánh giá lỗ hổng bảo mật là gì?",
    originalAnswer: "Tăng cường bảo mật",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-threats-defense",
    topicName: "Lỗ hổng, Tấn công mạng & Phòng vệ thực hành",
    conceptId: "concept-11-security-vulnerability",
    conceptName: "Đánh giá Lỗ hổng Bảo mật",
    options: [
      { id: "A", text: "Tăng cường bảo mật", isCorrect: true },
      { id: "B", text: "Làm chậm tốc độ vận hành của hệ thống", isCorrect: false, distractorRationale: "Làm chậm hệ thống không phải là mục tiêu của quản trị an toàn." },
      { id: "C", text: "Tự động xóa bỏ các tài khoản của người dùng bình thường", isCorrect: false, distractorRationale: "Không liên quan đến đánh giá lỗ hổng." },
      { id: "D", text: "Bỏ qua các cảnh báo về an toàn mạng", isCorrect: false, distractorRationale: "Đánh giá lỗ hổng nhằm làm rõ và xử lý cảnh báo chứ không bỏ qua." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Mục tiêu tối thượng của việc rà soát và đánh giá lỗ hổng bảo mật là phát hiện kịp thời các điểm yếu tiềm ẩn trong hệ thống nhằm đưa ra giải pháp khắc phục, từ đó tăng cường bảo mật cho hệ thống.",
      keyTakeaway: "Mục tiêu đánh giá lỗ hổng bảo mật: Tăng cường bảo mật."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 36", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 11"],
    reviewStatus: "verified"
  },
  {
    id: 37,
    originalQuestion: "Lập kế hoạch khôi phục thảm họa thuộc loại nào?",
    displayQuestion: "Lập kế hoạch khôi phục thảm họa thuộc loại nào?",
    originalAnswer: "Lập kế hoạch dự phòng",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-2-isms-governance",
    conceptName: "Lập kế hoạch Khôi phục Thảm họa",
    options: [
      { id: "A", text: "Lập kế hoạch dự phòng", isCorrect: true },
      { id: "B", text: "Lập kế hoạch chi tiêu hàng tháng", isCorrect: false, distractorRationale: "Đây là kế hoạch tài chính/ngân sách của tổ chức." },
      { id: "C", text: "Kế hoạch marketing truyền thông sản phẩm", isCorrect: false, distractorRationale: "Không thuộc lĩnh vực an toàn thông tin và khắc phục sự cố." },
      { id: "D", text: "Kế hoạch tuyển dụng nhân sự bán hàng", isCorrect: false, distractorRationale: "Thuộc quản trị nhân sự, không phải an toàn thông tin." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Kế hoạch khôi phục thảm họa (Disaster Recovery Planning - DRP) là một phần cốt lõi của Lập kế hoạch dự phòng (Contingency Planning), giúp tổ chức duy trì và phục hồi nhanh chóng hoạt động của các hệ thống CNTT quan trọng sau khi xảy ra thảm họa.",
      keyTakeaway: "Khôi phục thảm họa thuộc loại: Lập kế hoạch dự phòng."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 37", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 2"],
    reviewStatus: "verified"
  },
  {
    id: 38,
    originalQuestion: "Mục tiêu của quản trị an toàn thông tin là gì?",
    displayQuestion: "Mục tiêu của quản trị an toàn thông tin là gì?",
    originalAnswer: "Giảm thiểu rủi ro",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-2-isms-governance",
    conceptName: "Mục tiêu Quản trị ATTT",
    options: [
      { id: "A", text: "Giảm thiểu rủi ro", isCorrect: true },
      { id: "B", text: "Loại bỏ hoàn toàn 100% mọi nguy cơ tiềm ẩn mà không tốn chi phí", isCorrect: false, distractorRationale: "Không có an toàn tuyệt đối 100% trong thực tế quản trị." },
      { id: "C", text: "Thay thế vai trò điều hành của Ban giám đốc", isCorrect: false, distractorRationale: "Quản trị ATTT hỗ trợ mục tiêu kinh doanh, không thay thế ban giám đốc." },
      { id: "D", text: "Ngăn chặn nhân viên sử dụng máy tính làm việc", isCorrect: false, distractorRationale: "Mục tiêu là đảm bảo vận hành an toàn, không cấm đoán hoạt động." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Mục tiêu cốt lõi của quản trị an toàn thông tin (Information Security Governance) là định hướng chiến lược, kiểm soát các biện pháp an ninh nhằm giảm thiểu rủi ro đối với tài sản thông tin xuống mức chấp nhận được.",
      keyTakeaway: "Mục tiêu của quản trị an toàn thông tin: Giảm thiểu rủi ro."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 38", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 2; Phần V.2"],
    reviewStatus: "verified"
  },
  {
    id: 39,
    originalQuestion: "Mục đích của chính sách an toàn thông tin là gì?",
    displayQuestion: "Mục đích của chính sách an toàn thông tin là gì?",
    originalAnswer: "Bảo vệ tài sản",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-3-security-policy",
    conceptName: "Chính sách An toàn Thông tin",
    options: [
      { id: "A", text: "Bảo vệ tài sản", isCorrect: true },
      { id: "B", text: "Tăng dung lượng lưu trữ phần cứng máy chủ", isCorrect: false, distractorRationale: "Chính sách là văn bản quản lý, không làm tăng dung lượng ổ cứng." },
      { id: "C", text: "Hỗ trợ nhân viên tải phần mềm lậu miễn phí", isCorrect: false, distractorRationale: "Hành vi vi phạm nghiêm trọng bản quyền và an toàn thông tin." },
      { id: "D", text: "Công khai mật khẩu hệ thống cho khách hàng", isCorrect: false, distractorRationale: "Vi phạm nguyên tắc bảo mật tối thượng." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Mục đích tối hậu của việc ban hành chính sách an toàn thông tin trong tổ chức là bảo vệ tài sản (bao gồm thông tin, dữ liệu, phần cứng, phần mềm và uy tín của tổ chức).",
      keyTakeaway: "Mục đích của chính sách an toàn thông tin (câu hỏi ngắn): Bảo vệ tài sản."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 39", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 3; Phần V.2"],
    reviewStatus: "verified"
  },
  {
    id: 40,
    originalQuestion: "Ai là người chịu trách nhiệm xác định và quản lý rủi ro trong tổ chức?",
    displayQuestion: "Ai là người chịu trách nhiệm xác định và quản lý rủi ro trong tổ chức?",
    originalAnswer: "Bộ phận an toàn thông tin",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-2-isms-governance",
    conceptName: "Trách nhiệm Quản lý Rủi ro",
    options: [
      { id: "A", text: "Bộ phận an toàn thông tin", isCorrect: true },
      { id: "B", text: "Bộ phận lễ tân văn phòng", isCorrect: false, distractorRationale: "Bộ phận lễ tân không có chuyên môn và trách nhiệm quản lý rủi ro ATTT." },
      { id: "C", text: "Nhà cung cấp điện lưới quốc gia", isCorrect: false, distractorRationale: "Nhà cung cấp điện ngoài phạm vi phân định trách nhiệm nội bộ của tổ chức." },
      { id: "D", text: "Nhân viên thực tập ngắn hạn", isCorrect: false, distractorRationale: "Nhân viên thực tập không thể gánh vác trách nhiệm xác định và quản lý rủi ro tổ chức." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Theo bộ câu hỏi ngân hàng đề thi, đơn vị chịu trách nhiệm xác định và quản lý rủi ro trong tổ chức là Bộ phận an toàn thông tin.",
      keyTakeaway: "Đơn vị chịu trách nhiệm xác định và quản lý rủi ro trong tổ chức: Bộ phận an toàn thông tin."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 40", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 2; Phần VI.1"],
    academicNote: "Lưu ý học thuật: Bộ phận ATTT là đơn vị chuyên môn trực tiếp điều phối, xác định và quản lý rủi ro. Tuy nhiên, về mặt quản trị theo chuẩn ISO 27001, trách nhiệm giải trình cuối cùng (Accountability) thuộc về Ban lãnh đạo cấp cao (Top Management) và các Chủ sở hữu rủi ro (Risk Owners).",
    reviewStatus: "academic_caution"
  },

  // ==========================================
  // BATCH 5: Q41 - Q50
  // ==========================================
  {
    id: 41,
    originalQuestion: "Đánh giá rủi ro trong an ninh thông tin giúp làm gì?",
    displayQuestion: "Đánh giá rủi ro trong an ninh thông tin giúp làm gì?",
    originalAnswer: "Xác định các mối đe dọa tiềm ẩn và tác động của chúng",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-2-isms-governance",
    conceptName: "Đánh giá Rủi ro",
    options: [
      { id: "A", text: "Xác định các mối đe dọa tiềm ẩn và tác động của chúng", isCorrect: true },
      { id: "B", text: "Tự động mã hóa tất cả các file trong mạng nội bộ", isCorrect: false, distractorRationale: "Mã hóa là biện pháp kỹ thuật, không phải kết quả của đánh giá rủi ro." },
      { id: "C", text: "Bỏ qua các tiêu chuẩn an toàn thông tin quốc tế", isCorrect: false, distractorRationale: "Đánh giá rủi ro nhằm áp dụng tiêu chuẩn hiệu quả hơn chứ không bỏ qua." },
      { id: "D", text: "Chỉ nhằm cắt giảm tối đa chi phí mua sắm thiết bị", isCorrect: false, distractorRationale: "Mục đích là bảo vệ tài sản dựa trên mức độ rủi ro, không chỉ đơn thuần cắt giảm thiết bị." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Đánh giá rủi ro (Risk Assessment) giúp tổ chức xác định các mối đe dọa tiềm ẩn, các điểm yếu hiện hữu và ước tính mức độ tác động của chúng đối với tài sản thông tin.",
      keyTakeaway: "Đánh giá rủi ro giúp: Xác định các mối đe dọa tiềm ẩn và tác động của chúng."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 41", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 2"],
    reviewStatus: "verified"
  },
  {
    id: 42,
    originalQuestion: "Ý nghĩa của 'Kiểm toán An ninh' là gì?",
    displayQuestion: "Ý nghĩa của 'Kiểm toán An ninh' là gì?",
    originalAnswer: "Đánh giá sự tuân thủ các chính sách và tiêu chuẩn an ninh",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-2-isms-governance",
    conceptName: "Kiểm toán An ninh",
    options: [
      { id: "A", text: "Đánh giá sự tuân thủ các chính sách và tiêu chuẩn an ninh", isCorrect: true },
      { id: "B", text: "Lập trình giải thuật mã hóa khóa công khai", isCorrect: false, distractorRationale: "Đây là công việc của kỹ sư mật mã học." },
      { id: "C", text: "Bảo hành thiết bị phần cứng máy in văn phòng", isCorrect: false, distractorRationale: "Đây là dịch vụ kỹ thuật bảo trì thiết bị văn phòng." },
      { id: "D", text: "Quản lý doanh thu tài chính cuối quý của công ty", isCorrect: false, distractorRationale: "Đây là kiểm toán tài chính, không phải kiểm toán an ninh." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Kiểm toán an ninh (Security Audit) là quá trình độc lập kiểm tra, rà soát nhằm đánh giá sự tuân thủ đối với các chính sách an toàn thông tin và tiêu chuẩn an ninh đã được ban hành trong tổ chức.",
      keyTakeaway: "Ý nghĩa kiểm toán an ninh: Đánh giá sự tuân thủ các chính sách và tiêu chuẩn an ninh."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 42", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 2; Bảng 3"],
    reviewStatus: "verified"
  },
  {
    id: 43,
    originalQuestion: "Mục tiêu chính của việc thiết lập một chính sách an ninh thông tin trong một tổ chức là gì?",
    displayQuestion: "Mục tiêu chính của việc thiết lập một chính sách an ninh thông tin trong một tổ chức là gì?",
    originalAnswer: "Để thiết lập các quy định và hướng dẫn bảo vệ thông tin",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-3-security-policy",
    conceptName: "Mục tiêu Chính sách ATTT",
    options: [
      { id: "A", text: "Để thiết lập các quy định và hướng dẫn bảo vệ thông tin", isCorrect: true },
      { id: "B", text: "Để công khai toàn bộ tài liệu mật ra bên ngoài", isCorrect: false, distractorRationale: "Hoàn toàn trái ngược với mục tiêu bảo vệ thông tin." },
      { id: "C", text: "Để thay thế toàn bộ nhân sự công nghệ thông tin", isCorrect: false, distractorRationale: "Chính sách định hướng hành vi, không nhằm sa thải nhân sự." },
      { id: "D", text: "Để cấm vĩnh viễn việc kết nối Internet tại trụ sở", isCorrect: false, distractorRationale: "Chính sách quy định sử dụng Internet an toàn chứ không cấm vô lý." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Về mặt quy phạm, mục tiêu chính của việc thiết lập một chính sách an ninh thông tin là đưa ra và thiết lập các quy định, hướng dẫn chuẩn mực nhằm bảo vệ an toàn thông tin trong tổ chức.",
      keyTakeaway: "Mục tiêu chính thiết lập chính sách: Thiết lập các quy định và hướng dẫn bảo vệ thông tin."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 43", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 3; Phần V.2"],
    reviewStatus: "verified"
  },
  {
    id: 44,
    originalQuestion: "Mã Caesar với k = 4 của đoạn văn sau: QUANLYTHONGTIN",
    displayQuestion: "Mã Caesar với k = 4 của đoạn văn sau: QUANLYTHONGTIN là gì?",
    originalAnswer: "UYERPCXLSRKXMR",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-6-substitution-caesar",
    conceptName: "Thực hành Mã Caesar",
    options: [
      { id: "A", text: "UYERPCXLSRKXMR", isCorrect: true },
      { id: "B", text: "UYERPBXLSRKXMR", isCorrect: false, distractorRationale: "Sai chữ cái ở vị trí thứ 6 (Y dịch 4 vị trí qua Z, A, B thành C, không phải B)." },
      { id: "C", text: "TYDQOBWKNQJSWQ", isCorrect: false, distractorRationale: "Đây là kết quả dịch chuyển sai bước (k=3 thay vì k=4)." },
      { id: "D", text: "VZFSQDYMTMSLYS", isCorrect: false, distractorRationale: "Đây là kết quả dịch chuyển thừa (k=5 thay vì k=4)." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Áp dụng công thức Caesar C = (P + 4) mod 26: Q->U, U->Y, A->E, N->R, L->P, Y->C (24+4=28 mod 26 = 2 tức C), T->X, H->L, O->S, N->R, G->K, T->X, I->M, N->R. Kết quả ghép lại chính xác: UYERPCXLSRKXMR.",
      keyTakeaway: "QUANLYTHONGTIN (k=4) -> UYERPCXLSRKXMR (đặc biệt lưu ý chữ Y quay vòng về C)."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 44", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 6; Phần V.2"],
    reviewStatus: "verified"
  },
  {
    id: 45,
    originalQuestion: "Ai đã phát minh ra mã hóa khóa công khai?",
    displayQuestion: "Ai đã phát minh ra mã hóa khóa công khai?",
    originalAnswer: "Whitfield Diffie và Martin Hellman",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-8-pkc-rsa",
    conceptName: "Lịch sử Phát minh PKC",
    options: [
      { id: "A", text: "Whitfield Diffie và Martin Hellman", isCorrect: true },
      { id: "B", text: "Alan Turing và John von Neumann", isCorrect: false, distractorRationale: "Turing là cha đẻ khoa học máy tính và máy giải mã Enigma; von Neumann là kiến trúc sư máy tính." },
      { id: "C", text: "Julius Caesar và Augustus", isCorrect: false, distractorRationale: "Julius Caesar là người phát minh mã Caesar thời cổ đại." },
      { id: "D", text: "Claude Shannon và Tim Berners-Lee", isCorrect: false, distractorRationale: "Shannon là cha đẻ lý thuyết thông tin; Berners-Lee là người phát minh World Wide Web." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Hệ mã hóa khóa công khai (PKC) được đề xuất và phát minh vào năm 1976 bởi hai nhà khoa học máy tính Whitfield Diffie và Martin Hellman trong bài báo lịch sử 'New Directions in Cryptography'.",
      keyTakeaway: "Người phát minh mã hóa khóa công khai: Whitfield Diffie và Martin Hellman."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 45", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 8"],
    reviewStatus: "verified"
  },
  {
    id: 46,
    originalQuestion: "Đặc điểm nào sau đây không phải là đặc điểm của một hàm băm an toàn?",
    displayQuestion: "Đặc điểm nào sau đây KHÔNG PHẢI là đặc điểm của một hàm băm an toàn?",
    originalAnswer: "Có khả năng giải mã ngược",
    answerType: "single_choice",
    questionPolarity: "negative",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-9-hash-function",
    conceptName: "Đặc tính Hàm băm An toàn",
    options: [
      { id: "A", text: "Có khả năng giải mã ngược", isCorrect: true },
      { id: "B", text: "Tính một chiều (khó tìm đầu vào từ đầu ra)", isCorrect: false, distractorRationale: "Đây là đặc điểm bắt buộc của hàm băm an toàn." },
      { id: "C", text: "Kháng va chạm (khó tìm 2 đầu vào cho cùng một đầu ra)", isCorrect: false, distractorRationale: "Đây là đặc điểm bảo mật quan trọng của hàm băm." },
      { id: "D", text: "Đầu ra có độ dài cố định", isCorrect: false, distractorRationale: "Đây là đặc tính cơ bản của hàm băm." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Hàm băm mật mã là hàm toán học một chiều (one-way). Đặc điểm 'Có khả năng giải mã ngược' là hoàn toàn sai đối với một hàm băm an toàn.",
      keyTakeaway: "Hàm băm an toàn: KHÔNG CÓ KHẢ NĂNG giải mã ngược."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 46", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 9; Phần VI.1"],
    reviewStatus: "verified"
  },
  {
    id: 47,
    originalQuestion: "Đặc điểm nào không đúng về hàm băm?",
    displayQuestion: "Đặc điểm nào sau đây KHÔNG ĐÚNG về hàm băm?",
    originalAnswer: "Dễ dàng tìm đầu vào từ đầu ra",
    answerType: "single_choice",
    questionPolarity: "negative",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-9-hash-function",
    conceptName: "Tính Một chiều của Hàm băm",
    options: [
      { id: "A", text: "Dễ dàng tìm đầu vào từ đầu ra", isCorrect: true },
      { id: "B", text: "Tính toán giá trị băm từ đầu vào nhanh chóng", isCorrect: false, distractorRationale: "Đây là đặc tính ĐÚNG của hàm băm." },
      { id: "C", text: "Độ dài đầu ra không đổi dù đầu vào dài hay ngắn", isCorrect: false, distractorRationale: "Đây là đặc tính ĐÚNG của hàm băm." },
      { id: "D", text: "Chỉ một thay đổi nhỏ ở đầu vào cũng làm đổi toàn bộ giá trị băm", isCorrect: false, distractorRationale: "Đây là hiệu ứng tuyết lở (avalanche effect) ĐÚNG của hàm băm." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Hàm băm mật mã an toàn có tính chất tiền ảnh (pre-image resistance): Từ giá trị băm đầu ra, việc tính toán ngược lại để tìm đầu vào ban đầu là bất khả thi về mặt tính toán. Do đó, 'Dễ dàng tìm đầu vào từ đầu ra' là đặc điểm KHÔNG ĐÚNG.",
      keyTakeaway: "Đặc điểm KHÔNG ĐÚNG về hàm băm: Dễ dàng tìm đầu vào từ đầu ra."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 47", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 9"],
    reviewStatus: "verified"
  },
  {
    id: 48,
    originalQuestion: "Caesar cipher là một ví dụ của loại mã hóa nào?",
    displayQuestion: "Caesar cipher là một ví dụ của loại mã hóa nào?",
    originalAnswer: "Mã thay thế",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-6-substitution-caesar",
    conceptName: "Phân loại Mã Caesar",
    options: [
      { id: "A", text: "Mã thay thế", isCorrect: true },
      { id: "B", text: "Mã hoán vị", isCorrect: false, distractorRationale: "Mã hoán vị thay đổi thứ tự vị trí các chữ cái, trong khi Caesar thay đổi giá trị chữ cái này bằng chữ cái khác." },
      { id: "C", text: "Mã hóa khóa công khai hiện đại", isCorrect: false, distractorRationale: "Caesar là hệ mật cổ điển đối xứng sơ khai, không phải mã khóa công khai." },
      { id: "D", text: "Hàm băm mật mã", isCorrect: false, distractorRationale: "Caesar có giải mã ngược được bằng dịch lùi (-k), không phải hàm băm." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Caesar cipher (mật mã Caesar) hoạt động bằng cách thay thế từng ký tự trong bản rõ bằng một ký tự khác cách nó k vị trí trong bảng chữ cái, do đó đây là ví dụ kinh điển của Mã thay thế (Substitution Cipher).",
      keyTakeaway: "Caesar cipher là ví dụ của: Mã thay thế (Substitution cipher)."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 48", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 6"],
    reviewStatus: "verified"
  },
  {
    id: 49,
    originalQuestion: "Phương pháp mã hóa đối xứng quan trọng nào được phát triển vào những năm 1970?",
    displayQuestion: "Phương pháp mã hóa đối xứng quan trọng nào được phát triển vào những năm 1970?",
    originalAnswer: "DES (Tiêu chuẩn mã hóa dữ liệu)",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-7-symmetric-des-aes",
    conceptName: "Lịch sử Phát triển DES",
    options: [
      { id: "A", text: "DES (Tiêu chuẩn mã hóa dữ liệu)", isCorrect: true },
      { id: "B", text: "AES (Tiêu chuẩn mã hóa nâng cao)", isCorrect: false, distractorRationale: "AES được phát triển và chuẩn hóa vào năm 2001 (cuối thập niên 1990 đầu 2000), không phải 1970." },
      { id: "C", text: "RSA (Mã hóa khóa công khai)", isCorrect: false, distractorRationale: "RSA là mã hóa khóa công khai, không phải phương pháp mã hóa đối xứng." },
      { id: "D", text: "SHA-256 (Hàm băm)", isCorrect: false, distractorRationale: "SHA-256 là hàm băm ra đời vào năm 2001." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Data Encryption Standard (DES) là phương pháp mã hóa đối xứng quan trọng bậc nhất được phát triển bởi IBM và chuẩn hóa vào thập niên 1970 bởi NBS (nay là NIST).",
      keyTakeaway: "Mã hóa đối xứng quan trọng phát triển vào những năm 1970: DES."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 49", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 7"],
    reviewStatus: "verified"
  },
  {
    id: 50,
    originalQuestion: "Khóa nào được sử dụng để tạo chữ ký số?",
    displayQuestion: "Khóa nào được sử dụng để tạo chữ ký số?",
    originalAnswer: "Khóa bí mật",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-10-digital-signature",
    conceptName: "Khóa Tạo Chữ ký số",
    options: [
      { id: "A", text: "Khóa bí mật", isCorrect: true },
      { id: "B", text: "Khóa công khai", isCorrect: false, distractorRationale: "Khóa công khai dùng để KIỂM TRA chữ ký, không dùng để tạo chữ ký." },
      { id: "C", text: "Khóa dùng chung trong mã hóa đối xứng DES", isCorrect: false, distractorRationale: "Khóa dùng chung không tạo được chữ ký số chống chối bỏ." },
      { id: "D", text: "Khóa phiên chỉ tồn tại 1 giây", isCorrect: false, distractorRationale: "Chữ ký số gắn liền với khóa bí mật định danh lâu dài của người ký." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Để tạo chữ ký số (ký lên văn bản), người gửi bắt buộc phải sử dụng Khóa bí mật (private key) của mình. Chỉ người sở hữu khóa bí mật mới ký được, đảm bảo tính xác thực người ký.",
      keyTakeaway: "Khóa sử dụng để TẠO chữ ký số: Khóa bí mật."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 50", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 10; Bảng 2"],
    reviewStatus: "verified"
  },

  // ==========================================
  // BATCH 6: Q51 - Q60
  // ==========================================
  {
    id: 51,
    originalQuestion: "Vai trò của hàm 'băm' trong chữ ký số là gì?",
    displayQuestion: "Vai trò của hàm 'băm' trong chữ ký số là gì?",
    originalAnswer: "Đảm bảo tính toàn vẹn của tin nhắn.",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-10-digital-signature",
    conceptName: "Hàm băm trong Chữ ký số",
    options: [
      { id: "A", text: "Đảm bảo tính toàn vẹn của tin nhắn.", isCorrect: true },
      { id: "B", text: "Tạo ra bản sao dự phòng của tin nhắn lưu lên đám mây", isCorrect: false, distractorRationale: "Hàm băm không có chức năng sao lưu dữ liệu." },
      { id: "C", text: "Tự động gửi tin nhắn đến máy chủ của cơ quan công an", isCorrect: false, distractorRationale: "Hàm băm là giải thuật toán học tính digest, không phải dịch vụ mạng." },
      { id: "D", text: "Tăng tốc độ kết nối cáp quang Internet", isCorrect: false, distractorRationale: "Không liên quan đến phần cứng truyền dẫn." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Trong chữ ký số, thông điệp được đưa qua hàm băm để tạo ra giá trị tóm lược (digest). Bất kỳ thay đổi nhỏ nào trên văn bản cũng làm digest thay đổi, từ đó đảm bảo tính toàn vẹn của tin nhắn.",
      keyTakeaway: "Vai trò của hàm băm trong chữ ký số: Đảm bảo tính toàn vẹn của tin nhắn."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 51", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 9 và 10"],
    reviewStatus: "verified"
  },
  {
    id: 52,
    originalQuestion: "Trong chữ ký số, 'Cơ quan chứng thực' (CA) là gì?",
    displayQuestion: "Trong chữ ký số, 'Cơ quan chứng thực' (CA) là gì?",
    originalAnswer: "Một tổ chức cung cấp và xác minh các khóa công khai",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-10-digital-signature",
    conceptName: "Cơ quan Chứng thực (CA)",
    options: [
      { id: "A", text: "Một tổ chức cung cấp và xác minh các khóa công khai", isCorrect: true },
      { id: "B", text: "Một phần mềm độc hại chuyên đánh cắp khóa bí mật", isCorrect: false, distractorRationale: "CA là tổ chức uy tín (Certificate Authority) cấp chứng chỉ số, không phải mã độc." },
      { id: "C", text: "Thiết bị phần cứng lưu trữ dây cáp mạng", isCorrect: false, distractorRationale: "Không phải thiết bị phần cứng hạ tầng mạng." },
      { id: "D", text: "Nhóm tin tặc chuyên tấn công các ngân hàng trực tuyến", isCorrect: false, distractorRationale: "CA là tổ chức xác thực hợp pháp trong hạ tầng PKI." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Cơ quan chứng thực (Certificate Authority - CA) là bên thứ ba đáng tin cậy chịu trách nhiệm phát hành, quản lý và xác minh tính hợp lệ của các chứng chỉ số cùng khóa công khai của người dùng và tổ chức.",
      keyTakeaway: "CA (Cơ quan chứng thực): Một tổ chức cung cấp và xác minh các khóa công khai."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 52", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 10"],
    reviewStatus: "verified"
  },
  {
    id: 53,
    originalQuestion: "Mô hình bảo mật nhiều lớp được gọi là gì?",
    displayQuestion: "Mô hình bảo mật nhiều lớp được gọi là gì?",
    originalAnswer: "a) Layered Security Model",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-4-layered-security",
    conceptName: "Mô hình Bảo mật Nhiều lớp",
    options: [
      { id: "A", text: "Layered Security Model", isCorrect: true },
      { id: "B", text: "Single Barrier Defense", isCorrect: false, distractorRationale: "Single Barrier là mô hình rào chắn đơn lập, trái ngược với bảo mật nhiều lớp." },
      { id: "C", text: "Open Door Access Model", isCorrect: false, distractorRationale: "Open Door là mô hình mở cửa tự do, không an toàn." },
      { id: "D", text: "Flat Network Architecture", isCorrect: false, distractorRationale: "Mạng phẳng (flat network) không phân vùng bảo vệ nhiều lớp." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Mô hình bảo mật nhiều lớp trong tiếng Anh được gọi là 'Layered Security Model' (hay còn gọi là Defense in Depth), thiết lập nhiều tầng rào chắn an ninh bảo vệ bổ trợ cho nhau.",
      keyTakeaway: "Mô hình bảo mật nhiều lớp = Layered Security Model (phòng thủ chiều sâu)."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 53", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 4; Phần VI.1"],
    academicNote: "Lưu ý định dạng: Đáp án trong tệp câu hỏi gốc có tiền tố phương án 'a) Layered Security Model'. Hệ thống lưu nguyên văn bản gốc và chuẩn hóa hiển thị thành 'Layered Security Model'.",
    reviewStatus: "academic_caution"
  },
  {
    id: 54,
    originalQuestion: "Chính sách cấp quyền cho người dùng nên tuân thủ nguyên tắc nào?",
    displayQuestion: "Chính sách cấp quyền cho người dùng nên tuân thủ nguyên tắc nào?",
    originalAnswer: "Cấp quyền vừa đủ để thực hiện nhiệm vụ",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-3-security-policy",
    conceptName: "Nguyên tắc Cấp quyền Tối thiểu",
    options: [
      { id: "A", text: "Cấp quyền vừa đủ để thực hiện nhiệm vụ", isCorrect: true },
      { id: "B", text: "Cấp quyền quản trị tối cao (Administrator) cho tất cả nhân viên", isCorrect: false, distractorRationale: "Vi phạm nghiêm trọng an toàn, tăng nguy cơ lộ lọt và phá hoại hệ thống." },
      { id: "C", text: "Không cấp bất kỳ quyền truy cập nào kể cả việc xem email", isCorrect: false, distractorRationale: "Làm tê liệt hoạt động vận hành bình thường của tổ chức." },
      { id: "D", text: "Cấp quyền truy cập ngẫu nhiên thay đổi mỗi giờ", isCorrect: false, distractorRationale: "Không khả thi trong quản lý vận hành." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Nguyên tắc đặc quyền tối thiểu (Principle of Least Privilege): Mỗi người dùng chỉ được cấp các quyền truy cập vừa đủ và tối thiểu để hoàn thành nhiệm vụ công việc được giao, tránh dư thừa quyền hạn.",
      keyTakeaway: "Chính sách cấp quyền tuân thủ nguyên tắc: Cấp quyền vừa đủ để thực hiện nhiệm vụ."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 54", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 3"],
    reviewStatus: "verified"
  },
  {
    id: 55,
    originalQuestion: "Thuật ngữ \"Cipher\" dùng để chỉ gì?",
    displayQuestion: "Thuật ngữ \"Cipher\" dùng để chỉ gì?",
    originalAnswer: "Giải thuật dùng để mã hóa và giải mã thông tin",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-5-encryption-methods",
    conceptName: "Khái niệm Cipher",
    options: [
      { id: "A", text: "Giải thuật dùng để mã hóa và giải mã thông tin", isCorrect: true },
      { id: "B", text: "Cáp quang kết nối giữa các trung tâm máy chủ", isCorrect: false, distractorRationale: "Cipher là thuật ngữ thuật toán phần mềm/toán học, không phải dây cáp." },
      { id: "C", text: "Văn bản chưa được mã hóa đọc được bình thường", isCorrect: false, distractorRationale: "Văn bản đọc được là Plaintext (bản rõ), không phải Cipher." },
      { id: "D", text: "Một lỗi phần mềm làm tràn bộ nhớ đệm", isCorrect: false, distractorRationale: "Lỗi tràn bộ nhớ đệm là Buffer Overflow, không phải Cipher." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Trong mật mã học, Cipher (giải thuật mật mã) là thuật toán toán học xác định các quy tắc dùng để mã hóa (từ bản rõ thành bản mã) và giải mã (từ bản mã về bản rõ) thông tin.",
      keyTakeaway: "Cipher = Giải thuật dùng để mã hóa và giải mã thông tin."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 55", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 5"],
    reviewStatus: "verified"
  },
  {
    id: 56,
    originalQuestion: "Phương pháp thay thế hoạt động như thế nào?",
    displayQuestion: "Phương pháp thay thế hoạt động như thế nào?",
    originalAnswer: "Thay một giá trị bằng một giá trị khác",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-6-substitution-caesar",
    conceptName: "Phương pháp Thay thế (Substitution)",
    options: [
      { id: "A", text: "Thay một giá trị bằng một giá trị khác", isCorrect: true },
      { id: "B", text: "Xáo trộn thứ tự vị trí các chữ cái trong khi giữ nguyên giá trị", isCorrect: false, distractorRationale: "Xáo trộn vị trí là cơ chế của phương pháp hoán vị (Transposition)." },
      { id: "C", text: "Chia đôi dung lượng thông điệp sau mỗi lần chạy", isCorrect: false, distractorRationale: "Không phải cơ chế của phương pháp thay thế." },
      { id: "D", text: "Xóa ngẫu nhiên một nửa văn bản gốc", isCorrect: false, distractorRationale: "Xóa ký tự làm mất thông tin, không thể khôi phục bản rõ." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Phương pháp thay thế (Substitution) trong mật mã học hoạt động theo nguyên lý cơ bản: Thay một giá trị (chữ cái, bit, ký hiệu) bằng một giá trị khác theo một quy tắc hoặc bảng tra cứu xác định.",
      keyTakeaway: "Phương pháp thay thế: Thay một giá trị bằng một giá trị khác."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 56", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 6"],
    reviewStatus: "verified"
  },
  {
    id: 57,
    originalQuestion: "Kỹ thuật mã hóa Caesar cipher thực hiện điều gì?",
    displayQuestion: "Kỹ thuật mã hóa Caesar cipher thực hiện điều gì?",
    originalAnswer: "Thay thế từng ký tự bằng ký tự khác theo khóa cố định",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-6-substitution-caesar",
    conceptName: "Kỹ thuật Mã Caesar",
    options: [
      { id: "A", text: "Thay thế từng ký tự bằng ký tự khác theo khóa cố định", isCorrect: true },
      { id: "B", text: "Tính giá trị tóm lược một chiều không có khóa", isCorrect: false, distractorRationale: "Đây là nguyên lý của hàm băm (Hash)." },
      { id: "C", text: "Phát sinh cặp khóa công khai và bí mật theo thuật toán RSA", isCorrect: false, distractorRationale: "Caesar là mật mã dịch chuyển ký tự cổ điển, không phát sinh cặp khóa RSA." },
      { id: "D", text: "Hoán đổi vị trí của các dòng văn bản theo ma trận ngẫu nhiên", isCorrect: false, distractorRationale: "Đây là kỹ thuật hoán vị ma trận, không phải Caesar cipher." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Kỹ thuật mã hóa Caesar cipher dịch chuyển từng ký tự trong bản rõ đi một khoảng cố định k vị trí trong bảng chữ cái; tức là thực hiện việc thay thế từng ký tự bằng ký tự khác theo khóa cố định k.",
      keyTakeaway: "Caesar cipher: Thay thế từng ký tự bằng ký tự khác theo khóa cố định (k)."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 57", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 6"],
    reviewStatus: "verified"
  },
  {
    id: 58,
    originalQuestion: "DES là dạng mã hóa nào?",
    displayQuestion: "DES là dạng mã hóa nào?",
    originalAnswer: "Khóa đối xứng",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-7-symmetric-des-aes",
    conceptName: "Phân loại DES",
    options: [
      { id: "A", text: "Khóa đối xứng", isCorrect: true },
      { id: "B", text: "Khóa phi đối xứng", isCorrect: false, distractorRationale: "Mã hóa phi đối xứng dùng cặp khóa như RSA, ECC; DES chỉ dùng 1 khóa chung." },
      { id: "C", text: "Hàm băm một chiều", isCorrect: false, distractorRationale: "DES là thuật toán mã hóa 2 chiều có giải mã, không phải hàm băm." },
      { id: "D", text: "Mã hóa thay thế đa bảng không khóa", isCorrect: false, distractorRationale: "DES là mật mã khối hiện đại có khóa đối xứng." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "DES (Data Encryption Standard) là dạng mã hóa khóa đối xứng (khóa bí mật), trong đó bên gửi và bên nhận dùng chung cùng một khóa mật cho cả quá trình mã hóa và giải mã.",
      keyTakeaway: "DES = Dạng mã hóa khóa đối xứng."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 58", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 7"],
    reviewStatus: "verified"
  },
  {
    id: 59,
    originalQuestion: "Kích thước khóa thực tế được sử dụng trong DES là bao nhiêu?",
    displayQuestion: "Kích thước khóa thực tế được sử dụng trong DES là bao nhiêu?",
    originalAnswer: "56 bít",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-7-symmetric-des-aes",
    conceptName: "Kích thước Khóa DES",
    options: [
      { id: "A", text: "56 bít", isCorrect: true },
      { id: "B", text: "64 bít", isCorrect: false, distractorRationale: "64 bit là tổng độ dài khối đầu vào của khóa, nhưng có 8 bit chẵn lẻ nên kích thước khóa thực tế có hiệu lực bảo mật chỉ là 56 bit." },
      { id: "C", text: "128 bít", isCorrect: false, distractorRationale: "128 bit là kích thước khóa tiêu chuẩn của AES, không phải DES." },
      { id: "D", text: "256 bít", isCorrect: false, distractorRationale: "256 bit là kích thước khóa tối đa của AES." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Khóa đầu vào danh nghĩa của DES dài 64 bít, nhưng có 8 bít (các bít ở vị trí 8, 16, 24, 32, 40, 48, 56, 64) được sử dụng để kiểm tra chẵn lẻ (parity check). Do đó, kích thước khóa thực tế có hiệu lực mật mã được sử dụng trong thuật toán DES là 56 bít.",
      keyTakeaway: "Kích thước khóa thực tế trong DES = 56 bít."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 59", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 7"],
    reviewStatus: "verified"
  },
  {
    id: 60,
    originalQuestion: "AES hỗ trợ kích thước khóa nào?",
    displayQuestion: "AES hỗ trợ kích thước khóa nào?",
    originalAnswer: "128 bít, 192 bít, 256 bít",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-7-symmetric-des-aes",
    conceptName: "Kích thước Khóa AES",
    options: [
      { id: "A", text: "128 bít, 192 bít, 256 bít", isCorrect: true },
      { id: "B", text: "56 bít, 64 bít, 112 bít", isCorrect: false, distractorRationale: "56 và 64 bit thuộc về DES, 112 bit thuộc về 2-key 3DES." },
      { id: "C", text: "512 bít, 1024 bít, 2048 bít", isCorrect: false, distractorRationale: "Đây là các độ dài khóa thường dùng trong hệ mã hóa khóa công khai RSA." },
      { id: "D", text: "Chỉ hỗ trợ duy nhất kích thước 64 bít", isCorrect: false, distractorRationale: "AES hỗ trợ 3 kích thước khóa chuẩn: 128, 192 và 256 bit." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Tiêu chuẩn mã hóa nâng cao AES (FIPS 197) hỗ trợ chuẩn mực 3 kích thước khóa: 128 bít (10 vòng lặp), 192 bít (12 vòng lặp) và 256 bít (14 vòng lặp), hoạt động trên khối dữ liệu 128 bít.",
      keyTakeaway: "AES hỗ trợ 3 kích thước khóa: 128 bít, 192 bít, 256 bít."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 60", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 7"],
    reviewStatus: "verified"
  },

  // ==========================================
  // BATCH 7: Q61 - Q70
  // ==========================================
  {
    id: 61,
    originalQuestion: "Hàm băm được sử dụng để làm gì?",
    displayQuestion: "Hàm băm được sử dụng để làm gì?",
    originalAnswer: "Kiểm tra tính toàn vẹn của dữ liệu",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-9-hash-function",
    conceptName: "Chức năng Hàm băm",
    options: [
      { id: "A", text: "Kiểm tra tính toàn vẹn của dữ liệu", isCorrect: true },
      { id: "B", text: "Khôi phục lại dữ liệu ban đầu khi bị virus tấn công", isCorrect: false, distractorRationale: "Hàm băm là hàm một chiều nén dữ liệu, không khôi phục lại văn bản gốc." },
      { id: "C", text: "Tự động phân phát địa chỉ IP cho thiết bị mạng", isCorrect: false, distractorRationale: "Đây là chức năng của giao thức mạng DHCP." },
      { id: "D", text: "Tăng băng thông tải trang web", isCorrect: false, distractorRationale: "Hàm băm không tác động đến băng thông đường truyền." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Chức năng ứng dụng chủ yếu của hàm băm trong an toàn thông tin là kiểm tra tính toàn vẹn (Integrity) của dữ liệu: so sánh mã băm trước và sau khi truyền tải để phát hiện xem dữ liệu có bị can thiệp, sai lệch hay không.",
      keyTakeaway: "Hàm băm được sử dụng để: Kiểm tra tính toàn vẹn của dữ liệu."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 61", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 9; Bảng 1"],
    reviewStatus: "verified"
  },
  {
    id: 62,
    originalQuestion: "Ví dụ về hàm băm phổ biến là:",
    displayQuestion: "Ví dụ về hàm băm phổ biến là:",
    originalAnswer: "MD5, SHA-256",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-9-hash-function",
    conceptName: "Ví dụ Hàm băm Phổ biến",
    options: [
      { id: "A", text: "MD5, SHA-256", isCorrect: true },
      { id: "B", text: "DES, AES", isCorrect: false, distractorRationale: "DES và AES là các giải thuật mã hóa đối xứng, không phải hàm băm." },
      { id: "C", text: "RSA, El-Gamal", isCorrect: false, distractorRationale: "RSA và El-Gamal là các giải thuật mã hóa khóa công khai." },
      { id: "D", text: "WPA2, WPA3", isCorrect: false, distractorRationale: "WPA2 và WPA3 là các chuẩn bảo mật mạng không dây Wi-Fi." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "MD5 (Message Digest 5 - tạo đầu ra 128 bit) và SHA-256 (Secure Hash Algorithm 256 - tạo đầu ra 256 bit) là hai ví dụ điển hình và phổ biến nhất của hàm băm mật mã.",
      keyTakeaway: "Ví dụ hàm băm phổ biến: MD5, SHA-256."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 62", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 9"],
    reviewStatus: "verified"
  },
  {
    id: 63,
    originalQuestion: "RSA là giải thuật mã hóa gì?",
    displayQuestion: "RSA là giải thuật mã hóa gì?",
    originalAnswer: "Khóa công khai",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-8-pkc-rsa",
    conceptName: "Phân loại Giải thuật RSA",
    options: [
      { id: "A", text: "Khóa công khai", isCorrect: true },
      { id: "B", text: "Khóa đối xứng bí mật", isCorrect: false, distractorRationale: "Mã hóa khóa đối xứng là DES, AES; RSA là mã phi đối xứng." },
      { id: "C", text: "Mã thay thế dịch chuyển vòng tròn", isCorrect: false, distractorRationale: "Mã dịch chuyển vòng tròn là Caesar cipher cổ điển." },
      { id: "D", text: "Mật mã dòng một lần OTP", isCorrect: false, distractorRationale: "One-Time Pad là mật mã dòng hoàn hảo đối xứng, không phải RSA." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "RSA là giải thuật mã hóa khóa công khai (Public Key Cryptography), sử dụng một cặp khóa: khóa công khai dùng để mã hóa và khóa bí mật dùng để giải mã.",
      keyTakeaway: "RSA là giải thuật mã hóa: Khóa công khai."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 63", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 8"],
    reviewStatus: "verified"
  },
  {
    id: 64,
    originalQuestion: "Ở hệ mật mã nào người gửi và người nhận thông điệp sử dụng các khóa khác nhau khi mã hóa và giải mã ?",
    displayQuestion: "Ở hệ mật mã nào người gửi và người nhận thông điệp sử dụng các khóa khác nhau khi mã hóa và giải mã?",
    originalAnswer: "Không đối xứng",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-8-pkc-rsa",
    conceptName: "Hệ mật mã Không đối xứng",
    options: [
      { id: "A", text: "Không đối xứng", isCorrect: true },
      { id: "B", text: "Đối xứng", isCorrect: false, distractorRationale: "Hệ mật mã đối xứng bắt buộc sử dụng chung một khóa cho cả mã hóa và giải mã." },
      { id: "C", text: "Mã hóa cổ điển đơn bảng", isCorrect: false, distractorRationale: "Mã hóa cổ điển đơn bảng là hệ mã đối xứng dùng chung khóa." },
      { id: "D", text: "Mã hóa khóa bí mật", isCorrect: false, distractorRationale: "Mã hóa khóa bí mật chính là tên gọi khác của hệ mã đối xứng." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Trong hệ mật mã không đối xứng (còn gọi là hệ mã hóa khóa công khai hay phi đối xứng), quá trình mã hóa và giải mã sử dụng hai khóa khác nhau: một khóa công khai và một khóa bí mật.",
      keyTakeaway: "Người gửi và người nhận sử dụng các khóa khác nhau = Hệ mật mã Không đối xứng."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 64", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 8"],
    reviewStatus: "verified"
  },
  {
    id: 65,
    originalQuestion: "Nếu muốn ký một tài liệu sau đó gửi đến một người khác, khóa nào phải được sử dụng",
    displayQuestion: "Nếu muốn ký một tài liệu sau đó gửi đến một người khác, khóa nào phải được sử dụng?",
    originalAnswer: "Khóa bí mật của người gửi",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-10-digital-signature",
    conceptName: "Quy tắc Dùng Khóa Ký Tài liệu",
    options: [
      { id: "A", text: "Khóa bí mật của người gửi", isCorrect: true },
      { id: "B", text: "Khóa công khai của người gửi", isCorrect: false, distractorRationale: "Khóa công khai của người gửi để người nhận kiểm tra chữ ký, không dùng để ký." },
      { id: "C", text: "Khóa công khai của người nhận", isCorrect: false, distractorRationale: "Khóa công khai của người nhận dùng khi muốn mã hóa bảo mật thông điệp gửi cho họ, không phải để ký." },
      { id: "D", text: "Khóa bí mật của người nhận", isCorrect: false, distractorRationale: "Người gửi không thể và không được phép biết khóa bí mật của người nhận." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Quy tắc cơ bản của chữ ký số: Để ký tài liệu, người gửi phải sử dụng Khóa bí mật của chính người gửi (chỉ duy nhất người gửi nắm giữ). Khi người nhận nhận được tài liệu, họ sẽ dùng Khóa công khai của người gửi để kiểm tra chữ ký.",
      keyTakeaway: "Ký tài liệu trước khi gửi: Khóa bí mật của người gửi."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 65", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 10; Bảng 2"],
    reviewStatus: "verified"
  },
  {
    id: 66,
    originalQuestion: "Mối quan hệ giữa ISO/IEC 27001 và ISO/IEC 27002 là gì?",
    displayQuestion: "Mối quan hệ giữa ISO/IEC 27001 và ISO/IEC 27002 là gì?",
    originalAnswer: "27001 đưa ra yêu cầu, 27002 hướng dẫn thực hiện các biện pháp kiểm soát",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-1-isms-iso27001",
    conceptName: "Mối quan hệ ISO 27001 vs ISO 27002",
    options: [
      { id: "A", text: "27001 đưa ra yêu cầu, 27002 hướng dẫn thực hiện các biện pháp kiểm soát", isCorrect: true },
      { id: "B", text: "27001 hướng dẫn thực hiện kiểm soát, 27002 đưa ra yêu cầu ISMS", isCorrect: false, distractorRationale: "Đảo ngược sai lệch vai trò của 2 tiêu chuẩn." },
      { id: "C", text: "Cả hai tiêu chuẩn hoàn toàn giống hệt nhau về nội dung và cách thức áp dụng", isCorrect: false, distractorRationale: "27001 là tiêu chuẩn đánh giá chứng nhận, 27002 là cẩm nang hướng dẫn thực hành." },
      { id: "D", text: "27001 dành riêng cho quân đội, 27002 dành riêng cho cá nhân", isCorrect: false, distractorRationale: "Cả hai tiêu chuẩn đều áp dụng chung cho mọi tổ chức, doanh nghiệp." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Mối quan hệ Yêu cầu - Hướng dẫn trong bộ ISO 27000: ISO/IEC 27001 đưa ra các yêu cầu chính thức (requirements) cho ISMS, còn ISO/IEC 27002 đóng vai trò là tài liệu hướng dẫn thực hành chi tiết cho các biện pháp kiểm soát an toàn thông tin.",
      keyTakeaway: "Mối quan hệ: 27001 đưa ra yêu cầu, 27002 hướng dẫn thực hiện các biện pháp kiểm soát."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 66", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 1; Bảng 3"],
    reviewStatus: "verified"
  },
  {
    id: 67,
    originalQuestion: "“Phạm vi áp dụng” (scope) của Hệ thống Quản lý An toàn Thông tin (ISMS) theo ISO 27001 nhằm:",
    displayQuestion: "“Phạm vi áp dụng” (scope) của Hệ thống Quản lý An toàn Thông tin (ISMS) theo ISO 27001 nhằm:",
    originalAnswer: "Xác định ranh giới và giới hạn của ISMS trong tổ chức",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-1-isms-iso27001",
    conceptName: "Phạm vi Áp dụng (Scope) của ISMS",
    options: [
      { id: "A", text: "Xác định ranh giới và giới hạn của ISMS trong tổ chức", isCorrect: true },
      { id: "B", text: "Liệt kê danh sách tất cả số điện thoại của khách hàng", isCorrect: false, distractorRationale: "Đây là danh bạ dữ liệu khách hàng, không phải phạm vi ISMS." },
      { id: "C", text: "Cam kết không phát sinh bất kỳ chi phí đầu tư CNTT nào", isCorrect: false, distractorRationale: "Không liên quan đến mục đích của phạm vi ISMS." },
      { id: "D", text: "Quy định mức lương và thưởng cuối năm cho nhân viên bảo vệ", isCorrect: false, distractorRationale: "Thuộc chính sách tiền lương nhân sự." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Theo điều khoản 4.3 của tiêu chuẩn ISO/IEC 27001, việc xác định 'Phạm vi áp dụng' (scope) nhằm xác định rõ ràng ranh giới vật lý, tổ chức, công nghệ và các giới hạn áp dụng của ISMS trong tổ chức.",
      keyTakeaway: "Phạm vi áp dụng (scope) của ISMS: Xác định ranh giới và giới hạn của ISMS trong tổ chức."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 67", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 1; Bảng 3"],
    reviewStatus: "verified"
  },
  {
    id: 68,
    originalQuestion: "Điều khoản “Đánh giá rủi ro thông tin” trong ISO/IEC 27001 thuộc nhóm hoạt động nào?",
    displayQuestion: "Điều khoản “Đánh giá rủi ro thông tin” trong ISO/IEC 27001 thuộc nhóm hoạt động nào?",
    originalAnswer: "Hoạch định (Planning)",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-1-isms-iso27001",
    conceptName: "Đánh giá Rủi ro trong ISO 27001",
    options: [
      { id: "A", text: "Hoạch định (Planning)", isCorrect: true },
      { id: "B", text: "Đánh giá kết quả hoạt động (Performance evaluation)", isCorrect: false, distractorRationale: "Đánh giá kết quả là điều khoản 9, trong khi đánh giá rủi ro thuộc hoạch định điều khoản 6.1." },
      { id: "C", text: "Cải tiến liên tục (Improvement)", isCorrect: false, distractorRationale: "Cải tiến thuộc điều khoản 10 trong cấu trúc HLS." },
      { id: "D", text: "Hỗ trợ và nguồn lực (Support)", isCorrect: false, distractorRationale: "Hỗ trợ thuộc điều khoản 7 về năng lực, nhận thức và truyền thông." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Trong cấu trúc của tiêu chuẩn ISO/IEC 27001, điều khoản 6.1 về Đánh giá rủi ro an toàn thông tin (Information security risk assessment) nằm trong nhóm hoạt động Hoạch định (Planning).",
      keyTakeaway: "Điều khoản Đánh giá rủi ro thông tin trong ISO/IEC 27001 thuộc: Hoạch định (Planning)."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 68", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 1 và 2; Bảng 3"],
    reviewStatus: "verified"
  },
  {
    id: 69,
    originalQuestion: "Trong ISO/IEC 27001, “Statement of Applicability (SoA)” có mục đích gì?",
    displayQuestion: "Trong ISO/IEC 27001, “Statement of Applicability (SoA)” có mục đích gì?",
    originalAnswer: "Liệt kê các biện pháp kiểm soát được chọn và lý do áp dụng hoặc loại trừ",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-1-isms-iso27001",
    conceptName: "Tuyên bố Áp dụng (SoA)",
    options: [
      { id: "A", text: "Liệt kê các biện pháp kiểm soát được chọn và lý do áp dụng hoặc loại trừ", isCorrect: true },
      { id: "B", text: "Tính toán tiền thưởng cuối năm cho ban giám đốc công ty", isCorrect: false, distractorRationale: "Không liên quan đến tài liệu kiểm soát an ninh thông tin." },
      { id: "C", text: "Thay thế toàn bộ các hợp đồng lao động của nhân viên", isCorrect: false, distractorRationale: "SoA là tài liệu kỹ thuật quản trị ISMS, không phải hợp đồng nhân sự." },
      { id: "D", text: "Báo cáo doanh số bán hàng của phòng kinh doanh", isCorrect: false, distractorRationale: "Hoàn toàn sai phạm vi chuyên môn." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Statement of Applicability (SoA - Tuyên bố áp dụng) là tài liệu trọng yếu trong ISO/IEC 27001, có mục đích liệt kê đầy đủ các biện pháp kiểm soát cần thiết được tổ chức lựa chọn cùng lý do áp dụng, trạng thái triển khai hoặc lý do loại trừ.",
      keyTakeaway: "SoA (Statement of Applicability): Liệt kê các biện pháp kiểm soát được chọn và lý do áp dụng hoặc loại trừ."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 69", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 1; Bảng 3"],
    reviewStatus: "verified"
  },
  {
    id: 70,
    originalQuestion: "Sự khác biệt giữa ISO/IEC 27005 và ISO/IEC 27001 là:",
    displayQuestion: "Sự khác biệt giữa ISO/IEC 27005 và ISO/IEC 27001 là gì?",
    originalAnswer: "27005 tập trung vào quản lý rủi ro an toàn thông tin, còn 27001 đưa ra yêu cầu ISMS tổng thể",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-governance-iso",
    topicName: "Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000",
    conceptId: "concept-1-isms-iso27001",
    conceptName: "Sự khác biệt ISO 27005 vs ISO 27001",
    options: [
      { id: "A", text: "27005 tập trung vào quản lý rủi ro an toàn thông tin, còn 27001 đưa ra yêu cầu ISMS tổng thể", isCorrect: true },
      { id: "B", text: "27001 tập trung vào quản lý rủi ro, còn 27005 đưa ra yêu cầu ISMS tổng thể", isCorrect: false, distractorRationale: "Đảo ngược sai bản chất tiêu chuẩn." },
      { id: "C", text: "27005 là thuật toán mã hóa đối xứng, còn 27001 là thuật toán hàm băm", isCorrect: false, distractorRationale: "Cả hai đều là tiêu chuẩn quản lý quốc tế, không phải thuật toán mật mã." },
      { id: "D", text: "27005 chỉ dành cho mạng không dây, còn 27001 chỉ dành cho phần cứng", isCorrect: false, distractorRationale: "Sai lệch hoàn toàn phạm vi áp dụng." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "ISO/IEC 27001 cung cấp các yêu cầu cốt lõi cho một Hệ thống quản lý an toàn thông tin (ISMS) tổng thể, trong khi ISO/IEC 27005 là tiêu chuẩn hướng dẫn chuyên sâu tập trung vào quy trình Quản lý rủi ro an toàn thông tin.",
      keyTakeaway: "Khác biệt: 27005 tập trung vào quản lý rủi ro ATTT, còn 27001 đưa ra yêu cầu ISMS tổng thể."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 70", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 1; Bảng 3"],
    reviewStatus: "verified"
  }
];

// Write out to src/data/questions.json
const outputPath = path.join(process.cwd(), 'src', 'data', 'questions.json');
fs.writeFileSync(outputPath, JSON.stringify(allQuestions, null, 2), 'utf-8');
console.log(`Successfully written all ${allQuestions.length} questions to ${outputPath}`);
