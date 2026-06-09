import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Tạo ứng dụng Next",
	description: "Được tạo bởi create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
			<body>{children}</body>
		</html>
	);
}
