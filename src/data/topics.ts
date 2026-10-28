import { Topic } from '../types/quiz';

export const TOPICS: Topic[] = [
  {
    id: 'topic-governance-iso',
    title: 'Quản trị ATTT & Tiêu chuẩn ISO/IEC 27000',
    description: 'Chính sách bảo mật, quản lý rủi ro, kiểm toán an ninh, các bước thực thi ISMS và bộ tiêu chuẩn ISO/IEC 27001, 27002, 27005.',
    iconName: 'ShieldCheck',
    color: 'emerald',
    questionCount: 18,
  },
  {
    id: 'topic-cryptography',
    title: 'Mật mã học, Hàm băm & Chữ ký số',
    description: 'Mã Caesar, hệ mã đối xứng (DES, 3-DES, AES), hệ mã công khai PKC (RSA, El-Gamal), hàm băm MD5/SHA-256 và chữ ký số CA.',
    iconName: 'KeyRound',
    color: 'sky',
    questionCount: 40,
  },
  {
    id: 'topic-threats-defense',
    title: 'Lỗ hổng, Tấn công mạng & Phòng vệ thực hành',
    description: 'Lỗ hổng phần mềm, tấn công chặn liên lạc (Sniffer, Spoofing, Pharming, MITM), DoS, Backdoor, Social Engineering và bảo mật Wi-Fi/Web.',
    iconName: 'AlertTriangle',
    color: 'amber',
    questionCount: 12,
  },
];
