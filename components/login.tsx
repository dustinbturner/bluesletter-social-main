"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button onClick={() => signIn("atproto")} className='login-button'>
      Sign in with Bluesky
    </button>
  );
}
