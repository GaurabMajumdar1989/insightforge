import NoteCard from "./NoteCard";

export default function NotesList({ notes, onDelete, onEdit, onAi }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {notes && notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onEdit={onEdit}
          onAi={onAi}
        />
      ))}
    </ul>
  );
}