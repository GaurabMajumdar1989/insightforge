import { useState, useEffect } from "react";
import NotesList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import EditNoteModal from "../components/EditNoteModal";
import {
  fetchNotesApi,
  createNoteApi,
  updateNoteApi,
  deleteNoteApi,
} from "../services/api";
import AiModal from "../components/AiModal";
import { useAuth } from "../context/AuthContext";


export default function NotePage(){
    
    const { user, logout } = useAuth();
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editNote, setEditNote] = useState(null);
    const [editText, setEditText] = useState("");
    //AI Modal STtates below
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiMode, setAiMode] = useState("summary");
    const [aiTargetNote, setAiTargetNote] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const styles = {
                    header: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px",
                        background: "#f8fafc",
                        borderBottom: "1px solid #e2e8f0",
                        marginBottom: "20px",
                    },
                    welcome: {
                        fontSize: "18px",
                        fontWeight: "500",
                    },
                    logoutBtn: {
                        padding: "8px 16px",
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    },
    };


    const fetchNotes = async () => { // for fetching notes, initially for now it will be blank, you create notes first then see
        //like Jquery AJAX Get 
        const data = await fetchNotesApi();
        setNotes(data);
        console.log(data);
    }

    const createNote = async (text) => {
        await createNoteApi(text)
        fetchNotes();
    }
  
    async function handleDelete(noteId) {
        const res = deleteNoteApi(noteId)

        if (res.status === 204) {
            // remove it from state
            setNotes(prev => prev.filter(n => n.id !== noteId));
        } else {
            const err = await res.json();
            console.error("Delete failed:", err);
            alert("Delete failed: " + err.detail);
        }
    }

    useEffect(() => {
      fetchNotes();
    },[]) // Second param = dependencies: Blank array if passed as param then useeffect will call itself only once, 1000 will rerender this whole component every after 1 sec, you can also pass props and states here but all dependency which you are passing are optional 
    

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
        
        // Update UI state without re-fetching all notes
        setNotes(prev =>
            prev.map(n => (n.id === updated.id ? updated : n))
        );

        closeEditModal();
    }

    function openAiModal(note) {
        setAiTargetNote(note);
        setAiMode("summary"); // default
        setIsAiModalOpen(true);
    }

    function closeAiModal() {
        setIsAiModalOpen(false);
        setAiTargetNote(null);
    }

    async function applyAi() {
        setAiLoading(true);

        const res = await fetch(`http://127.0.0.1:8000/ai/ask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: `Summarize this text in 2–3 lines only:\n\n${aiTargetNote.text}` })
        });

        const data = await res.json();

        setNotes(prev =>
            prev.map(n => (n.id === aiTargetNote.id ? { ...n, text: data.response } : n))
        );

        setAiLoading(false);

        closeAiModal();
    }

    return (
        <>
            <div style={styles.header}>
                <div>
                    <span style={styles.welcome}>Hello, {user?.full_name || user?.email}</span>
                </div>

                <button style={styles.logoutBtn} onClick={logout}>
                    Logout
                </button>
            </div>
            <div
                style={{
                    padding: "40px",
                    maxWidth: "700px",
                    margin: "0 auto",
                    fontFamily: "sans-serif",
                }}
            >
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
                📝 InsightForge Notes
                </h1>

                {/* Input + Add Button */}
                <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                }}
                >
                    <NoteForm onCreate={createNote} />
                </div>

                    {/* Notes List */}
                <div>
                    <h2 style={{ marginBottom: "10px" }}>Notes</h2>

                    <NotesList
                    notes={notes}
                    onDelete={handleDelete}
                    onEdit={openEditModal}
                    onAi={openAiModal}
                    />
                </div>
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
        </>    
    );
}
