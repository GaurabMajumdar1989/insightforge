import axios from "axios";

const API_URL = "http://127.0.0.1:8000";  // adjust when deploying

// Load refresh token from localStorage
export function getStoredRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export function storeRefreshToken(token) {
  localStorage.setItem("refresh_token", token);
}

export function clearRefreshToken() {
  localStorage.removeItem("refresh_token");
}


// ---------- SIGNUP ----------
export async function signup(data) {
  const res = await axios.post(`${API_URL}/auth/signup`, data);
  return res.data;
}


// ---------- LOGIN ----------
export async function login(email, password) {
  const res = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  // Store refresh token
  storeRefreshToken(res.data.refresh_token);

  return {
    accessToken: res.data.access_token,
    refreshToken: res.data.refresh_token,
  };
}


// ---------- REFRESH TOKEN ----------
export async function refreshToken() {
  const token = getStoredRefreshToken();
  if (!token) return null;

  const res = await axios.post(`${API_URL}/auth/refresh`, {
    token,
  });

  // update refresh token
  storeRefreshToken(res.data.refresh_token);

  return {
    accessToken: res.data.access_token,
    refreshToken: res.data.refresh_token,
  };
}


// ---------- GET CURRENT USER ----------
export async function getCurrentUser(accessToken) {
  const res = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
}
