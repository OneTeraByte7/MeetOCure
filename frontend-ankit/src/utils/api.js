const envBase = import.meta.env.VITE_API_URL;

function detectBase() {
  if (envBase) return envBase.replace(/\/$/, "");
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return "http://localhost:5000";
  return "https://meetocure.onrender.com";
}

export const API_BASE = detectBase();

export const apiUrl = (path) => {
  if (!path.startsWith("/")) path = "/" + path;
  return `${API_BASE}${path}`;
};
