"use client";
import { UserProfile, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <SignedIn>
        <UserProfile routing="path" path="/account" />
      </SignedIn>

      <SignedOut>
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700">You’re not signed in.</p>
          <SignInButton mode="redirect">
            <button className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
              Sign in
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}
