"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import {
  canAccessDashboardPath,
  getDashboardRoleFromUser,
} from "@/lib/dashboard-access";

export default function DashboardAccessGuard({ children }) {
  const { isLoaded, user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const rol = isLoaded ? getDashboardRoleFromUser(user) : "unknown";
  const esRutaSinAcceso = pathname === "/dashboard/no-access";
  const esRutaSuscripcionCancelada = pathname === "/dashboard/suscripcion-cancelada";
  const accesoPermitido =
    esRutaSinAcceso ||
    (rol === "cancelado" && esRutaSuscripcionCancelada) ||
    canAccessDashboardPath(rol, pathname);

  useEffect(() => {
    if (!isLoaded || !user || accesoPermitido) return;

    router.replace(
      rol === "cancelado"
        ? "/dashboard/suscripcion-cancelada"
        : "/dashboard/no-access"
    );
  }, [accesoPermitido, isLoaded, rol, router, user]);

  if (!isLoaded) {
    return (
      <div className="grid min-h-[60vh] place-items-center px-6">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-violet-600" />
          Verificando acceso...
        </div>
      </div>
    );
  }

  if (!accesoPermitido) return null;

  return children;
}
