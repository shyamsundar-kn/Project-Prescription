const BASE_URL = "http://13.204.67.215:3001";

/* ---------- LOGIN ---------- */
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

/* ---------- SIGNUP ---------- */
export const signupUser = async (user) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  return res.json();
};

/* ---------- GET REMEDY ---------- */
export const fetchSymptom = async (problem) => {
  const res = await fetch(
    `${BASE_URL}/symptoms?problem=${problem}`
  );

  return res.json();
};
