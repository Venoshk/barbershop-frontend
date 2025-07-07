import { Button } from "@mui/material";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { Haeder } from "../../Components/header";
import { Card } from "../../Components/card";
import SpaIcon from "@mui/icons-material/Spa";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DiamondIcon from "@mui/icons-material/Diamond";
import { BarberCard } from "../../Components/barberCard";
import imagemDeFundo from '../../assets/img-bg.jpg';

export function Home() {

   const navigationLinks = [
    { label: "Serviços", path: "/servicos" },
    { label: "Planos", path: "/planos" },
    { label: "Sobre", path: "/sobre" },
    { label: "Login", path: "/login" },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <Haeder navLinks={navigationLinks}/>

      <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-pt-[68px] no-scrollbar">
        <section  style={{ backgroundImage: `url(${imagemDeFundo})` }} className="sticky top-0 h-screen z-10 flex items-center justify-center text-white text-center bg-cover bg-center">
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
              className="font-bold"
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

        <section className="sticky top-0 h-screen z-20 bg-white dark:bg-gray-900 flex flex-col justify-center">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Nossos Serviços
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Eleve sua confiança a cada visita. Um homem que se cuida é um
              homem preparado para conquistar.
            </p>
          </div>
          <div className="p-12 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              icon={<ContentCutIcon sx={{ fontSize: 48, color: "#7747ff" }} />}
              title="Corte de Cabelo"
              description="Estilos clássicos e modernos para um visual impecável."
            />

            <Card
              icon={<AutoFixHighIcon sx={{ fontSize: 48, color: "#7747ff" }} />}
              title="Design de Barba"
              description="Modelagem, hidratação e cuidados para uma barba de respeito."
            />

            <Card
              icon={
                // Para o combo, passamos um elemento com os dois ícones juntos
                <div className="flex justify-center">
                  <ContentCutIcon sx={{ fontSize: 48, color: "#7747ff" }} />
                  <AutoFixHighIcon
                    sx={{ fontSize: 48, color: "#7747ff", ml: -2 }}
                  />
                </div>
              }
              title="Combo Corte & Barba"
              description="O pacote completo para renovar seu estilo e sair pronto para qualquer ocasião."
            />

            <Card
              icon={<SpaIcon sx={{ fontSize: 48, color: "#7747ff" }} />}
              title="Hidratação e Terapia Capilar"
              description="Revitalize seus fios com nossas terapias de fortalecimento, hidratação profunda e combate à queda."
            />

            <Card
              icon={<ColorLensIcon sx={{ fontSize: 48, color: "#7747ff" }} />}
              title="Coloração e Tonalização"
              description="Disfarce os fios brancos ou mude seu visual com nossa linha de colorações premium e resultado natural."
            />

            <Card
              icon={<DiamondIcon sx={{ fontSize: 48, color: "#7747ff" }} />}
              title="Dia do Noivo"
              description="Um pacote completo de cuidados para o seu grande dia, incluindo corte, barba, limpeza de pele e um brinde especial."
            />
          </div>
        </section>

        <section className="sticky top-0 h-screen z-30 bg-gray-50 dark:bg-gray-900 py-16 sm:py-24 flex flex-col justify-center">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Nossos Artesãos do Estilo
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Profissionais apaixonados e dedicados a entregar o melhor
              resultado para você.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BarberCard
              imageUrl="https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop"
              name="Lucas Martins"
              specialty="Cortes Clássicos & Navalha"
            />
            <BarberCard
              imageUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
              name="Juliana Costa"
              specialty="Estilos Modernos & Coloração"
            />
            <BarberCard
              imageUrl="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1972&auto=format&fit=crop"
              name="Ricardo Alves"
              specialty="Fades & Cortes Infantis"
            />
          </div>
        </section>

        {/* O Footer e outras seções podem vir na sequência normalmente */}
        <footer className="sticky bottom-0 z-50 shadow-sm bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          cafeee
        </footer>
      </main>
    </div>
  );
}
