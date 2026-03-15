const brands = [
  {
    name: "코웨이",
    slug: "coway",
    desc: "코웨이 공기청정기 전체 보기",
  },
  {
    name: "쿠쿠",
    slug: "cuckoo",
    desc: "쿠쿠 공기청정기 전체 보기",
  },
  {
    name: "LG",
    slug: "lg",
    desc: "LG 공기청정기 전체 보기",
  },
  {
    name: "SK매직",
    slug: "skmagic",
    desc: "SK매직 공기청정기 전체 보기",
  },
  {
    name: "청호",
    slug: "chungho",
    desc: "청호 공기청정기 전체 보기",
  },
  {
    name: "현대",
    slug: "hyundai",
    desc: "현대 공기청정기 전체 보기",
  },
];

export default function AirPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="rounded-3xl border bg-white p-10 shadow-sm">
        <p className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          AIR PURIFIER
        </p>

        <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
          공기청정기 브랜드 선택
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          원하는 브랜드를 선택하면 해당 공기청정기 제품 목록으로 이동합니다.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {brands.map((brand) => (
          <a
            key={brand.slug}
            href={`/air/${brand.slug}`}
            className="rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">{brand.name}</h2>
            <p className="mt-3 text-slate-600">{brand.desc}</p>

            <div className="mt-6 inline-flex rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white">
              브랜드 보기
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
