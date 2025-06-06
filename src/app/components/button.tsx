import { ReactNode } from "react";

interface WhiteButtonProps {
  label: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: ReactNode;
}

export default function WhiteButton({
  onClick,
  label,
  icon,
  className = "",
  type = "button" ,
}: WhiteButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center transition-all duration-300 cursor-pointer bg-white text-black font-bold ${className}`}
    >
      {/* Texte visible à partir de md (desktop) */}
      <span className="hidden lg:block">{label}</span>

      {/* Icône visible uniquement sur mobile */}
      {icon && <span className="block lg:hidden">{icon}</span>}
    </button>
  );
}
