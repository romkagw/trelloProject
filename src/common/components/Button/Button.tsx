import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, icon, ...props }) => {
  return (
    <button {...props}>
      {icon && <>{icon}</>}
      {children}
    </button>
  );
};

export default Button;
