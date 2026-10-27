"use client";
import { useTheme } from "./ThemeProvider";

export default function Toast() {
	const { toastMessage } = useTheme();
	if (!toastMessage) return null;
	return (
		<div className="toast-enter pointer-events-none fixed bottom-4 right-4 left-4 z-[99999] sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm">
			<div
				role="status"
				aria-live="polite"
				className="flex items-center gap-3 rounded-2xl border px-4 py-3 text-xs font-medium shadow-2xl backdrop-blur-2xl sm:text-sm"
				style={{
					background: "color-mix(in srgb, var(--bg-card) 92%, transparent)",
					color: "var(--text-primary)",
					borderColor: "var(--border-color)",
				}}>
				<span
					className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
					style={{
						background: "color-mix(in srgb, var(--accent-primary) 16%, transparent)",
						color: "var(--accent-primary)",
					}}
				>
					✓
				</span>
				<span className="tracking-wide">{toastMessage}</span>
			</div>
		</div>
	);
}
