// User role er sob mapping ek jaygay rakhi, jate Navbar, ProfileNav,
// Sidebar ar Sign-Up sob jaygay ek i value use hoy (duplicate na hoy).

export type UserRole = "students" | "teachers" | "admin"

// Role onujayi dashboard er link
export const DASHBOARD_BY_ROLE: Record<UserRole, string> = {
  students: "/dashboard/students",
  teachers: "/dashboard/teachers",
  admin: "/dashboard/admin",
}

// Screen e dekhano nam
export const ROLE_LABEL: Record<UserRole, string> = {
  students: "Student",
  teachers: "Teacher",
  admin: "Admin",
}

// Session theke asha role jodi vul/missing hoy, tahole "students" dhore nai.
export const getRole = (role?: string): UserRole => {
  if (role === "teachers" || role === "admin") return role
  return "students"
}

// Ek line e role theke dashboard link ber kora
export const getDashboardHref = (role?: string): string =>
  DASHBOARD_BY_ROLE[getRole(role)]
