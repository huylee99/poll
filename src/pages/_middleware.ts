import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.cookies["poll-user-token"]) {
    return;
  }

  const res = NextResponse.next();

  res.cookie("poll-user-token", req.ip || nanoid(), {
    sameSite: "strict",
  });

  return res;
}
