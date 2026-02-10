import React from "react";

type Props = {
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function NoImagePlaceholder({
  label = "Немає фото",
  size,
  className = "",
}: Props) {
  const iconSize =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-14 w-14" : "h-12 w-12";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center bg-slate-200 text-slate-500 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className={`${iconSize} opacity-60`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 11h.01M12 11h.01M16 11h.01"
        />
      </svg>

      {label ? (
        <span className={`mt-2 font-medium ${textSize}`}>{label}</span>
      ) : null}
    </div>
  );
}
