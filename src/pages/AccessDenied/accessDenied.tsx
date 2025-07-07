import { Link } from 'react-router-dom';

export function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-500">Acesso Negado</h1>
      <p className="mt-4 text-lg">Você não tem permissão para visualizar esta página.</p>
      <Link to="/dashboard" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Voltar ao Painel
      </Link>
    </div>
  );
}