import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "렌탈프리",
  description: "렌탈 가격비교 전문 사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-50 border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="/" className="text-2xl font-bold text-sky-600">
              렌탈프리
            </a>

            <nav className="flex items-center gap-6">
              <a
                href="/"
                className="text-sm font-semibold text-slate-700 hover:text-sky-600"
              >
                홈
              </a>

              <div className="relative group">
                <span className="cursor-pointer text-sm font-semibold text-slate-700 hover:text-sky-600">
                  정수기
                </span>

                <div className="absolute left-0 top-full hidden w-40 rounded-xl border bg-white shadow-lg group-hover:block">
                  <a href="/water/coway" className="block px-4 py-3 text-gray-800 hover:bg-slate-100">
                    코웨이
                  </a>
                  <a href="/water/cuckoo" className="block px-4 py-3 text-gray-800 hover:bg-slate-100">
                    쿠쿠
                  </a>
                  <a href="/water/lg" className="block px-4 py-3 text-gray-800 hover:bg-slate-100">
                    LG
                  </a>
                  <a href="/water/skmagic" className="block px-4 py-3 text-gray-800 hover:bg-slate-100">
                    SK매직
                  </a>
                  <a href="/water/chungho" className="block px-4 py-3 text-gray-800 hover:bg-slate-100">
                    청호
                  </a>
                  <a href="/water/hyundai" className="block px-4 py-3 text-gray-800 hover:bg-slate-100">
                    현대
                  </a>
                </div>
              </div>

              <a
                href="/air"
                className="text-sm font-semibold text-slate-700 hover:text-sky-600"
              >
                공기청정기
              </a>

              <a
                href="/bidet"
                className="text-sm font-semibold text-slate-700 hover:text-sky-600"
              >
                비데
              </a>

              <a
                href="/mattress"
                className="text-sm font-semibold text-slate-700 hover:text-sky-600"
              >
                매트리스
              </a>

              <a
                href="/appliances"
                className="text-sm font-semibold text-slate-700 hover:text-sky-600"
              >
                가전
              </a>

              <a
                href="/cards"
                className="text-sm font-semibold text-slate-700 hover:text-sky-600"
              >
                제휴카드
              </a>

              <a
                href="/support"
                className="text-sm font-semibold text-slate-700 hover:text-sky-600"
              >
                고객센터
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <a
            href="https://open.kakao.com/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-yellow-400 px-5 py-3 font-bold text-slate-900 shadow"
          >
            카카오 상담
          </a>

          <a
            href="tel:01000000000"
            className="rounded-full bg-sky-500 px-5 py-3 font-bold text-white shadow"
          >
            전화 상담
          </a>
        </div>
      </body>
    </html>
  );
}