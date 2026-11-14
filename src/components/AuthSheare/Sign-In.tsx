'use client';

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { showToast } from "@/lib/utils/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Sparkles, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State for inline email validation (@ and . check)
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Email validation handler to check '@' and '.'
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);

    if (val.trim() === "") {
      setEmailError("Email address is required.");
    } else if (!val.includes("@") || !val.includes(".")) {
      setEmailError("Please enter a valid email containing '@' and '.'");
    } else {
      setEmailError(""); // No error
    }
  };

  // Handle email/password sign-in submission
  const HandleonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prevent submission if email is invalid
    if (emailError || !email.includes("@") || !email.includes(".")) {
      showToast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    console.log(user)

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/"
      //  callbackUrl,
    });

    setLoading(false);

    if (error) {
      showToast.error('Sign-in failed! Please check your credentials.');
      return;
    }

    showToast.success('Successfully signed in!');
    // router.replace(callbackUrl);
    router.refresh();
  };

  // Google OAuth Sign In Handler
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  // GitHub OAuth Sign In Handler
  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: callbackUrl,
    });
  };

  return (
    <div className="min-h-screen bg-[#07090e] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] flex items-center flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Glow & Ambient Lighting Effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Header Branding */}
      <div className="text-center space-y-3 mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold shadow-inner mb-1 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Secure Portal Access</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-200 tracking-tight">
          Welcome Back 👋
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto font-normal">
          Enter your credentials to manage your workflow, sync data, and explore your dashboard.
        </p>
      </div>

      {/* Main Glassmorphism Form Box using standard HTML form styled with Shadcn/Tailwind classes */}
      <form 
        onSubmit={HandleonSubmit}
        className="w-full max-w-md space-y-5 rounded-[2.5rem] border border-white/10 bg-slate-900/60 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] relative z-10 transition-all duration-300 hover:border-indigo-500/30"
      >
        {/* Social Authentication Providers */}
        <div className="grid grid-cols-2 gap-3 pb-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="group relative flex items-center justify-center gap-2.5 rounded-2xl border border-slate-700/60 bg-slate-800/40 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:border-indigo-500/50 hover:text-white hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer active:scale-95"
          >
            <svg className="w-4 h-4 transition-transform group-hover:scale-110 duration-300" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.8 7.3l3.7 2.9C6.4 7.2 9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
              <path fill="#FBBC05" d="M5.5 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.8 7.3C.7 9.5 0 10.7 0 12.5s.7 3 1.8 5.2l3.7-2.9z" />
              <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.6-2.2-6.5-5.2L1.8 17C3.7 20.7 7.5 24 12 24z" />
            </svg>
            Google
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="group relative flex items-center justify-center gap-2.5 rounded-2xl border border-slate-700/60 bg-slate-800/40 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:border-indigo-500/50 hover:text-white hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer active:scale-95"
          >
            <FaGithub className="size-4 transition-transform group-hover:scale-110 duration-300"/>
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">Or continue with email</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Email Input Field with Inline Validation */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-indigo-400"/> Email Address
          </label>
          <div className="relative">
            <input 
              name="email" 
              type="email" 
              required
              value={email}
              onChange={handleEmailChange}
              placeholder="name@example.com" 
              className="w-full rounded-2xl border border-slate-700/70 px-4 py-3 pr-10 text-sm text-slate-100 placeholder-slate-500 bg-slate-950/60 focus:bg-slate-950 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 transition-all duration-200 shadow-inner"
            />
            {/* Real-time status icon inside input */}
            {email.length > 0 && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                {email.includes("@") && email.includes(".") ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                )}
              </div>
            )}
          </div>
          {/* Dynamic Error Message */}
          {emailError && (
            <span className="text-xs font-medium text-rose-400 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {emailError}
            </span>
          )}
        </div>

        {/* Password Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs sm:text-sm font-medium text-slate-300 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-indigo-400"/> Password
          </label>
          <div className="relative">
            <input 
              name="password" 
              type={showPassword ? "text" : "password"} 
              required
              minLength={8} 
              placeholder="••••••••" 
              className="w-full rounded-2xl border border-slate-700/70 px-4 py-3 pr-11 text-sm text-slate-100 placeholder-slate-500 bg-slate-950/60 focus:bg-slate-950 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 transition-all duration-200 shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors focus:outline-none p-1 rounded-lg hover:bg-slate-800/50"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
            Minimum 8 characters with a mix of letters and numbers.
          </p>
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button 
            disabled={loading || Boolean(emailError)} 
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-600/25 transition-all duration-300 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-600/40 hover:-translate-y-0.5 cursor-pointer active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
          <button 
            type="reset" 
            onClick={() => { setEmail(""); setEmailError(""); }}
            className="rounded-2xl border border-slate-700/60 bg-slate-800/40 px-5 py-3.5 text-sm font-semibold text-slate-300 shadow-sm transition-all duration-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white cursor-pointer active:scale-[0.98]"
          >
            Reset
          </button>
        </div>

        {/* Signup Redirect Footer */}
        <div className="pt-4 text-center border-t border-slate-800/80">
          <p className="text-xs text-slate-400">
            Don{"'"}t have an account?{" "}
            <Link className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4 decoration-indigo-500/40 hover:decoration-indigo-300" href="/sign-up">
              Sign up now
            </Link>
          </p>
        </div>
      </form>

      {/* Back to Home Navigation Link */}
      <div className="text-center mt-6 relative z-10">
        <Link className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-all duration-300 bg-slate-900/40 hover:bg-slate-800/80 px-5 py-2.5 rounded-full border border-slate-800/60 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-0.5" href="/">
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"/>
          <span>Back to Home</span>
        </Link>
      </div>

    </div>
  );
};

export default SignInPage;