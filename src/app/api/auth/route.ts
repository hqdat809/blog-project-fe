import { getEnvVariable } from "@/lib/helpers";
import { NextResponse } from "next/server";

// Set Cookie for middleware next
export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = body.accessToken as string;
  const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");
  const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;

  const cookieOptions = {
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "development",
    maxAge: tokenMaxAge,
  };

  const response = new NextResponse(
    JSON.stringify({
      message: "Logged in successfully",
      accessToken,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  await Promise.all([
    response.cookies.set(cookieOptions),
    response.cookies.set({
      name: "logged-in",
      value: "true",
      maxAge: tokenMaxAge,
    }),
  ]);

  return response;
}
