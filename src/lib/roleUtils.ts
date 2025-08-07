export const ROLES = {
  ADMIN: "Admin",
  PPID: "PPID", 
  ATASAN_PPID: "Atasan_PPID",
  PEMOHON: "Pemohon"
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const isAdmin = (role: string | null): boolean => {
  return role === ROLES.ADMIN;
};

export const isPPID = (role: string | null): boolean => {
  return role === ROLES.PPID;
};

export const isAtasanPPID = (role: string | null): boolean => {
  return role === ROLES.ATASAN_PPID;
};

export const isPemohon = (role: string | null): boolean => {
  return role === ROLES.PEMOHON;
};

export const isAdminRole = (role: string | null): boolean => {
  return [ROLES.ADMIN, ROLES.PPID, ROLES.ATASAN_PPID].includes(role as UserRole);
};

export const canAccessMenu = (role: string | null, menuRoles: string[]): boolean => {
  return role ? menuRoles.includes(role) : false;
};

export const getRoleDisplayName = (role: string | null): string => {
  switch (role) {
    case ROLES.ADMIN:
      return "Administrator";
    case ROLES.PPID:
      return "PPID";
    case ROLES.ATASAN_PPID:
      return "Atasan PPID";
    case ROLES.PEMOHON:
      return "Pemohon";
    default:
      return "Unknown";
  }
};