export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="text-customTextColor mx-2 mt-5 flex-1 p-3">{children}</main>
    </div>
  );
}
