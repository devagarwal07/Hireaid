import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	children: ReactNode;
}

const baseClasses =
	"inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none disabled:active:scale-100";

const sizeClasses: Record<ButtonSize, string> = {
	sm: "px-4 py-2 text-sm h-8",
	md: "px-5 py-2.5 text-sm h-10",
	lg: "px-6 py-3 text-base h-12",
};

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"text-white bg-primary hover:bg-primary-hover transition-colors duration-200 active:bg-primary-dark",
	secondary:
		"text-text-primary bg-neutral hover:bg-neutral-hover transition-colors duration-200 active:bg-neutral-active",
	tertiary:
		"text-primary bg-transparent hover:bg-primary-light transition-colors duration-200 active:text-primary-dark",
};

export function Button({ 
	variant = "primary", 
	size = "md",
	className = "", 
	children, 
	...rest 
}: ButtonProps) {
	const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

	return (
		<button className={classes} {...rest}>
			{children}
		</button>
	);
}

export default Button;

