const Button = ({ onClick, children, style, value, type }) => {
  return (
    <button
      className="my-2 rounded bg-indigo-600   px-6 py-2 text-white hover:bg-indigo-700"
      onClick={onClick}
      style={style}
      type={type}
    >
      {value}

      {children}
    </button>
  );
};

export default Button;
