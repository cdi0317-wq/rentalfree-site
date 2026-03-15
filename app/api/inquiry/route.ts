export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const product = String(body.product ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !phone) {
      return Response.json(
        { message: "이름과 연락처를 입력해주세요." },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return Response.json(
        { message: "텔레그램 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const text = [
      "📩 렌탈프리 상담문의",
      "",
      `이름: ${name}`,
      `연락처: ${phone}`,
      `관심제품: ${product || "-"}`,
      `문의내용: ${message || "-"}`,
    ].join("\n");

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      }
    );

    if (!telegramRes.ok) {
      return Response.json(
        { message: "텔레그램 전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
