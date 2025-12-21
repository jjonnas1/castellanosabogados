export type UserRole = "admin" | "lawyer" | "client";

export type ProtectedRoute = {
  pattern: RegExp;
  allowed: UserRole[];
  description: string;
};

export const protectedRoutes: ProtectedRoute[] = [
  {
    pattern: /^\/admin(\/.*)?$/,
    allowed: ["admin"],
    description: "Panel de administración global",
  },
  {
    pattern: /^\/administrativo(\/.*)?$/,
    allowed: ["admin"],
    description: "Gestión de áreas y citas administradas",
  },
  {
    pattern: /^\/panel(\/.*)?$/,
    allowed: ["lawyer", "admin"],
    description: "Panel de abogado asociado: disponibilidad y citas",
  },
  {
    pattern: /^\/cliente\/panel(\/.*)?$/,
    allowed: ["client", "admin"],
    description: "Panel de clientes: agenda e historial",
  },
  {
    pattern: /^\/clientes(\/.*)?$/,
    allowed: ["client", "admin"],
    description: "Vistas operativas del cliente",
  },
];

export const roleClaims = {
  admin: {
    canApproveLawyers: true,
    canOverrideCalendar: true,
    canManagePayments: true,
  },
  lawyer: {
    canApproveLawyers: false,
    canOverrideCalendar: false,
    canManagePayments: false,
  },
  client: {
    canApproveLawyers: false,
    canOverrideCalendar: false,
    canManagePayments: false,
  },
};

export const profileSchema = {
  table: "profiles",
  columns: {
    id: "uuid",
    email: "text",
    role: "text",
    full_name: "text",
    approved: "boolean",
    languages: "text[]",
  },
};

export const availabilitySchema = {
  table: "lawyer_availability",
  note: "Reglas semanales y excepciones que verán los clientes sin alteraciones",
};

export const appointmentSchema = {
  table: "appointments",
  note: "Reservas que conectan al cliente con la disponibilidad real del abogado",
};
