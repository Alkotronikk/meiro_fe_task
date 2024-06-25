import {FC, ReactNode, SyntheticEvent} from "react";

interface ButtonProps {
  onClick: (() => void) | ((event: SyntheticEvent<HTMLButtonElement>) => void);
  variant?: 'success' | 'danger';
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({onClick, variant , children, className ='', disabled}) => {
  return <button type="button"
                 role="presentation"
                 className={`inline-flex select-none justify-center rounded-md text-nowrap text-black bg-white border px-3 py-2 text-sm font-semibold w-auto disabled:pointer-events-none disabled:opacity-50 hover:ring-2 hover:ring-primary focus:ring-2 focus:outline-none focus:ring-secondary ${variant && `border-${variant}`} ${className}`}
                 onClick={onClick}
                 disabled={disabled}
  >
    {children}
  </button>
}

export default Button;