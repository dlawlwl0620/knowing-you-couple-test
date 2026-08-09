import type { Metadata } from "next";
import "./globals.css";
import "./easy-customize.css";

export const metadata: Metadata = {
  title: "너를 알아가는 과정 | 커플 문답 테스트",
  description: "같은 50가지 질문에 따로 답하고, 서로를 얼마나 알고 있는지 확인하는 커플 답안지.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
