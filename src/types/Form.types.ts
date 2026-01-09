type BaseField<TValue> = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  validation?: (value: TValue) => string | null;
};

type InputField = BaseField<string | number> & {
  type: "text" | "email" | "number" | "password";
};

type TextAreaField = BaseField<string> & {
  type: "textarea";
  rows?: number;
};

type SelectOption<T = string> = {
  label: string;
  value: T;
};

type SelectField<T = string> = BaseField<T> & {
  type: "select";
  options: SelectOption<T>[];
};

type FileField = BaseField<File | null> & {
  type: "file";
  accept?: string;
};

export type FormField = InputField | TextAreaField | SelectField | FileField;

export interface FormModalProps<TFormData = Record<string, any>> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TFormData) => void | boolean;
  title: string;
  subtitle?: string;
  fields: FormField[];
  children?: React.ReactNode;
  submitButtonText?: string;
  defaultValues?: Partial<TFormData>;
}

export type FormData<T = Record<string, any>> = T;
export type FormErrors<T = Record<string, any>> = Partial<
  Record<keyof T, string>
>;
