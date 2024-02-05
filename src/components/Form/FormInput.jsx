const FormInput = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  ariaLabel,
  required,
}) => {
  return (
    <div className="w-full mt-4">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none focus:border-blue-500"
        aria-label={ ariaLabel }
        required={required}
      />
    </div>
  )
}

export default FormInput