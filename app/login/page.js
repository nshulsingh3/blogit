"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Redirect to the profile page if already logged in
      router.push("/profile");
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <button
        onClick={() => signIn("github")}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
