export const API_BASE = import.meta.env.VITE_API_URL || "";

export const apiUrl = (path) => {
  if (!path.startsWith("/")) path = "/" + path;
  return `${API_BASE}${path}`;
};
