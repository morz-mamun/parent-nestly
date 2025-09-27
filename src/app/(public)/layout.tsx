import Footer from "@/components/shared/footer";
import { WebSiteNavbar } from "@/components/shared/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="z-10 min-h-screen max-w-screen mx-auto">
      {/* NAVBAR */}
      <WebSiteNavbar />
      {/* <ScrollProgress /> */}
      <div className="mx-3 md:mx-6">{children}</div>
      {/* FOOTER */}
      <Footer />
    </main>
  );
}
