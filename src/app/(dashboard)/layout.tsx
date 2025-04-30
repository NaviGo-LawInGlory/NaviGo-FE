import ClientSidebarWrapper from "@/components/sidebar/ClientSidebarWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <ClientSidebarWrapper />
      <main className="min-h-screen transition-all duration-300]">
        {children}
      </main>
    </div>
  );
} 