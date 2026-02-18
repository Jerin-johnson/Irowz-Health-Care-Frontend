export const ROUTES = {
  AUTH: {
    ROOT: "/",
    USER_LOGIN: "/user/login",
    USER_REGISTER: "/user/register",
    VERIFY_OTP: "/verify-otp",

    DOCTOR_LOGIN: "/doctor/login",

    HOSPITAL_LOGIN: "/hospital/login",
    HOSPITAL_VERIFY: "/hospital/verification",
    HOSPITAL_REAPPLY: "/hospital/verification/reapply",
    HOSPITAL_PENDING: "/hospital/verification/pending",

    SUPERADMIN_LOGIN: "/superadmin/login",

    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },

  DOCTOR: {
    ROOT: "/doctor",
    DASHBOARD: "dashboard",
    AVAILABILITY: "availability",
    SETTINGS: "settings",
    SCHEDULE: "schedule",
    QUEUE: "queue",
    APPOINTMENT: "appointment/:id",
    PATIENT_OVERVIEW: "patient/overview/:id",
    PRESCRIPTION_VIEW: "prescription/view/:id",
    LAB_VIEW: "lab-report/view/:id",
    VITALS_ADD: "consultation/vitals/add",
  },

  PATIENT: {
    ROOT: "/patient",

    DOCTORS: "doctors",
    DOCTOR_PROFILE: "doctor/:id",

    SLOTS: "doctor/slots/:id",
    BOOKING: "doctor/booking",
    BOOKING_SUCCESS: "booking-success/:id",

    PROFILE: "profile",
    SETTINGS: "settings",
    APPOINTMENTS: "appointments",
    APPOINTMENT_VIEW: "appointments/:id",
    QUEUE_STATUS: "appointment/queue/:id",

    WALLET: "wallet",
    RECORDS: "records",

    PRESCRIPTION_VIEW: "medical-record/prescription/:id",
    LAB_VIEW: "medical-record/lab/:id",
  },

  SUPER_ADMIN: {
    ROOT: "/super-admin",

    DASHBOARD: "dashboard",
    VERIFICATION_REQUESTS: "verfication-request",
    VERIFICATION_REVIEW: "verfication-request/:id",

    HOSPITALS: "hospitals",
    PLANS: "plans",
    CREATE_PLAN: "plan/create",

    WALLET: "wallet",
    USERS: "users",
  },
};
