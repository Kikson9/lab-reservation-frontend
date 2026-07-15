import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to some requests automatically
api.interceptors.request.use((config) => {
  const publicEndpoints = [
    "/auth/login/",
    "/auth/signup/",
    "/auth/password-reset/",
    "/auth/password-reset/confirm/",
  ];
  const isPublic = publicEndpoints.some((endpoint) =>
    config.url.includes(endpoint),
  );

  if (!isPublic) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const publicEndpoints = [
      "/auth/login/",
      "/auth/signup/",
      "/auth/password-reset/",
      "/auth/password-reset/confirm/",
    ];
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      error.config?.url?.includes(endpoint),
    );

    if (error.response && error.response.status === 401 && !isPublicEndpoint) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
