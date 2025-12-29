type BaseField = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  validation?: (value: any) => string | null;
};

type InputField = BaseField & {
  type?: "text" | "email" | "number" | "password";
};

type TextAreaField = BaseField & {
  type: "textarea";
  rows?: number;
};

type SelectOption = {
  label: string;
  value: string;
};

type SelectField = BaseField & {
  type: "select";
  options: SelectOption[];
};

type FileField = BaseField & {
  type: "file";
  accept?: string;
};

export type FormField = InputField | TextAreaField | SelectField | FileField;

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  subtitle?: string;
  fields: FormField[];
  submitButtonText?: string;
  defaultValues?: Record<string, any>;
}

export type FormData = Record<string, any>;
export type FormErrors = Record<string, string>;
