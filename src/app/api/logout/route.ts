import { NextResponse } from "next/server";

// Set Cookie for middleware next
export async function POST() {
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

  await Promise.all([
    response.cookies.delete("accessToken"),
    response.cookies.set({
      name: "logged-in",
      value: "false",
    }),
  ]);

  return response;
}
