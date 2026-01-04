const BASE_URL = "http://localhost:9000";
export async function apiClient(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  console.log("hi",options)
  return await res.json();
}
