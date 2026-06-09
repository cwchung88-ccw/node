"use client";

import { useEffect } from "react";

export default function AdBanner() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (typeof window !== "undefined" && adsenseId && adsenseId !== "나중에_입력") {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense initialization error:", e);
      }
    }
  }, [adsenseId]);

  if (!adsenseId || adsenseId === "나중에_입력") {
    return null;
  }

  return (
    <div className="w-full flex justify-center my-6 overflow-hidden min-h-[100px] bg-neutral-50 border border-neutral-100 rounded-xl">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseId}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
