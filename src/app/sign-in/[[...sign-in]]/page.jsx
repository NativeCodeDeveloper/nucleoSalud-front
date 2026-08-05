import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <SignIn
        path="/sign-in"
        routing="path"
        fallbackRedirectUrl="/dashboard"
        withSignUp={false}
      />
    </main>
  );
}
