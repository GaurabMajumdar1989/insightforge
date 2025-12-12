import { useState, useRef } from "react";
import "./NoteForm.css";

export default function NoteForm({ onCreate }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    onCreate(text);
    setText("");
    inputRef.current?.focus();
  }

  return (
    <form className="nf-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="nf-input"
        value={text}
        placeholder="Write a note..."
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit" className="nf-btn">
        Add a Note
      </button>
    </form>
  );
}
