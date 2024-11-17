"use client";

import RegisterForm from "./register-form";

export default function Page() {
  return (
    <div>
      <section className="bg-ct-blue-600 min-h-screen grid place-items-center">
        <div className="w-full">
          <h1 className="text-4xl lg:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
            Welcome!!
          </h1>
          <h2 className="text-lg text-center mb-4 text-ct-dark-200">
            Register to have access
          </h2>
          <RegisterForm />
        </div>
      </section>
    </div>
  );
}
