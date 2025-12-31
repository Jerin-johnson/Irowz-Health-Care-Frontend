export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}
