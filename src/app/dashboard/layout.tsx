import Navbar from '../shared/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-2 mt-5 flex-1 p-3 text-customTextColor">{children}</main>
    </div>
  );
}
