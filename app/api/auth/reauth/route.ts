import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  url.pathname = "/auth/login";
  url.search = new URLSearchParams({
    returnTo: "/account",
    prompt: "login",
  }).toString();
  return NextResponse.redirect(url);
}
