import { getToken } from "./authenticate";

async function makeRequest(method, path) {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: method,
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

export async function addToFavourites(id) {
  return makeRequest("PUT", `favourites/${id}`);
}

export async function removeFromFavourites(id) {
  return makeRequest("DELETE", `favourites/${id}`);
}

export async function getFavourites() {
  return makeRequest("GET", "favourites");
}

export async function addToHistory(id) {
  return makeRequest("PUT", `history/${id}`);
}

export async function removeFromHistory(id) {
  return makeRequest("DELETE", `history/${id}`);
}

export async function getHistory() {
  return makeRequest("GET", "history");
}
