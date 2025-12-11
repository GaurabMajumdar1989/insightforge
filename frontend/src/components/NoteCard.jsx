function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeSince(dateString) {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);

  const intervals = [
    { label: "year", secs: 31536000 },
    { label: "month", secs: 2592000 },
    { label: "day", secs: 86400 },
    { label: "hour", secs: 3600 },
    { label: "minute", secs: 60 },
  ];

  for (const interval of intervals) {
    const value = Math.floor(seconds / interval.secs);
    if (value >= 1) return `${value} ${interval.label}${value > 1 ? "s" : ""}`;
  }

  return "just now";
}

export default function NoteCard({ note, onDelete, onEdit, onAi}) {
  return (
    <li
      style={{
        padding: "16px",
        background: "#c8b1b1",
        borderRadius: "12px",
        marginBottom: "14px",
        fontSize: "17px",
        border: "1px solid #eee",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        position: "relative",
        transition: "transform 0.1s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.05)";
      }}
    >
      <div style={{ paddingRight: "60px" }}>
        <p>{note.text}</p>
        <button
          onClick={() => onAi(note)}
          style={{
            background: "transparent",
            border: "1px solid #ccc",
            padding: "4px 10px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "8px"
          }}
        >
          AI Assist
        </button>
        <p style={{ color: "#666", fontSize: "13px", marginTop: "6px" }}>
            Created {formatDate(note.created_at)}  
            {note.updated_at !== note.created_at && (
            <> • Updated {timeSince(note.updated_at)} ago</>
          )}
        </p>
      </div>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <button
          onClick={() => onEdit(note)}
          style={{
            marginRight: "6px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ✏️
        </button>

        <button
          onClick={() => onDelete(note.id)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
