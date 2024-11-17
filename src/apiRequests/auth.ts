/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "@/lib/http";
import {
  LoginResType,
  LoginUserInput,
  RegisterResType,
  RegisterUserInput,
} from "@/lib/validations/user.schema";

export const authApiRequest = {
  login: (body: LoginUserInput) => http.post<LoginResType>("/auth/login", body),
  register: (body: RegisterUserInput) =>
    http.post<RegisterResType>("/auth/register", body),
  test: () => http.get("/post/all"),
  auth: (body: { accessToken: string; expiresAt: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
  logoutFromServerNext: () => http.post("/api/logout", null, { baseUrl: "" }),
  logoutFromServerExpress: () => http.post("/auth/logout", {}),
};
