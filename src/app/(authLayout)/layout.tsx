import AuthAnimation from "@/components/modules/Auth/AuthAnimation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex justify-center items-center">
        <AuthAnimation />
      </div>
      <div className="flex min-h-screen justify-center items-center px-4 py-8">
        {children}
      </div>
    </section>
  );
}
