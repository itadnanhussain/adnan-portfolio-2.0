"use client";
import { useEffect, useRef, useState, useCallback } from "react";
const GLYPHS = "!<>-_\\/[]{}—=+*^?#01X$%";
interface Props { text: string; className?: string; triggerOnHover?: boolean; }
export default function TextScramble({ text, className = "", triggerOnHover = true }: Props) {
	const [display, setDisplay] = useState(text);
	const ref = useRef<ReturnType<typeof setInterval> | null>(null);
	const scramble = useCallback(() => {
		let i = 0;
		if (ref.current) clearInterval(ref.current);
		ref.current = setInterval(() => {
			setDisplay(() => text.split("").map((c, idx) => { if (c===" ") return " "; if (idx<i) return text[idx]; return GLYPHS[Math.floor(Math.random()*GLYPHS.length)]; }).join(""));
			if (i >= text.length) { if (ref.current) clearInterval(ref.current); }
			i += 1/2;
		}, 30);
	}, [text]);
	useEffect(() => { scramble(); return () => { if (ref.current) clearInterval(ref.current); }; }, [scramble]);
	return (
		<span
			className={`relative inline-block align-bottom ${className}`}
			onMouseEnter={triggerOnHover ? scramble : undefined}
		>
			<span className="invisible" aria-hidden="true">
				{text}
			</span>
			<span className="absolute inset-0 whitespace-nowrap" aria-hidden="true">
				{display}
			</span>
			<span className="sr-only">{text}</span>
		</span>
	);
}
