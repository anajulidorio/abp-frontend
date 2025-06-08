export function Button({ label, ...props }) {
  return (
    <button
      style={{
        padding: "10px",
        fontSize: "16px",
        backgroundColor: "#444",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "10px"
      }}
      {...props}
    >
      {label}
    </button>
  );
}
