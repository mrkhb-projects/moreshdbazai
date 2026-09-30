import { NextResponse } from "next/server";
import { getMarketSnapshot } from "@/lib/market-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snapshot = await getMarketSnapshot();
    return NextResponse.json(snapshot);
  } catch (error) {
    console.error("خطا در دریافت قیمت‌ها:", error);
    return NextResponse.json(
      { message: "دریافت اطلاعات بازار با خطا مواجه شد." },
      { status: 500 }
    );
  }
}
