import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	children: ReactNode;
}

const baseClasses =
	"inline-flex items-center justify-center rounded-full font-medium text-[16px] leading-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0857A1] transition-colors disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"px-5 py-[15px] text-white bg-[#0857A1] hover:bg-[#176CBA] focus-visible:bg-[#0E5FAA] active:bg-[#06539A] disabled:bg-[#CCCCCC]",
	secondary:
		"px-5 py-[15px] text-[#181D27] bg-[#EFEFEF] hover:bg-[#EAEAEA] focus-visible:bg-[#E2E2E2] active:bg-[#DEDEDE] disabled:bg-[#EFEFEF] disabled:text-[#767676]",
	tertiary:
		"px-4 py-[15px] text-[#0857A1] bg-transparent hover:text-[#2B7AC3] focus-visible:text-[#2370B8] active:text-[#0A4F8F] disabled:text-[#767676]",
};

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
	const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

	return (
		<button className={classes} {...rest}>
			{children}
		</button>
	);
}

export default Button;

