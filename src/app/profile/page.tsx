"use client";
import { authApiRequest } from "@/apiRequests/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleLogout = async () => {
    await authApiRequest.logoutFromServerExpress();
    return router.replace("/login");
  };

  return (
    <div>
      <p>Profile Page</p>
      <button onClick={() => handleLogout()}>LogOut</button>
    </div>
  );
}
