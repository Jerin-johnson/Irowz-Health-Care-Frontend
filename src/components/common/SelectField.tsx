interface SelectFieldProps {
  label?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  register?: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  placeholder,
  disabled = false,
  error,
  register,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <select
        disabled={disabled}
        {...register}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:border-transparent bg-white disabled:bg-gray-50"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
