export const GRAPHQL_API =
  import.meta.env.VITE_GRAPHQL_API || "http://localhost:3000/graphql";
export const GRAPHQL_WS =
  import.meta.env.VITE_GRAPHQL_WS || "ws://localhost:3000/graphql";
export const GRAPHQL_SECRET_KEY =
  import.meta.env.VITE_GRAPHQL_SECRET_KEY || "secret";
export const BASE_API =
  import.meta.env.VITE_BASE_API || "http://localhost:3001/api";
// @ts-ignore
export const VERSION = __APP_VERSION__ || "1.0.0";
export const BASE_URL = import.meta.env.VITE_BASE_URL || "/admin";
export const IS_PRODUCTION = import.meta.env.NODE_ENV === "production";
