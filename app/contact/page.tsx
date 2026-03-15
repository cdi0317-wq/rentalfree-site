import { Suspense } from "react";
import ContactPageClient from "./ContactPageClient";

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">로딩중...</div>}>
      <ContactPageClient />
    </Suspense>
  );
}