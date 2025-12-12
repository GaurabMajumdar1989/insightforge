import { useState, useEffect } from "react";
import NotesList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import EditNoteModal from "../components/EditNoteModal";
import {
  fetchNotesApi,
  createNoteApi,
  updateNoteApi,
  deleteNoteApi,
  fetchAiResponse,
} from "../services/api";
import AiModal from "../components/AiModal";
import { useAuth } from "../context/AuthContext";
import "./NotePage.css";

export default function NotePage() {
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [editText, setEditText] = useState("");

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiMode, setAiMode] = useState("summary");
  const [aiTargetNote, setAiTargetNote] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const fetchNotes = async () => {
    const data = await fetchNotesApi();
    setNotes(data);
  };

  const createNote = async (text) => {
    await createNoteApi(text);
    fetchNotes();
  };

  async function handleDelete(note) {
    const res = await deleteNoteApi(note.id);
    if (!res.ok) {
      console.error("Delete failed");
      return;
    }
    // update UI
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function openEditModal(note) {
    setEditNote(note);
    setEditText(note.text);
    setIsModalOpen(true);
  }

  function closeEditModal() {
    setIsModalOpen(false);
    setEditNote(null);
    setEditText("");
  }

  async function saveEdit() {
    const updated = await updateNoteApi(editNote.id, editText);

    setNotes((prev) =>
      prev.map((n) => (n.id === updated.id ? updated : n))
    );

    closeEditModal();
  }

  function openAiModal(note) {
    setAiTargetNote(note);
    setAiMode("summary");
    setIsAiModalOpen(true);
  }

  function closeAiModal() {
    setIsAiModalOpen(false);
    setAiTargetNote(null);
  }

  async function applyAi() {
    setAiLoading(true);
    try{
      const prompt = `Summarize this text in 2–3 lines only:\n\n${aiTargetNote.text}`;

      const data = await fetchAiResponse(prompt);

      setNotes((prev) =>
        prev.map((n) =>
          n.id === aiTargetNote.id ? { ...n, text: data.response } : n
        )
      );
    }catch(err){
      console.error(err);
    }finally{
      setAiLoading(false);
      closeAiModal();
    }
  }


  return (
    <>
      {/* Header */}
      <div className="np-header">
        <span className="np-welcome">
          Hello, {user?.full_name || user?.email}
        </span>

        <button className="np-logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Wrapper */}
      <div className="np-wrapper">
        <h1 className="np-title">📝 InsightForge Notes</h1>

        {/* Note input */}
        <div className="np-input-row">
          <NoteForm onCreate={createNote} />
        </div>

        {/* Notes */}
        <h2 className="np-section-title">Notes</h2>

        <NotesList
          notes={notes}
          onDelete={handleDelete}
          onEdit={openEditModal}
          onAi={openAiModal}
        />

        <EditNoteModal
          isOpen={isModalOpen}
          editText={editText}
          setEditText={setEditText}
          onClose={closeEditModal}
          onSave={saveEdit}
        />

        <AiModal
          isOpen={isAiModalOpen}
          mode={aiMode}
          setMode={setAiMode}
          onClose={closeAiModal}
          onApply={applyAi}
          ailoading={aiLoading}
        />
      </div>
      {aiLoading && (
        <div className="overlay-loader">
          <div className="loader"></div>
          <p>AI is thinking...</p>
        </div>
      )}
    </>
  );
}
