"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import {
    getDashboardRoleFromUser,
    getDashboardRoleLabel,
} from "@/lib/dashboard-access";
import SignOutBtn from "./SignOutBtn";

export default function UserMenu() {
    const {isLoaded, user} = useUser();
    const rol = isLoaded ? getDashboardRoleFromUser(user) : "unknown";
    const nombreUsuario = user?.fullName || user?.primaryEmailAddress?.emailAddress || "Usuario";

    return (
        <div className="px-3 pb-3 pt-2 border-t border-[#EAEAEC]">
            <div className="relative">
                <details className="group overflow-hidden rounded-2xl border border-violet-100 bg-[#F8F7FC]">
                    <summary className="flex cursor-pointer list-none items-center gap-3 px-3 py-3 transition-colors hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#6E56CF]/40 [&::-webkit-details-marker]:hidden">
                        <span className="h-10 w-10 flex-shrink-0" aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-semibold leading-tight text-slate-800">
                                {isLoaded ? nombreUsuario : "Cargando usuario..."}
                            </p>
                            <p className="mt-0.5 truncate text-[11px] leading-tight text-slate-400">
                                {getDashboardRoleLabel(rol)}
                            </p>
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" title="Sesión Clerk activa" />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                            </svg>
                        </div>
                    </summary>
                    <div className="border-t border-violet-100">
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 px-4 py-3 text-[12px] font-medium text-slate-600 transition-all hover:bg-white/70 hover:text-[#6E56CF]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Volver a pagina web</span>
                        </Link>
                        <SignOutBtn />
                    </div>
                </details>
                <div className="absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#EDE9FE] text-[#6E56CF]">
                    <UserButton />
                </div>
            </div>
        </div>
    );
}
