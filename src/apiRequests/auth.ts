/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "@/lib/http";
import { LoginResType, LoginUserInput } from "@/lib/validations/user.schema";

export const authApiRequest = {
  login: (body: LoginUserInput) => http.post<LoginResType>("/auth/login", body),
  test: () => http.get("/post/all"),
};
