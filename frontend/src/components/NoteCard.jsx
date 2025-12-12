import "./NoteCard.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function timeSince(dateString) {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);

  const intervals = [
    { label: "year", secs: 31536000 },
    { label: "month", secs: 2592000 },
    { label: "day", secs: 86400 },
    { label: "hour", secs: 3600 },
    { label: "minute", secs: 60 }
  ];

  for (const interval of intervals) {
    const value = Math.floor(seconds / interval.secs);
    if (value >= 1) return `${value} ${interval.label}${value > 1 ? "s" : ""}`;
  }

  return "just now";
}

export default function NoteCard({ note, onDelete, onEdit, onAi }) {
  return (
    <li className="note-card">
      <div className="note-content">
        <p className="note-text">{note.text}</p>

        <button className="note-ai-btn" onClick={() => onAi(note)}>
          AI Assist
        </button>

        <p className="note-time">
          Created {formatDate(note.created_at)}
          {note.updated_at !== note.created_at && (
            <> • Updated {timeSince(note.updated_at)} ago</>
          )}
        </p>
      </div>

      <div className="note-actions">
        <button className="note-icon-btn" onClick={() => onEdit(note)}>
          ✏️
        </button>

        <button className="note-icon-btn" onClick={() => onDelete(note)}>
          🗑️
        </button>
      </div>
    </li>
  );
}
