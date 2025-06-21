export function Button({ label, className, style, ...props }) {
  return (
    <button className={className} style={style} {...props}>
      {label}
    </button>
  );
}
