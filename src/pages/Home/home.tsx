
import { Button } from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { Haeder } from "../../Components/header";


// Componente da Página Principal
export function Home() {
  return (
    // A cor de fundo e do texto de toda a página muda aqui
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <Haeder title="Login" link="/login"/>

      <main>
        <section className="relative h-[60vh] flex items-center justify-center text-white text-center bg-[url('https://images.unsplash.com/photo-1599351234873-140d626171a0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 p-4">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Estilo & Tradição em Cada Corte
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
              A experiência de barbearia que você merece, com os melhores
              profissionais da cidade.
            </p>
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                bgcolor: "#7747ff",
                "&:hover": { bgcolor: "#5d3dcc" },
                px: 5,
                py: 1.5,
              }}
            >
              Agende seu Horário
            </Button>
          </div>
        </section>

        {/* Seção de Serviços */}
        <section className="container mx-auto px-6 py-16">
          <h3 className="text-3xl font-bold text-center text-[#1e0e4b] dark:text-white">
            Nossos Serviços
          </h3>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card de Serviço 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <ContentCutIcon sx={{ fontSize: 48, color: "#7747ff" }} />
              <h4 className="mt-4 text-xl font-semibold">Corte de Cabelo</h4>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Estilos clássicos e modernos, executados com precisão para um
                visual impecável.
              </p>
            </div>
            {/* Card de Serviço 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <AutoFixHighIcon sx={{ fontSize: 48, color: "#7747ff" }} />
              <h4 className="mt-4 text-xl font-semibold">Design de Barba</h4>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Modelagem, hidratação e cuidados para uma barba de respeito.
              </p>
            </div>
            {/* Card de Serviço 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
              <div className="flex justify-center">
                <ContentCutIcon sx={{ fontSize: 48, color: "#7747ff" }} />
                <AutoFixHighIcon
                  sx={{ fontSize: 48, color: "#7747ff", ml: -2 }}
                />
              </div>
              <h4 className="mt-4 text-xl font-semibold">
                Combo Corte & Barba
              </h4>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                O pacote completo para renovar seu estilo e sair pronto para
                qualquer ocasião.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 BarberShop. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
