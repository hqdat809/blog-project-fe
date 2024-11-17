"use client";
import { authApiRequest } from "@/apiRequests/auth";

export default function Page() {
  const handleLogout = async () => {
    await authApiRequest.logoutFromServerExpress();
    await authApiRequest.logoutFromServerNext();
  };

  return (
    <div>
      <p>Profile Page</p>
      <button onClick={() => handleLogout()}>LogOut</button>
    </div>
  );
}
