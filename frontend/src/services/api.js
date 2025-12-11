const BASE = "http://127.0.0.1:8000";

export async function fetchNotesApi() {
  const res = await fetch(`${BASE}/notes`);
  return res.json();
}

export async function createNoteApi(text) {
  return fetch(`${BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

export async function deleteNoteApi(id) {
  return fetch(`${BASE}/notes/${id}`, {
    method: "DELETE",
  });
}

export async function updateNoteApi(id, text) {
  const res = await fetch(`${BASE}/notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return res.json();
}
