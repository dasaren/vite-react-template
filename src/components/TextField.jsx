import React from "react";

const TextField = ({
  label,
  inputProps,
  onChange,
  placeholder,
  style,
  value,
  name,
  type,
  autoComplete,
  required,
  checked,
  className,
  maxlength,
  minlength,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className={`mb-2 text-base text-gray-800 ${className}`}>
        {label}
      </label>
      <input
        className={`border-2 bg-gray-200 px-3 py-2 outline-none ${className}`}
        {...inputProps}
        onChange={onChange}
        value={value}
        style={style}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        checked={checked}
        maxlength={maxlength}
        minlength={minlength}
      />
    </div>
  );
};

export default TextField;
