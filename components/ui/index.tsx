"use client";

import { ReactNode, useId, useState } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export function Spinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-3 w-3 border-2",
    md: "h-4 w-4 border-2",
    lg: "h-5 w-5 border-[3px]",
  }[size];

  return (
    <span
      className={cx(
        "inline-block animate-spin rounded-full border-white/40 border-t-white",
        sizeClasses
      )}
      aria-hidden
    />
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-ink text-white hover:-translate-y-0.5 hover:scale-105 hover:bg-accent-700 focus-visible:outline-accent-700",
    secondary:
      "border border-border bg-white text-ink hover:-translate-y-0.5 hover:scale-105 hover:border-ink focus-visible:outline-accent-700",
    ghost: "text-ink hover:-translate-y-0.5 hover:scale-105 hover:bg-subtle focus-visible:outline-accent-700",
    danger: "bg-red-600 text-white hover:-translate-y-0.5 hover:scale-105 hover:bg-red-700 focus-visible:outline-red-500",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cx(base, variants[variant], sizes[size], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : icon}
      <span>{children}</span>
    </button>
  );
}

export function Input({
  label,
  required,
  error,
  icon,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  required?: boolean;
  error?: string;
  icon?: ReactNode;
}) {
  const id = useId();
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-ink" htmlFor={props.id ?? id}>
      {label && (
        <span>
          {label}
          {required && <span className="ml-1 text-accent-700">*</span>}
        </span>
      )}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">{icon}</span>}
        <input
          id={props.id ?? id}
          className={cx(
            "w-full rounded-xl border bg-subtle px-3 py-2 text-sm text-ink outline-none transition duration-300 ease-out focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10",
            icon ? "pl-9" : "",
            error ? "border-red-500" : "border-border",
            className
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-600 animate-fade-in">{error}</span>}
    </label>
  );
}

export function Textarea({
  label,
  required,
  error,
  maxLength,
  showCount = false,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  required?: boolean;
  error?: string;
  showCount?: boolean;
}) {
  const id = useId();
  const [count, setCount] = useState(0);
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-ink" htmlFor={props.id ?? id}>
      {label && (
        <span>
          {label}
          {required && <span className="ml-1 text-accent-700">*</span>}
        </span>
      )}
      <textarea
        id={props.id ?? id}
        className={cx(
          "w-full rounded-xl border bg-subtle px-3 py-3 text-sm text-ink outline-none transition duration-300 ease-out focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10",
          error ? "border-red-500" : "border-border",
          className
        )}
        maxLength={maxLength}
        onChange={(event) => {
          setCount(event.target.value.length);
          props.onChange?.(event);
        }}
        aria-invalid={Boolean(error)}
        {...props}
      />
      <div className="flex items-center justify-between text-xs text-muted">
        {error && <span className="text-red-600 animate-fade-in">{error}</span>}
        {showCount && maxLength && <span>{count} / {maxLength}</span>}
      </div>
    </label>
  );
}

export function Card({
  children,
  className,
  hover = true,
  glass = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-border bg-white p-6 shadow-soft/40 transition duration-300 ease-out",
        hover && "hover:-translate-y-1 hover:shadow-hover",
        glass && "backdrop-blur bg-white/60",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Alert({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
}) {
  const styles = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    success: "border-green-200 bg-green-50 text-green-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    error: "border-red-200 bg-red-50 text-red-900",
  }[variant];
  const icon = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  }[variant];

  return (
    <div className={cx("rounded-2xl border px-4 py-3 text-sm animate-fade-in-up", styles)} role="alert">
      <div className="flex items-start gap-3">
        <span aria-hidden>{icon}</span>
        <div>
          {title && <p className="font-semibold">{title}</p>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Badge({
  children,
  variant = "neutral",
}: {
  children: ReactNode;
  variant?: "neutral" | "info" | "success" | "warning" | "danger";
}) {
  const styles = {
    neutral: "bg-subtle text-ink",
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
  }[variant];

  return (
    <span className={cx("inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]", styles)}>
      {children}
    </span>
  );
}

export function Tooltip({
  label,
  children,
  position = "top",
}: {
  label: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[position];

  return (
    <span className="relative inline-flex group">
      {children}
      <span
        className={cx(
          "pointer-events-none absolute z-10 rounded-lg bg-ink px-2 py-1 text-xs text-white opacity-0 transition duration-300 ease-out group-hover:opacity-100",
          positionClasses
        )}
        role="tooltip"
      >
        {label}
      </span>
    </span>
  );
}

export function Progress({ value = 0, showPercent = false }: { value?: number; showPercent?: boolean }) {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className="space-y-2">
      <div className="h-2 w-full rounded-full bg-subtle">
        <div
          className="h-full rounded-full bg-accent-500 transition-all duration-500 ease-out"
          style={{ width: `${safeValue}%` }}
          role="progressbar"
          aria-valuenow={safeValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showPercent && <div className="text-xs text-muted">{safeValue}%</div>}
    </div>
  );
}
