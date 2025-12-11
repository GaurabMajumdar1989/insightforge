export default function AiModal({ isOpen, mode, setMode, onClose, onApply, aiLoading}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "350px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>AI Assist</h3>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            <input
              type="radio"
              name="ai-mode"
              value="summary"
              checked={mode === "summary"}
              onChange={() => setMode("summary")}
              style={{ marginRight: "8px" }}
            />
            Summarize this note
          </label>

          <label style={{ display: "block" }}>
            <input
              type="radio"
              name="ai-mode"
              value="insight"
              checked={mode === "insight"}
              onChange={() => setMode("insight")}
              style={{ marginRight: "8px" }}
            />
            Generate insights from this note
          </label>
        </div>

        <button
          onClick={onApply}
          disabled={aiLoading}
          style={{
            padding: "8px 14px",
            background: aiLoading ? "#ccc" : "#007bff",
            color: "white",
            borderRadius: "6px",
            border: "none",
            cursor: aiLoading ? "not-allowed" : "pointer"
          }}
          >
          {aiLoading ? "Summarizing..." : "Summarize"}
        </button>

        <button
          onClick={onClose}
          style={{
            padding: "8px 16px",
            border: "1px solid #aaa",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
