export const metadata = {
  title: "Context AI chrome extension",
  description:
    "An AI that automatically organizes your bookmarks based on content and relevance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
