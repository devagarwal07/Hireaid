const VARIANT_STYLES = {
  info: {
    container: 'bg-primary-light border border-indigo-200',
    iconBg: 'bg-primary-light',
    title: 'text-text-primary',
    body: 'text-text-secondary',
  },
  error: {
    container: 'bg-error-light border border-[#FED7D7]',
    iconBg: 'bg-error-light',
    title: 'text-error-text',
    body: 'text-text-secondary',
  },
  warning: {
    container: 'bg-warning-light border border-[#FED7AA]',
    iconBg: 'bg-warning-light',
    title: 'text-[#9A3412]',
    body: 'text-text-secondary',
  },
  success: {
    container: 'bg-success-light border border-green-200',
    iconBg: 'bg-teal-50',
    title: 'text-[#166534]',
    body: 'text-text-secondary',
  },
} as const;

export type NotificationVariant = keyof typeof VARIANT_STYLES;

export interface NotificationBannerProps {
  variant?: NotificationVariant;
  title: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}

export function NotificationBanner({
  variant = 'info',
  title,
  description,
  onClose,
  className,
}: NotificationBannerProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.1)] ${styles.container} ${className ?? ''}`}
    >
      <div className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-full ${styles.iconBg}`}>
        {/* Simple dot icon; can be swapped for custom SVG per variant */}
        <span className="h-2 w-2 rounded-full bg-current" />
      </div>

      <div className="flex-1">
        <div className={`text-sm font-semibold ${styles.title}`}>{title}</div>
        {description ? (
          <p className={`mt-1 text-xs leading-relaxed ${styles.body}`}>{description}</p>
        ) : null}
      </div>

      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-slate-500 shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition hover:bg-white transition-colors duration-200 hover:text-slate-700"
          aria-label="Dismiss notification"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 1 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06Z"
              fill="currentColor"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
