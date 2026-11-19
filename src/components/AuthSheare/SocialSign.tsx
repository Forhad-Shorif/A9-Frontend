'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { showToast } from '@/lib/utils/toast'
import { FaGoogle, FaGithub } from 'react-icons/fa6'

const SocialSign = () => {
    // 🔄 কোন provider e click kora hoyeche seta rakhi, jate oi button ta disable/spinner dekhay
    const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null)

    // 🌐 সোশ্যাল অথেন্টিকেশন (গুগল ও গিটহাব)
    const handleGoogleSignIn = async () => {
        setLoadingProvider("google")

        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/profile",
        })

        if (error) {
            showToast.error(error.message || "Google sign-in failed. Please try again.")
        }

        setLoadingProvider(null)
    }

    const handleGithubSignIn = async () => {
        setLoadingProvider("github")

        const { error } = await authClient.signIn.social({
            provider: "github",
            callbackURL: "/profile",
        })

        if (error) {
            showToast.error(error.message || "GitHub sign-in failed. Please try again.")
        }

        setLoadingProvider(null)
    }

    return (
        // "contents" mane ei div ta layout e na dekhiye, vitore button gulo parent grid er direct child hisebe boshe
        <div className="contents">
            <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loadingProvider !== null}
                className="group flex items-center justify-center gap-2.5 rounded-2xl border border-slate-700/60 bg-slate-800/40 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:border-violet-500/50 hover:text-white cursor-pointer active:scale-95 disabled:opacity-50 shadow-sm"
            >
                {loadingProvider === "google" ? (
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                    <FaGoogle className="size-4 text-rose-500 transition-transform group-hover:scale-110 duration-300" />
                )}
                Google
            </button>
            <button
                type="button"
                onClick={handleGithubSignIn}
                disabled={loadingProvider !== null}
                className="group flex items-center justify-center gap-2.5 rounded-2xl border border-slate-700/60 bg-slate-800/40 px-4 py-3 text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 hover:bg-slate-800 hover:border-violet-500/50 hover:text-white cursor-pointer active:scale-95 disabled:opacity-50 shadow-sm"
            >
                {loadingProvider === "github" ? (
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                    <FaGithub className="size-4 text-white transition-transform group-hover:scale-110 duration-300" />
                )}
                GitHub
            </button>
        </div>
    )
}

export default SocialSign
