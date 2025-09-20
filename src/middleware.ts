import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ❌ URLs that are permanently removed
const goneURLs = [
  "/thank-you-hyderabad",
  "/about-us",
  "/450-apex",
  "/electric-bike-in-hyderabad",
  "/hello-world",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Case 1: Gone pages → return 410 Gone
  if (goneURLs.includes(pathname)) {
    return new NextResponse(
      `<html>
        <head><title>Page Removed</title></head>
        <body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center;">
          <div>
            <h1 style="font-size:24px;font-weight:bold;">This page has been permanently removed</h1>
            <p style="margin-top:10px;color:#555;">Please visit our <a href="/" style="color:#0070f3;text-decoration:underline;">homepage</a>.</p>
          </div>
        </body>
      </html>`,
      {
        status: 410,
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  }

  // Case 2: Other pages → continue as normal
  return NextResponse.next();
}