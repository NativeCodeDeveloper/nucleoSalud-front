"use client";

import {useState} from "react";
import {useClerk} from "@clerk/nextjs";

export default function SignOutBtn() {
    const {signOut} = useClerk();
    const [cerrandoSesion, setCerrandoSesion] = useState(false);

    const cerrarSesion = async () => {
        if (cerrandoSesion) return;

        setCerrandoSesion(true);

        try {
            await signOut({redirectUrl: "/sign-in"});
        } finally {
            setCerrandoSesion(false);
        }
    };

    return (
        <button
            type="button"
            onClick={cerrarSesion}
            disabled={cerrandoSesion}
            aria-busy={cerrandoSesion}
            className="flex w-full items-center gap-2.5 border-t border-violet-100 px-4 py-3 text-left text-[12px] font-medium text-red-600 transition-all hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
            title="Cerrar sesión"
        >
            <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" clipRule="evenodd" />
            </svg>
            <span>{cerrandoSesion ? "Cerrando sesión..." : "Cerrar sesión"}</span>
        </button>
    );
}
