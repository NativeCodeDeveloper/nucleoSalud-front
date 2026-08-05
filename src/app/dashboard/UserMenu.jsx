"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import {
    getDashboardRoleFromUser,
    getDashboardRoleLabel,
} from "@/lib/dashboard-access";

export default function UserMenu() {
    const {isLoaded, user} = useUser();
    const rol = isLoaded ? getDashboardRoleFromUser(user) : "unknown";
    const nombreUsuario = user?.fullName || user?.primaryEmailAddress?.emailAddress || "Usuario";

    return (
        <div className="px-3 pb-3 pt-2 border-t border-[#EAEAEC]">
            <div className="overflow-hidden rounded-2xl border border-violet-100 bg-[#F8F7FC]">
                <div className="flex items-center gap-3 px-3 py-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#EDE9FE] text-[#6E56CF]">
                        <UserButton />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold leading-tight text-slate-800">
                            {isLoaded ? nombreUsuario : "Cargando usuario..."}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] leading-tight text-slate-400">
                            {getDashboardRoleLabel(rol)}
                        </p>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-400" title="Sesión Clerk activa" />
                </div>
                <Link
                    href="/"
                    className="flex items-center gap-2.5 border-t border-violet-100 px-4 py-3 text-[12px] font-medium text-slate-600 transition-all hover:bg-white/70 hover:text-[#6E56CF]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Volver a pagina web</span>
                </Link>
            </div>
        </div>
    );
}
