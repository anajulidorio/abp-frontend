export function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      {label && <label style={{ fontWeight: 'bold' }}>{label}</label>}
      <input className="campo-formulario" {...props} />
    </div>
  );
}
