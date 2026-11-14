'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  UserRound,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { FaGithub, FaGoogle } from "react-icons/fa6"

import { authClient } from "@/lib/auth-client"
import { showToast } from "@/lib/utils/toast"

// ------------------------------------------------------------------
// 🎭 ইউজারের রোল ডিফিনিশন
// ------------------------------------------------------------------
type UserRole = "seeker" | "recruiter" | "admin"

const roleOptions: {
  value: UserRole
  label: string
  description: string
  icon: LucideIcon
}[] = [
    {
      value: "seeker",
      label: "Seeker",
      description: "Looking for dream opportunities.",
      icon: UserRound,
    },
    {
      value: "recruiter",
      label: "Recruiter",
      description: "Hiring top-tier talent.",
      icon: Briefcase,
    },
    {
      value: "admin",
      label: "Admin",
      description: "Managing platform ecosystem.",
      icon: ShieldCheck,
    },
  ]

// পাসওয়ার্ড শক্তির রুলস
const passwordRules = [
  { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "One number", test: (value: string) => /\d/.test(value) },
]

export function SignUpForm() {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<UserRole>("seeker")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const passedRules = passwordRules.filter((rule) => rule.test(password)).length
  const selectedRole = roleOptions.find((option) => option.value === role) ?? roleOptions[0]

  /**
   * 🧾 অ্যাকাউন্ট তৈরি হ্যান্ডলার
   */
  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage("")

    const formData = new FormData(event.currentTarget)
    const user = Object.fromEntries(formData.entries()) as {
      name: string
      email: string
      password: string
    }

    try {
      const { error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        role,
      })

      if (error) {
        setErrorMessage(error.message || "Could not create your account.")
        showToast.error(error.message || "Could not create your account.")
        return
      }

      showToast.success("Account created! Now complete your profile.")
      router.push("/profile")
      router.refresh()
    } catch (error) {
      console.error("Sign up error:", error)
      setErrorMessage("Something went wrong. Please try again.")
      showToast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // 🌐 সোশ্যাল অথেন্টিকেশন (গুগল ও গিটহাব)
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/profile",
    })
  }

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/profile",
    })
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* গ্লাস মর্ফিজম কার্ড কন্টেইনার */}
      <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] relative z-10 transition-all duration-300 hover:border-violet-500/30">

        {/* হেডার সেকশন */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold shadow-inner mb-1 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Create Your Account</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-violet-200 tracking-tight">
            Get Started Today 🚀
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>

        {/* সোশ্যাল সাইন-আপ বাটন */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group flex items-center justify-center gap-2.5 rounded-2xl border border-slate-700/60 bg-slate-800/40 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:border-violet-500/50 hover:text-white cursor-pointer active:scale-95 disabled:opacity-50 shadow-sm"
          >
            <FaGoogle className="size-4 text-rose-500 transition-transform group-hover:scale-110 duration-300" />
            Google
          </button>
          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={loading}
            className="group flex items-center justify-center gap-2.5 rounded-2xl border border-slate-700/60 bg-slate-800/40 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:border-violet-500/50 hover:text-white cursor-pointer active:scale-95 disabled:opacity-50 shadow-sm"
          >
            <FaGithub className="size-4 text-white transition-transform group-hover:scale-110 duration-300" />
            GitHub
          </button>
        </div>

        {/* ডিভাইডার */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">Or continue with email</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* এরর মেসেজ বক্স */}
        {errorMessage && (
          <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-200 backdrop-blur-md">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSignUp}>
          {/* রোল সিলেকশন ট্যাব */}
          <div className="space-y-2">
            <span className="block text-xs sm:text-sm font-medium text-slate-300">I am joining as</span>

            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map((option) => {
                const Icon = option.icon
                const isSelected = role === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    aria-pressed={isSelected}
                    className={`flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 text-xs font-medium transition-all duration-300 cursor-pointer ${isSelected
                        ? "border-violet-500 bg-violet-600/20 text-violet-200 shadow-lg shadow-violet-500/10 ring-2 ring-violet-500/20"
                        : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                  >
                    <Icon className="size-4" />
                    {option.label}
                  </button>
                )
              })}
            </div>
            <p className="text-[11px] text-slate-500 italic px-1">{selectedRole.description}</p>
          </div>

          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-slate-300">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <UserRound className="size-4" />
              </span>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ayesha Rahman"
                autoComplete="name"
                required
                className="w-full rounded-2xl border border-slate-700/70 bg-slate-950/60 py-3 pr-4 pl-11 text-sm text-slate-100 placeholder-slate-500 shadow-inner transition-all duration-200 focus:border-violet-500 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-violet-500/15"
              />
            </div>
          </div>

          {/* Email Address Field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-slate-300">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Mail className="size-4" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-2xl border border-slate-700/70 bg-slate-950/60 py-3 pr-4 pl-11 text-sm text-slate-100 placeholder-slate-500 shadow-inner transition-all duration-200 focus:border-violet-500 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-violet-500/15"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Lock className="size-4" />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-700/70 bg-slate-950/60 py-3 pr-11 pl-11 text-sm text-slate-100 placeholder-slate-500 shadow-inner transition-all duration-200 focus:border-violet-500 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-violet-500/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-slate-200 focus:outline-none"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            {/* পাসওয়ার্ড স্ট্রেন্থ বার */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {passwordRules.map((rule, index) => (
                <span
                  key={rule.label}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index < passedRules ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-slate-800"
                    }`}
                />
              ))}
            </div>

            <ul className="space-y-1 pt-1">
              {passwordRules.map((rule) => {
                const passed = rule.test(password)
                return (
                  <li
                    key={rule.label}
                    className={`flex items-center gap-2 text-[11px] ${passed ? "text-emerald-400 font-medium" : "text-slate-500"
                      }`}
                  >
                    <CheckCircle2 className={`size-3 ${passed ? "text-emerald-400" : "text-slate-600"}`} />
                    {rule.label}
                  </li>
                )
              })}
            </ul>
          </div>

          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-400 cursor-pointer pt-1">
            <input
              type="checkbox"
              name="terms"
              required
              className="mt-0.5 size-4 shrink-0 rounded border-slate-700 bg-slate-950 accent-violet-600 cursor-pointer"
            />
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-violet-400 hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-violet-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 text-sm font-semibold text-white shadow-xl shadow-violet-600/30 transition-all duration-300 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-600/50 hover:-translate-y-0.5 cursor-pointer active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating account...
              </span>
            ) : (
              <>
                Create account
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}