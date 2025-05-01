import ClientSidebarWrapper from "@/components/sidebar/ClientSidebarWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <ClientSidebarWrapper />
      <main className="flex-1 ml-[280px] md:ml-[300px] lg:ml-[340px] min-h-screen">
        {children}
      </main>
    </div>
  );
} 