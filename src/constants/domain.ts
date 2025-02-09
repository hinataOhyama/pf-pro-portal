export const domain =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_DOMAIN
    : "http://localhost:3000";