import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import CustomCursor from "../components/CustomCursor";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-poppins",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["100", "400", "500", "700"],
	variable: "--font-jetbrains",
	display: "swap",
});

export const viewport = {
	themeColor: "#0f111a",
};

export const metadata: Metadata = {
	title: "Md. Adnan Hussain — Full-Stack Developer",
	description:
		"Portfolio of Md. Adnan Hussain, a full-stack developer from Sylhet, Bangladesh — building scalable web applications with Next.js, React 19, TypeScript, and Supabase.",
	authors: [{ name: "Md. Adnan Hussain" }],
	keywords: [
		"Md. Adnan Hussain",
		"Full-Stack Developer",
		"Next.js Developer",
		"React Developer",
		"TypeScript",
		"Supabase",
		"Portfolio",
		"Bangladesh",
		"Sylhet",
		"Adnan Enterprise",
		"itadnanhussain",
	],
	openGraph: {
		title: "Md. Adnan Hussain — Full-Stack Developer",
		description:
			"Full-stack developer from Sylhet, Bangladesh — building scalable web applications with Next.js, React 19, TypeScript, and Supabase.",
		type: "website",
		url: "https://adnanhussain.dev",
	},
	twitter: {
		card: "summary",
		title: "Md. Adnan Hussain — Full-Stack Developer",
		description:
			"Full-stack developer building scalable web applications with Next.js, React 19, TypeScript & Supabase.",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			data-theme="tokyo-night"
			suppressHydrationWarning>
			<head>
				<Script
					id="theme-initializer"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{
						__html: `
              try {
                const savedTheme = localStorage.getItem("preferred-theme");
                const allowedThemes = ["tokyo-night","catppuccin","dracula","matrix","nord","clean-light"];
                if (savedTheme && allowedThemes.includes(savedTheme)) {
                  document.documentElement.dataset.theme = savedTheme;
                }
              } catch (e) {}
            `,
					}}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Person",
							name: "Md. Adnan Hussain",
							jobTitle: "Full-Stack Developer",
							email: "itadnanhussain@gmail.com",
							url: "https://adnanhussain.dev",
							sameAs: [
								"https://github.com/itadnanhussain",
								"https://www.linkedin.com/in/itadnanhussain/",
							],
							address: {
								"@type": "PostalAddress",
								addressLocality: "Sylhet",
								addressCountry: "BD",
							},
						}),
					}}
				/>
			</head>
			<body className={`${poppins.variable} ${jetbrainsMono.variable}`}>
				<ThemeProvider>
					<CustomCursor />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
