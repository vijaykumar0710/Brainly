import type{ ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullwidth?: boolean;
    loading?: boolean;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white hover:bg-purple-700",
    "secondary": "bg-purple-200 text-purple-600 hover:bg-purple-300",
};

const sizeStyles = {
    "sm": "py-1 px-2 text-sm",
    "md": "py-2 px-4 text-md",
    "lg": "py-4 px-6 text-xl",
};

const defaultStyles = "rounded-md flex items-center justify-center gap-2 transition-all duration-200 font-light cursor-pointer";

export const Button = ({ variant, text, startIcon, onClick, fullwidth, size, loading }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`
                ${variantStyles[variant]} 
                ${defaultStyles} 
                ${sizeStyles[size]} 
                ${fullwidth ? "w-full" : ""} 
                ${loading ? "opacity-45 cursor-not-allowed" : ""}
            `}
        >
            {startIcon && <span className="pr-2">{startIcon}</span>}
            {text}
        </button>
    );
};