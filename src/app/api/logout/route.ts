/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

// Set Cookie for middleware next
export async function POST(req: NextRequest) {
  const response = new NextResponse(
    JSON.stringify({
      message: "Logged out successfully",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("logout");

  await Promise.all([
    response.cookies.delete("accessToken"),
    response.cookies.delete("logged-in"),
  ]);

  return response;
}
