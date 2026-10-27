"use client";
import { memo } from "react";
const Background = memo(function Background() {
	return (
		<>
			<div className="noise-overlay" />
			<div className="bg-blob blob-1" />
			<div className="bg-blob blob-2" />
			<div className="bg-blob blob-3" />
		</>
	);
});
export default Background;
