interface InputFieldProps {
  label: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  register?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  placeholder,
  disabled = false,
  error,
  register,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      {...register}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg
      focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none
      transition-all disabled:bg-gray-50 disabled:text-gray-500"
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

export default InputField;
