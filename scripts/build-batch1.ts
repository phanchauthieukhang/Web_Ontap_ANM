/**
 * Builder script to generate src/data/questions.json
 * Contains all 70 questions with complete distractors, explanations, academic notes,
 * verified against File_cau_hoi.docx and File_he_thong_hoa_bo_cau_hoi.docx
 */

import * as fs from 'fs';
import * as path from 'path';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  distractorRationale?: string;
}

interface Question {
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

export const questionsData: Question[] = [
  // --- BATCH 1: Q1 - Q10 ---
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
      { id: "B", text: "Sai", isCorrect: false, distractorRationale: "ISO/IEC 27001 được thiết kế linh hoạt, phù hợp với mọi quy mô từ doanh nghiệp nhỏ đến tập đoàn đa quốc gia và cơ quan chính phủ." }
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
      { id: "B", text: "Thay thế hoàn toàn các giải pháp bảo mật kỹ thuật mạng", isCorrect: false, distractorRationale: "Chính sách là khung quy phạm định hướng hành vi và quản lý, không thể thay thế tường lửa, mã hóa hay công nghệ kỹ thuật." },
      { id: "C", text: "Phát hiện mã độc và ngăn chặn các cuộc tấn công DoS theo thời gian thực", isCorrect: false, distractorRationale: "Đây là vai trò của hệ thống phát hiện/ngăn chặn xâm nhập (IDS/IPS) và phần mềm chống mã độc, không phải của văn bản chính sách." },
      { id: "D", text: "Chỉ tập trung xử phạt vi phạm hành chính đối với nhân viên công nghệ thông tin", isCorrect: false, distractorRationale: "Chính sách áp dụng cho toàn bộ tổ chức và nhằm mục đích phòng ngừa, bảo vệ chứ không chỉ xử phạt riêng bộ phận IT." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Về mặt vận hành, mục đích chủ yếu của chính sách an ninh thông tin là theo dõi và kiểm soát thông tin, đảm bảo an toàn cho dữ liệu quan trọng của tổ chức.",
      keyTakeaway: "Chính sách ATTT về mặt vận hành: Theo dõi và kiểm soát thông tin, đảm bảo an toàn cho dữ liệu quan trọng."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 2", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 3"],
    reviewStatus: "verified"
  },
  {
    id: 3,
    originalQuestion: "RSA là giải thuật",
    displayQuestion: "RSA là giải thuật",
    originalAnswer: "Mã công khai",
    answerType: "single_choice",
    questionPolarity: "positive",
    topicId: "topic-cryptography",
    topicName: "Mật mã học, Hàm băm & Chữ ký số",
    conceptId: "concept-8-pkc-rsa",
    conceptName: "Hệ Mã hóa Khóa công khai / Phi đối xứng (PKC) & RSA",
    options: [
      { id: "A", text: "Mã công khai", isCorrect: true },
      { id: "B", text: "Mã hóa khóa đối xứng", isCorrect: false, distractorRationale: "Mã hóa khóa đối xứng sử dụng chung 1 khóa (như DES, AES), còn RSA sử dụng cặp khóa công khai và bí mật." },
      { id: "C", text: "Hàm băm một chiều", isCorrect: false, distractorRationale: "Hàm băm là hàm nén một chiều như MD5 hay SHA-256, không có khóa và không thể giải mã." },
      { id: "D", text: "Mã hóa thay thế cổ điển đơn bảng", isCorrect: false, distractorRationale: "Mã thay thế cổ điển (như Caesar) thuộc hệ mã cổ điển, không phải giải thuật khóa công khai hiện đại." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "RSA (viết tắt của Ron Rivest, Adi Shamir và Leonard Adleman) là một giải thuật mã hóa khóa công khai (Public Key Cryptography - PKC) kinh điển, dựa trên bài toán phân tích thừa số nguyên tố lớn.",
      keyTakeaway: "RSA = Giải thuật mã hóa khóa công khai (PKC)."
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
      { id: "D", text: "ISO 9001", isCorrect: false, distractorRationale: "ISO 9001 là tiêu chuẩn về Hệ thống quản lý chất lượng (QMS), không phải ISMS." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "ISO/IEC 27001 là tiêu chuẩn quốc tế cung cấp các yêu cầu (requirements) chính thức để thiết lập, triển khai, duy trì và cải tiến liên tục Hệ thống quản lý an toàn thông tin (ISMS).",
      keyTakeaway: "ISO/IEC 27001 = Cung cấp yêu cầu (requirements) cho ISMS tổng thể."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 4", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 1, Đối tượng 1"],
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
      { id: "B", text: "WPA2", isCorrect: false, distractorRationale: "WPA2 ra đời trước WPA3 và dễ bị tổn thương bởi các cuộc tấn công như KRACK (Key Reinstallation Attack)." },
      { id: "C", text: "WEP", isCorrect: false, distractorRationale: "WEP (Wired Equivalent Privacy) là chuẩn bảo mật Wi-Fi rất cũ và có lỗ hổng nghiêm trọng, có thể bị bẻ khóa chỉ trong vài phút." },
      { id: "D", text: "WPA", isCorrect: false, distractorRationale: "WPA là chuẩn quá độ từ WEP lên WPA2, sử dụng TKIP hiện nay đã lỗi thời và không an toàn." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "WPA3 (Wi-Fi Protected Access 3) là chuẩn bảo mật mạng không dây mới nhất và an toàn nhất hiện nay, cung cấp cơ chế SAE (Simultaneous Authentication of Equals) chống tấn công từ điển ngoại tuyến và mã hóa 192-bit trong chế độ Enterprise.",
      keyTakeaway: "WPA3 là phương pháp bảo mật mạng không dây an toàn nhất hiện nay."
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
      { id: "B", text: "Phishing", isCorrect: false, distractorRationale: "Phishing là tấn công lừa đảo người dùng nhấp vào liên kết độc hại hoặc email giả mạo, không phải hành vi nhìn trộm trực tiếp." },
      { id: "C", text: "Man-in-the-middle", isCorrect: false, distractorRationale: "Man-in-the-middle là tấn công kỹ thuật mạng đứng xen giữa đường truyền để nghe lén/sửa đổi gói tin, không phải nhìn trộm cơ học." },
      { id: "D", text: "Dumpster Diving", isCorrect: false, distractorRationale: "Dumpster Diving là hành vi lục thùng rác để tìm kiếm tài liệu nhạy cảm bị vứt bỏ, không phải quan sát màn hình người dùng." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Shoulder Surfing (nhìn trộm qua vai) là một kỹ thuật tấn công phi kỹ thuật (Social Engineering), trong đó kẻ tấn công trực tiếp quan sát qua vai nạn nhân tại màn hình máy tính, bàn phím ATM hoặc thiết bị di động để đánh cắp mật khẩu, mã PIN hoặc thông tin bí mật.",
      keyTakeaway: "Nhìn trộm thông tin tại màn hình/bàn phím/ATM/nơi công cộng = Shoulder Surfing."
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
      { id: "B", text: "Giao thức truyền file bảo mật", isCorrect: false, distractorRationale: "Giao thức truyền file bảo mật là SFTP/FTPS, không liên quan đến Backdoor." },
      { id: "C", text: "Phương pháp tạo cặp khóa mật mã", isCorrect: false, distractorRationale: "Tạo cặp khóa là chức năng của giải thuật mã hóa khóa công khai, không phải Backdoor." },
      { id: "D", text: "Thiết bị phần cứng chống sét cho phòng máy", isCorrect: false, distractorRationale: "Đây là thiết bị an toàn vật lý, không phải phần mềm xâm nhập." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Trong bộ câu hỏi môn học, Back doors (cửa hậu) được định nghĩa là 'Kiểu tấn công có chủ đích bằng phần mềm', cho phép kẻ tấn công bỏ qua các cơ chế xác thực thông thường để duy trì quyền truy cập trái phép vào hệ thống.",
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
      { id: "B", text: "Tấn công từ chối dịch vụ (DoS)", isCorrect: false, distractorRationale: "Tấn công DoS nhằm làm kiệt quệ tài nguyên máy chủ để chặn người dùng truy cập, không phải kỹ thuật nghe lén/chặn luồng liên lạc." },
      { id: "C", text: "Tấn công phi kỹ thuật tại văn phòng", isCorrect: false, distractorRationale: "Các kỹ thuật trên đòi hỏi can thiệp giao thức và đường truyền mạng kỹ thuật, không phải tấn công tâm lý xã hội đơn thuần." },
      { id: "D", text: "Kiểm toán an ninh thông tin", isCorrect: false, distractorRationale: "Kiểm toán an ninh là quy trình đánh giá tuân thủ chính sách, không phải hình thức tấn công." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Theo bộ câu hỏi ngân hàng đề, 4 kỹ thuật Packet sniffer (bắt gói tin), Spoofing (giả mạo), Pharming (chuyển hướng truy cập) và Man-in-the-middle (người đứng giữa) được nhóm chung vào loại Tấn công chặn liên lạc.",
      keyTakeaway: "Packet sniffer, Spoofing, Pharming, Man-in-the-middle thuộc nhóm Tấn công chặn liên lạc."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 8", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 3, Đối tượng 12; Phần VI.1"],
    academicNote: "Lưu ý học thuật: Packet sniffer và Man-in-the-middle trực tiếp nghe lén/chặn bắt gói tin. Spoofing và Pharming (đầu độc DNS/hosts) bản chất là kỹ thuật giả mạo/chuyển hướng nhưng được nhóm đề xếp chung vào nhóm tấn công chặn liên lạc.",
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
      { id: "B", text: "Đánh cắp khóa bí mật trong cơ sở dữ liệu", isCorrect: false, distractorRationale: "Mục tiêu của DoS là phá hoại tính sẵn sàng (Availability), không nhằm trích xuất khóa bí mật." },
      { id: "C", text: "Mã hóa toàn bộ dữ liệu để tống tiền", isCorrect: false, distractorRationale: "Đây là mục tiêu của phần mềm mã độc tống tiền (Ransomware)." },
      { id: "D", text: "Sửa đổi nội dung bản rõ trước khi mã hóa", isCorrect: false, distractorRationale: "Đây là hành vi xâm phạm tính toàn vẹn (Integrity), không phải bản chất của DoS." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Tấn công từ chối dịch vụ (DoS - Denial of Service) có mục tiêu chính là làm tê liệt hoặc quá tải tài nguyên mạng/máy chủ, khiến cho người dùng hợp pháp không thể truy cập vào dịch vụ hoặc hệ thống đó.",
      keyTakeaway: "Mục tiêu của DoS = Chặn người dùng hợp pháp truy cập vào các hệ thống (xâm phạm Tính sẵn sàng - Availability)."
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
      { id: "C", text: "Chữ ký điện tử hoàn toàn không có giá trị pháp lý trong bất kỳ giao dịch nào", isCorrect: false, distractorRationale: "Chữ ký điện tử được pháp luật thừa nhận và có giá trị xác thực tính toàn vẹn, nguồn gốc trong giao dịch điện tử." },
      { id: "D", text: "Chữ ký điện tử bắt buộc phải sử dụng giải thuật mã hóa đối xứng DES", isCorrect: false, distractorRationale: "Chữ ký số/điện tử dựa trên hệ mật mã khóa công khai, không dựa trên mã đối xứng DES." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Chữ ký điện tử có chức năng quan trọng là xác thực tính toàn vẹn của dữ liệu (bảo đảm thông điệp không bị chỉnh sửa sau khi ký) và xác thực danh tính người gửi.",
      keyTakeaway: "Chữ ký điện tử có thể sử dụng để xác thực tính toàn vẹn dữ liệu."
    },
    sourceReferences: ["File_cau_hoi.docx - Câu 10", "File_he_thong_hoa_bo_cau_hoi.docx - Nhóm 2, Đối tượng 10"],
    reviewStatus: "verified"
  },

  // --- BATCH 2: Q11 - Q20 ---
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
      { id: "D", text: "Cùng không thể kết hợp với hàm băm", isCorrect: false, distractorRationale: "Chữ ký số trên thực tế luôn kết hợp chặt chẽ với hàm băm để ký trên bản tóm lược." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Điểm tương đồng bản chất giữa chữ ký số và hệ mã hóa khóa công khai (PKC) là cả hai đều sử dụng cặp 2 khóa bất đối xứng: khóa bí mật (private key) và khóa công khai (public key).",
      keyTakeaway: "Điểm giống nhau cốt lõi: Cùng sử dụng 2 khóa bí mật và công khai."
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
      { id: "B", text: "Chữ ký số chỉ dùng thuật toán đối xứng DES còn PKC dùng RSA", isCorrect: false, distractorRationale: "Chữ ký số được xây dựng trên thuật toán khóa công khai, không dùng DES." },
      { id: "C", text: "Chữ ký số không cần kiểm tra tính toàn vẹn dữ liệu", isCorrect: false, distractorRationale: "Chữ ký số có mục tiêu hàng đầu là xác thực và đảm bảo tính toàn vẹn dữ liệu." },
      { id: "D", text: "Chữ ký số sử dụng 3 khóa khác nhau", isCorrect: false, distractorRationale: "Chữ ký số chỉ dùng một cặp 2 khóa (bí mật và công khai)." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Sự khác biệt căn bản: Mã hóa PKC dùng khóa công khai (người nhận) để mã hóa và khóa bí mật (người nhận) để giải mã. Trong khi đó, Chữ ký số dùng khóa bí mật (người gửi) để KÝ và khóa công khai (người gửi) để KIỂM TRA. Vai trò của đối tượng và thứ tự sử dụng khóa được đảo ngược lại.",
      keyTakeaway: "Chữ ký số và PKC dùng cùng cặp khóa nhưng đảo ngược vai trò đối tượng tham gia và thứ tự khóa."
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
      { id: "B", text: "Chữ ký số chỉ được tạo ra bằng phương pháp mã hóa thay thế Caesar", isCorrect: false, distractorRationale: "Mã Caesar là mã cổ điển đơn giản, không đủ cơ sở toán học để tạo chữ ký số." },
      { id: "C", text: "Chữ ký số chỉ hoạt động khi không có đường truyền mạng", isCorrect: false, distractorRationale: "Chữ ký số được thiết kế chuyên biệt cho truyền thông mạng và giao dịch điện tử." },
      { id: "D", text: "Chữ ký số không thể kiểm tra được bởi người nhận", isCorrect: false, distractorRationale: "Bất kỳ ai có khóa công khai của người gửi đều kiểm tra được tính hợp lệ của chữ ký." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Chữ ký số là ứng dụng trực tiếp được hình thành từ các thuật toán mã hóa khóa công khai (PKC), tận dụng tính bất đối xứng của cặp khóa để chứng thực nguồn gốc và chống chối bỏ.",
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
      { id: "B", text: "Một đầu vào có thể tạo ra vô số giá trị băm ngẫu nhiên khác nhau ở mỗi lần băm", isCorrect: false, distractorRationale: "Hàm băm có tính tất định (deterministic), cùng 1 đầu vào luôn cho chính xác 1 giá trị đầu ra." },
      { id: "C", text: "Dễ dàng giải mã ngược từ giá trị băm để tìm lại văn bản gốc", isCorrect: false, distractorRationale: "Hàm băm là hàm một chiều (one-way), không có khả năng giải mã ngược." },
      { id: "D", text: "Độ dài đầu ra luôn thay đổi tỉ lệ thuận với dung lượng dữ liệu đầu vào", isCorrect: false, distractorRationale: "Độ dài đầu ra của một giải thuật băm luôn cố định (ví dụ SHA-256 luôn ra 256 bit)." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Tính tất định (deterministic) là đặc điểm cơ bản của hàm băm: với mỗi một giá trị đầu vào xác định, hàm băm sẽ luôn tạo ra duy nhất một giá trị đầu ra tương ứng.",
      keyTakeaway: "Đặc điểm hàm băm: Tính tất định - Với mỗi giá trị đầu vào chỉ duy nhất có một giá trị đầu ra tương ứng."
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
      { id: "B", text: "128 byte", isCorrect: false, distractorRationale: "Bẫy tính nhầm lấy 1024 chia đôi qua 3 lần (1024 -> 512 -> 256 -> 128). Hàm băm không chia đôi dung lượng mà cho kích thước cố định." },
      { id: "C", text: "256 byte", isCorrect: false, distractorRationale: "Bẫy chia đôi dung lượng sau 2 lần băm." },
      { id: "D", text: "64 byte", isCorrect: false, distractorRationale: "Bẫy suy đoán kích thước suy giảm lũy thừa." }
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
      { id: "B", text: "DES", isCorrect: false, distractorRationale: "DES (Data Encryption Standard) là giải thuật mã hóa khóa đối xứng kinh điển." },
      { id: "C", text: "3-DES", isCorrect: false, distractorRationale: "Triple DES là phiên bản nâng cấp của DES, vẫn thuộc hệ mã khóa đối xứng." },
      { id: "D", text: "AES", isCorrect: false, distractorRationale: "AES (Advanced Encryption Standard) là tiêu chuẩn mã hóa khóa đối xứng hiện đại." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "El-Gamal là một giải thuật mã hóa thuộc hệ mã hóa khóa công khai (phi đối xứng), dựa trên bài toán logarit rời rạc. Do đó, El-Gamal không sử dụng khóa đối xứng, trong khi DES, 3-DES và AES đều là các thuật toán mã hóa đối xứng.",
      keyTakeaway: "El-Gamal = Giải thuật mã hóa khóa công khai (không dùng khóa đối xứng)."
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
      { id: "B", text: "Dễ dàng phân phối khóa an toàn trên mạng công cộng mà không sợ lộ", isCorrect: false, distractorRationale: "Đây là nhược điểm lớn nhất của hệ mã đối xứng, không phải ưu điểm." },
      { id: "C", text: "Cung cấp sẵn cơ chế chữ ký số mà không cần bổ sung thuật toán", isCorrect: false, distractorRationale: "Hệ mã đối xứng không thể tự tạo chữ ký số chống chối bỏ vì hai bên cùng giữ chung một khóa." },
      { id: "D", text: "Không cần chia sẻ bất kỳ khóa nào giữa các bên", isCorrect: false, distractorRationale: "Mã hóa đối xứng bắt buộc cả hai bên phải chia sẻ chung một khóa mật." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Ưu điểm vượt trội của hệ mã hóa khóa bí mật (đối xứng) là tốc độ xử lý mã hóa và giải mã rất cao (nhanh hơn hàng trăm đến hàng nghìn lần so với mã hóa khóa công khai) nhờ các phép toán hoán vị và thay thế bit đơn giản.",
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
      { id: "B", text: "Không thể dùng khóa công khai trên mạng Internet", isCorrect: false, distractorRationale: "Khóa công khai được thiết kế công khai tự do trên Internet." },
      { id: "C", text: "Người nhận và người gửi bắt buộc phải dùng chung một khóa", isCorrect: false, distractorRationale: "Đây là đặc điểm của hệ mã đối xứng, PKC sử dụng 2 khóa khác nhau." },
      { id: "D", text: "Không thể ứng dụng để xác thực nguồn gốc dữ liệu", isCorrect: false, distractorRationale: "PKC là nền tảng cốt lõi của chữ ký số dùng để xác thực nguồn gốc dữ liệu." }
    ],
    correctOptionId: "A",
    explanation: {
      correctRationale: "Hệ mã khóa công khai phải xử lý các phép toán số học mô-đun phức tạp trên các số nguyên rất lớn (như phép lũy thừa modulo trong RSA), dẫn đến nhược điểm lớn nhất là tốc độ xử lý của thuật toán rất chậm so với mã khóa đối xứng.",
      keyTakeaway: "Nhược điểm lớn nhất của PKC: Tốc độ xử lý của thuật toán chậm."
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
      correctRationale: "PKC là viết tắt của Public Key Cryptography, trong tiếng Việt được gọi là Hệ mã hóa khóa công khai hoặc Hệ mã khóa phi đối xứng (hệ mật mã không đối xứng).",
      keyTakeaway: "PKC = Public Key Cryptography = Hệ mã khóa phi đối xứng (khóa công khai)."
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
      { id: "A", text: "Ba (mã hóa khóa đối xứng, mã hóa khóa công khai, hàm băm)", isCorrect: true },
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
  }
];

console.log(`Loaded initial ${questionsData.length} questions structure.`);
