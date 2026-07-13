import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f1f1] px-4 text-[#111111]">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-6 text-base text-[#555555]">Página não encontrada.</p>
        <Link
          to="/"
          className="inline-flex rounded-full bg-[#3c32af] px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Voltar para a home
        </Link>
      </div>
    </main>
  );
}