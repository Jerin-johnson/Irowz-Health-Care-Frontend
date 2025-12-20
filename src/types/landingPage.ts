export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}
