"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") ?? "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResultMessage("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          product,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "문의 전송에 실패했습니다.");
      }

      setResultMessage("상담 문의가 정상적으로 접수되었습니다.");
      setName("");
      setPhone("");
      setMessage("");
    } catch (error) {
      if (error instanceof Error) {
        setResultMessage(error.message);
      } else {
        setResultMessage("오류가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">상담 문의</h1>
      <p className="mt-3 text-gray-300">
        관심 있는 제품에 대해 상담을 신청하시면 빠르게 안내해드립니다.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-gray-700 bg-neutral-900 p-6"
      >
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              관심 제품
            </label>
            <input
              type="text"
              value={product}
              readOnly
              className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              연락처
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
              className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              문의 내용
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="문의 내용을 입력하세요"
              rows={5}
              className="w-full rounded-xl border border-gray-700 bg-black px-4 py-3 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "전송 중..." : "상담 문의 보내기"}
          </button>

          {resultMessage && (
            <p className="text-sm text-gray-200">{resultMessage}</p>
          )}
        </div>
      </form>
    </main>
  );
}
