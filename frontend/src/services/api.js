const BASE = import.meta.env.VITE_API_BASE_URL;

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
  return await fetch(`${BASE}/notes/${id}`, {
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

export async function fetchAiResponse(userPrompt){
  const res = await fetch(`${BASE}/ai/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: userPrompt,
      }),
    });
    return res.json();
}
