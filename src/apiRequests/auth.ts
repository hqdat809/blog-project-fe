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
  logoutFromServerExpress: () => http.post("/auth/logout", {}),
};
